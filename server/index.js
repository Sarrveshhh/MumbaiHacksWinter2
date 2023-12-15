import { openai } from "./openai.js";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import express from "express";
const app = express();
app.use(express.json());
const port = 8000;
let store = new MemoryVectorStore();

const history = [
  {
    role: "system",
    content:
      "You are an AI guide for GitHub repositories. Assist users by providing information, answering queries, and performing basic actions within the repository. Offer guidance on navigation, code exploration, version control, issue management, collaboration, and common tasks. Aim to enhance the user experience for both beginners and experienced developers.",
  },
];

const createStore = (docs) => {
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
};

const docsFromGithub = async (github) => {
  const loader = new GithubRepoLoader(github);

  return await loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: "",
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  );
};

const loadStore = async (githubURL) => {
  const githubDocs = await docsFromGithub(githubURL);
  return createStore([...githubDocs]);
};

const formatMessage = (question, results) => {
  return {
    role: "user",
    content: `Answer the following question using the provided context.
        Question: ${question}
  
        Context: ${results.map((r) => r.pageContent).join("\n")}`,
  };
};

const newMessage = async (message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
    temperature: 0.7, // 0 = no creativity. 1 = lots of creativity
  });

  return results.choices[0].message;
};

app.post("/loadStore", async (req, res) => {
  const githubURL = req.body.url;
  try {
    store = await loadStore(githubURL);
    res.status(200).json({ message: "Store loaded" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

app.post("/query", async (req, res) => {
  const question = req.body.question;
  const results = await store.similaritySearch(question, 2);
  const message = formatMessage(question, results);
  const response = await newMessage(message);
  res.status(200).json({ message: response });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
