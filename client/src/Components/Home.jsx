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
      navigate("/chat");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black h-screen flex flex-col items-center justify-center p-4">
        <h1 className="headline text-12xl font-bold text-gray-800 mb-2">
          GitHub GPT.
        </h1>
        <p className="text-xl text-white mb-6">
          GPT powered coding tool that helps you understand github repositories
        </p>
        <p className="text-sm text-white mb-8">
          Just paste your GitHub repository link.
        </p>
        <div className="w-1/3  shadow-lg rounded-lg flex flex-col items-center">
          <input
            type="text"
            value={link}
            onChange={handleLinkChange}
            placeholder="https://github.com/<username>/<repo-name>"
            className=" p-4 w-full bg-white rounded-lg focus:outline-none text-black mb-4"
          />
          <input
            type="text"
            value={branch}
            onChange={handleBranchChange}
            placeholder="Enter branch"
            className=" p-4 w-full bg-white rounded-lg focus:outline-none text-black"
          />
          <button
            onClick={handleSubmit}
            className="w-200 py-3 mt-10 bg-white text-black uppercase tracking-wider font-semibold rounded-lg hover:opacity-75 duration-200 mt-1 p-4"
          >
            Start Analyzing
          </button>
        </div>
        {/* <button className="w-1/5 py-3 mt-10 bg-white text-black uppercase tracking-wider font-semibold rounded-lg hover:opacity-75 duration-200 mt-1"></button> */}
      </div>
    </>
  );
}
