import React from "react";
import { fetchDataFromLocalStorage } from "../utils/fetchDataFromLocalStorage";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Insights = () => {
  const data = fetchDataFromLocalStorage();

  const insights = [
    "Reels generate 2.5x more shares compared to static image posts.",
    "Engagement rates for Reels are 30% higher than for carousel posts.",
    "Reels receive 40% more likes than traditional video posts.",
    "Posts featuring Reels have a 50% higher reach compared to standard posts.",
    "Users spend an average of 15 seconds longer viewing Reels than other content formats."
  ];

  return (
    <div className="space-y-8">
     
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 ml-64">
          <div>
            <h1 className="text-3xl font-bold mb-6">Insights</h1>
            <div className="bg-gray-100 p-4 rounded shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Key Insights</h2>
              <ul className="list-disc pl-6">
                {insights.map((insight, index) => (
                  <li key={index} className="mb-2">{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Insights;
