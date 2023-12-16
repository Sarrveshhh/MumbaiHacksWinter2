import React from 'react';

export default function Home() {
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
            placeholder="https://github.com/<username>/<repo-name>"
            className=" p-4 w-full bg-white rounded-lg focus:outline-none text-black"
          />
        </div>
        <button className="w-1/5 py-3 mt-10 bg-white text-black uppercase tracking-wider font-semibold rounded-lg hover:opacity-75 duration-200 mt-1">
          Start Analyzing
        </button>
      </div>
    </>
  );
}
