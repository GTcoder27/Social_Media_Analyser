import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getLangchainResponse } from "./api.js";
import { Send,Loader} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return; // Prevent empty submissions
    setLoading(true);
    setError("");

    try {
      const apiResponse = await getLangchainResponse(inputValue);

      // Append the new chat to history
      setChatHistory((prev) => [
        ...prev,
        { prompt: inputValue, response: apiResponse },
      ]);

      // Clear input field
      setInputValue("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (!text) return "";
    return text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith(":**")) {
        return (
          <h2 key={index} className="text-lg font-bold text-gray-800 my-2">
            {line.replace(/\*\*/g, "")}
          </h2>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };


  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);



  return (
    <div>
      <div className="">

      <Sidebar/>
      </div>
    
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-cover bg-center h-[90%] w-[80%] mt-6 ml-64 fixed"
    style={{ backgroundImage: "url('/wallpaper/wall.jpg')" }}
    >

  {/* Chat History */}
  <div className="space-y-4 max-h-[60vh] overflow-y-auto w-full sm:w-[80%] md:w-[65%] bg-[#00000031] backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 leading-relaxed mt-4 sm:mt-8">
    <h2 className="text-white sm:text-xl font-bold ">History</h2>
    {chatHistory.map((chat, index) => (
      <div
        key={index}
        className="bg-[#4e4c5531] backdrop-blur-md p-4 rounded-lg border border-gray-300 mb-4"
      >
        {/* User Message */}
        <div className="bg-[#c7fff0] text-black rounded-md w-full sm:w-[90%]">
          <p className="font-semibold pl-2 pt-1">You:</p>
          <p className="whitespace-pre-wrap pl-4 pb-2">{chat.prompt}</p>
        </div>
        {/* Response Message */}
        <div className="flex justify-end mt-3">
          <div className="bg-[#c7fff0] text-black w-full sm:w-[90%] rounded-md">
            <p className="font-semibold pt-1 pl-2">Response:</p>
            <pre className="whitespace-pre-wrap leading-relaxed text-gray-700 font-mono p-4 rounded-lg overflow-auto">
              {formatResponse(chat.response)}
            </pre>
          </div>
        </div>
      </div>
    ))}
    {/* Invisible element to scroll into view */}
    <div ref={messageEndRef} />
  </div>

  {/* Input Section */}
  <div className="bg-[#ffffff31] backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 space-y-6 w-full sm:w-[80%] md:w-[65%] mt-4">
    <h1 className="text-xl sm:text-2xl font-bold text-gray-50 text-center">
      Langchain Chatbot
    </h1>
    <div className="flex space-y-4 justify-center items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your message"
        className="p-3 border mt-4 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[90%] "
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`p-4 ml-2 rounded-lg font-semibold text-white transition-all h-[48px] flex justify-center items-center ${
          loading
            ? "bg-[#a574ff] cursor-not-allowed"
            : "bg-gradient-to-r from-[#bc3dc3] to-[#b14fb6]"
        } hover:from-[#722676] hover:to-[#652f68]`}
      >
        {loading ? <Loader /> : <Send size={22} />}
      </button>
    </div>
    {error && (
      <p className="text-red-600 font-medium text-center">{error}</p>
    )}
  </div>
</div>
</div>

  );
}

export default Chat;
