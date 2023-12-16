import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGithub } from "react-icons/tfi";
import "../App.css";
import { useState } from "react";
import AIBubble from "./AIBubble";
import HumanBubble from "./HumanBubble";

function Chat() {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const handleSubmit = () => {
    chats.push({ role: "user", text: text });
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
          {chats.map((ele) => (
            <HumanBubble text={ele.text} />
          ))}
        </div>
        <div className="input-window">
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="input-textbox"
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
