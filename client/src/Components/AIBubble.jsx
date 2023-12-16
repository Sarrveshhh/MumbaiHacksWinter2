import React, {useEffect, useState}from "react";
import "../App.css";
import { TfiGithub } from "react-icons/tfi";
function AIBubble({ text }) {
  const [typeText,setTypeText] = useState("");
  useEffect(() => {
    const textToType = async () => {
      for (let index = 0; index < text.length; index++) {
        setTypeText(text.slice(0, index));
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    };
  
    textToType();
  }, []);
  return (
    <div className="bubble-ai">
      <div className="bubble-logo">
        <TfiGithub /> <p>GitHubGPT</p>
      </div>
      <div className="bubble-text">{typeText}</div>
    </div>
  );
}

export default AIBubble;
