import React, {useState} from 'react';
import './ChatApp.css';
function ChatApp() {
  
  const [prompt, setPrompt] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");

  const promptEvent = (event) => {
    setPrompt(event.target.value)
  }

  const onSubmit = () => {
    setFinalPrompt(prompt);
  }
  return (


    <div className="chat-app">
        {/* 1. Sidebar  */}
        <div className="left-bar">
            <ul className="left-bar-components">
                <li>Centering Div using CSS</li>
                <li>Write code to add two numbers</li>
            </ul>
        </div>

        {/* 1+2. Content = input + output */}
        <div className="content">
        {/* 2. Ouput  */}
            <div className="output">
                <div className="Branding">
                    <img src="https://static.vecteezy.com/system/resources/previews/021/059/827/original/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" alt="Logo" />
                    <h2>ChadGPT</h2>
                    <h2>How can I help you today?</h2>
                </div>
                {finalPrompt}
            </div>


            {/* 3. Input Prompt  */}
            <div className="input">
                <input type="text" placeholder="Enter your prompt" onChange = {promptEvent}/>
                <button className="enter-prompt" onClick={onSubmit}>Enter</button>
            </div>
        </div>
    </div>
  )
}

export default ChatApp
