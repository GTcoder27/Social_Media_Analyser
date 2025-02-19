import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.username),
    datasets: [
      {
        label: "Likes",
        backgroundColor: "#6b46c1",
        data: data.map((item) => item.likes),
      },
      {
        label: "Comments",
        backgroundColor: "#d53f8c",
        data: data.map((item) => item.comments),
      },
      {
        label: "Shares",
        backgroundColor: "#38b2ac",
        data: data.map((item) => item.shares),
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
