import React from "react";
import { fetchDataFromLocalStorage } from "../utils/fetchDataFromLocalStorage";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Reports = () => {
  const data = fetchDataFromLocalStorage();

  return (
    <div className="space-y-8">
      
      <div className="flex h-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 ml-64">
          <div className="p-6 bg-white min-h-screen rounded-xl shadow-2xl h-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              User Reports
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((user, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-100 via-blue-100 to-blue-50 text-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-6 transition-transform transform hover:scale-105"
                >
                  <h2 className="text-xl font-bold mb-3">{user.username}</h2>
                  <div className="space-y-2">
                    <p>
                      <strong>Likes:</strong> {user.likes}
                    </p>
                    <p>
                      <strong>Comments:</strong> {user.comments}
                    </p>
                    <p>
                      <strong>Shares:</strong> {user.shares}
                    </p>
                    <p>
                      <strong>Reach:</strong> {user.reach}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
