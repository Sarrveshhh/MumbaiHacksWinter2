<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import ChatApp from "./Components/ChatApp.js";
import Chat from "./Components/Chat";
=======
import './App.css';
import ChatApp from './Components/ChatApp.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx';
>>>>>>> 1d4523d9740c8bf5cb277cee74888db2f239e606

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* <ChatApp /> */}
      <Chat />
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 1d4523d9740c8bf5cb277cee74888db2f239e606
    </div>
  );
}

export default App;
