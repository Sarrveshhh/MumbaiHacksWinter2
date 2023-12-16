import "./App.css";
import Chat from "./Components/Chat.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Spinner from "./Components/Spinner.jsx";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="App">
      {/* <ChatApp /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? <Spinner /> : <Home setIsLoading={setIsLoading} />
            }
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
