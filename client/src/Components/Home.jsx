import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home({ setIsLoading }) {
  const [link, setLink] = useState(null);
  const [branch, setBranch] = useState(null);
  const navigate = useNavigate();
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    const postData = {
      githubURL: link,
      branch: branch,
    };
    console.log(postData);
    try {
      const response = await axios.post(
        "http://localhost:8000/loadStore",
        postData
      );
      // Handle the response if needed
      console.log("Response:", response);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      navigate("/chat");
    }
  };

  return (
    <>
      <div className="bg-black h-screen flex flex-col items-center justify-center p-4">
        <h1 className="headline text-8xl font-bold text-gray-800 mb-2">
          Paste. Process. Chat.
        </h1>
        <p className="text-xl text-white mb-6">
          A static code analysis toolkit to scan vulnerabilities blazing fast.
        </p>
        <p className="text-sm text-white mb-8">
          Just paste your GitHub repository link.
        </p>
        <div className="w-1/3  shadow-lg rounded-lg">
          <input
            type="text"
            value={link}
            onChange={handleLinkChange}
            placeholder="https://github.com/<username>/<repo-name>"
            className=" p-4 w-full bg-white rounded-lg focus:outline-none text-black"
          />
        </div>
        <button className="w-1/5 py-3 mt-10 bg-white text-black uppercase tracking-wider font-semibold rounded-lg hover:opacity-75 duration-200 mt-1">
          />
          <input
            type="text"
            value={branch}
            onChange={handleBranchChange}
            placeholder="Enter branch"
            className=" p-4 text-black w-full bg-white rounded-lg focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-1/5 py-3 mt-10 bg-black text-white uppercase tracking-wider font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 "
        >
          Start Analyzing
        </button>
      </div>
    </>
  );
}
