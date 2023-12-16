import React, { useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGithub } from "react-icons/tfi";
import "../App.css";
import { useState } from "react";
import AIBubble from "./AIBubble";
import HumanBubble from "./HumanBubble";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

function Chat() {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);

  const handleSubmit = async () => {
    setResponseLoading(true);
    setChats([...chats, { role: "user", text: text }]);
    let payload = { question: text };
    let response = await axios.post("http://localhost:8000/query/", payload);
    setChats((chats) => [
      ...chats,
      { role: "bot", text: response.data.message.content },
    ]);
    setResponseLoading(false);
    setText("");
  };
  return (
    <div className="chat-interface">
      <div className="navbar">
        <TfiGithub className="company-icon" />
        <h4 className="company-name">GithubGPT</h4>
      </div>

      <div className="outer-container">
        <div className="output-window">
          {chats.map((ele) =>
            ele.role === "user" ? (
              <HumanBubble key={ele.id} text={ele.text} />
            ) : (
              <AIBubble key={ele.id} text={ele.text} />
            )
          )}
        </div>
        <div className="input-window">
          <HashLoader
            className="response-loader"
            color={"white"}
            loading={responseLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="input-textbox"
            onKeyPress={(event) => {
              if(event.key === 'Enter'){
                handleSubmit();
              }
            }}
            value={text}
            placeholder="E.g. Explain <something> from the <filename.py> file. "
          />
          <div
            className="send-button"
            onClick={() => {
              handleSubmit();
            }}
          >
            <AiOutlineSend className="send-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
