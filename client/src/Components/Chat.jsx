import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import "../App.css";

function Chat() {
  return (
    <div className="chat-interface">
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
