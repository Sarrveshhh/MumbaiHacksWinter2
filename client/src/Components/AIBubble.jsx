import React from "react";
import "../App.css";
import { TfiGithub } from "react-icons/tfi";
import ReactMarkdown from "react-markdown";

function AIBubble({ text }) {
  return (
    <div className="bubble-ai">
      <div className="bubble-logo">
        <TfiGithub /> <p>GitHub GPT</p>
      </div>
      <div className="bubble-text">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default AIBubble;
