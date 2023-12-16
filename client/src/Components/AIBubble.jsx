import React from "react";
import "../App.css";
import { TfiGithub } from "react-icons/tfi";

function AIBubble() {
  return (
    <div className="bubble-ai">
      <div className="bubble-logo">
        <TfiGithub /> <p>GitHubGPT</p>
      </div>
      <div className="bubble-text">
        Yes, there have been ongoing trade tensions between China and the United
        States of America. While I don't have specific information about the
        involvement of Saudi Arabia or other countries as proxies in this trade
        war, it is not uncommon for countries to seek alliances or partnerships
        to gain leverage in trade disputes. Would you like me to look up more
        information on this topic?
      </div>
    </div>
  );
}

export default AIBubble;
