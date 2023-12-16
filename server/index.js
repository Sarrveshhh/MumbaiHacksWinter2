import { openai } from "./openai.js";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;
let store = null;

const history = [
  {
    role: "system",
    content:
      "You are an AI guide for GitHub repositories. Assist users by providing information, answering queries, and performing basic actions within the repository. Offer guidance on navigation, code exploration, version control, issue management, collaboration, and common tasks. Aim to enhance the user experience for both beginners and experienced developers.",
  },
];

/**
 *
 * @param docs - Array of documents to create the store
 * @returns MemoryVectorStore
 */

const createStore = (docs) => {
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
};

/**
 *
 * @param githubURL - URL of the github repo
 * @param branch - Branch to load from
 * @returns Array of documents
 */

const docsFromGithub = async (githubURL, branch) => {
  const loader = new GithubRepoLoader(githubURL, { branch: branch });

  return await loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: "",
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  );
};

/**
 *
 * @param githubURL - URL of the github repo
 * @param branch - Branch to load from
 * @returns MemoryVectorStore
 */

const loadStore = async (githubURL, branch) => {
  const githubDocs = await docsFromGithub(githubURL, branch);
  return createStore([...githubDocs]);
};

/**
 *
 * @param question - Question to ask
 * @param results - Results from the similarity search
 * @returns Formatted message
 */

const formatMessage = (question, results) => {
  return {
    role: "user",
    content: `Answer the following question using the provided context.
        Question: ${question}
  
        Context: ${results.map((r) => r.pageContent).join("\n")}`,
  };
};

/**
 *
 * @param message - Message to send to the AI
 * @returns Response from the AI
 */

const newMessage = async (message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
    temperature: 0.7, // 0 = no creativity. 1 = lots of creativity
  });

  return results.choices[0].message;
};

app.post("/loadStore", async (req, res) => {
  const githubURL = req.body.githubURL;
  const branch = req.body.branch;
  try {
    store = await loadStore(githubURL, branch);
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
