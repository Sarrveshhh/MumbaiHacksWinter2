import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGithub } from "react-icons/tfi";
import "../App.css";

function Chat() {
  return (
    <div className="chat-interface">
      <div className="navbar">
        <TfiGithub  className="company-icon"/>
        <h4 className="company-name">GithubGPT</h4>
      </div>

      <div className="outer-container">
        <div className="output-window"></div>
        <div className="input-window">
          <input
            type="text"
            className="input-textbox"
            placeholder="E.g. Explain <something> from the <filename.py> file. "
          />
          <AiOutlineSend className="send-icon" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
