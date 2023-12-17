import React from "react";
import "../App.css";
import { TfiGithub } from "react-icons/tfi";

function AIBubble({ text }) {
  return (
    <div className="bubble-ai">
      <div className="bubble-logo">
        <TfiGithub /> <p>GitHub GPT</p>
      </div>
      <div className="bubble-text">{text}</div>
    </div>
  );
}

export default AIBubble;
