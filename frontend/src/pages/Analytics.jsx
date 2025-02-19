import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { fetchDataFromLocalStorage } from "../utils/fetchDataFromLocalStorage";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { PieChartIcon } from 'lucide-react';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
  const data = fetchDataFromLocalStorage();

  return (
    <div className="flex h-screen">
      <div className="fixed h-full w-64 ">
        <Sidebar />
      </div>
      <div className="flex ml-64 h-full bg-gray-100">
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Engagement Over Time</h2>
                <BarChart data={data} />
              </div>
              <div className=" border border-gray-200  bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-8">
                          <PieChartIcon className="w-8 h-8 text-indigo-600" />
                 
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Average Engagement Distribution</h2>
                        </div>
                <PieChart data={data} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
