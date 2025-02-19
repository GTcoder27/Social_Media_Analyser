import React from "react";
import { Card, Title, Metric } from "@tremor/react";
import { ThumbsUp, MessageCircle, Share2, TrendingUp, Eye, User, Users } from "lucide-react";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import {useAuthStore} from "../store/useAuthStore";
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const Dashboard = () => {
  const { authUser } = useAuthStore();

  const metrics = [
    { title: "Total Likes", value: "45.2K", icon: ThumbsUp, trend: "+12.3%" },
    { title: "Comments", value: "8.9K", icon: MessageCircle, trend: "+8.1%" },
    { title: "Shares", value: "12.4K", icon: Share2, trend: "+15.6%" },
    { title: "Engagement Rate", value: "4.8%", icon: TrendingUp, trend: "+2.4%" },
    { title: "Impressions", value: "156K", icon: Eye, trend: "+18.2%" },
  ];
  
  const chartdata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Likes",
        data: [2890, 3200, 4500, 3800, 4100],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "Comments",
        data: [1400, 1650, 2100, 1900, 2300],
        backgroundColor: "rgba(168, 85, 247, 0.7)",
      },
      {
        label: "Shares",
        data: [800, 950, 1300, 1100, 1500],
        backgroundColor: "rgba(251, 146, 60, 0.7)",
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  
  return (
    <div className="space-y-8 ">
      
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50 ">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-y-auto p-6 md:p-8  ">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome {authUser && authUser.fullname}</h1>
            <p className="text-gray-600 mt-1">Your social media analytics at a glance</p>
          </div>
          <div className="h-10 flex my-3 flex-row justify-between">
            <div className="flex">
              <NavLink to={"/instagram"} > <img src="http://freelogopng.com/images/all_img/1658588965instagram-logo-png-transparent-background.png" alt="App Logo" className="h-10 cursor-pointer" /> </NavLink>
              <NavLink to={"/facebook"} > <img src="https://static.vecteezy.com/system/resources/previews/017/221/797/non_2x/facebook-logo-transparent-background-free-png.png" alt="App Logo" className="h-20 mt-[-18px] w-19 pl-4 cursor-pointer" /></NavLink>
              <NavLink to={"/youtube"} > <img src="https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png" alt="App Logo" className="h-24 mt-[-27px]  cursor-pointer" /></NavLink>
            </div>
            <div>
              <NavLink to={"/chatbot"} className={({ isActive }) =>
                              `flex items-center space-x-3 p-3 bg-blue-100 rounded-lg hover:bg-blue-50 ${
                                isActive ? "bg-blue-100 text-blue-600 " : "text-gray-700"
                              }`
                            }>
                            <Users />
                            <span>ChatBot</span>
                          </NavLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.title} className="p-4 shadow-sm hover:shadow-md transition bg-blue-100 border border-emerald-300">
                <div className="flex justify-between items-center">
                  <metric.icon className="w-6 h-6 text-blue-600" />
                  <p className="text-green-500 font-semibold">{metric.trend}</p>
                </div>
                <Title className="text-lg font-semibold mt-3">{metric.title}</Title>
                <Metric className="text-xl font-bold mt-1">{metric.value}</Metric>
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <Title className="text-lg font-semibold text-gray-800">Engagement Overview</Title>
            <div className="mt-6 h-[22rem]">
              {/* Adjusted height using h-64 */}
              <Bar data={chartdata} options={options} />
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
