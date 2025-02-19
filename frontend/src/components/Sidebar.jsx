import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart, PieChart, Users, Settings, FileText, Eye } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", icon: <BarChart />, to: "/" },
    { name: "ChatBot", icon: <Users />, to: "/chatbot" },
    { name: "Analytics", icon: <PieChart />, to: "/analytics" },
    { name: "Insights", icon: <Eye />, to: "/insights" },
    { name: "Reports", icon: <FileText />, to: "/reports" },
    // { name: "Settings", icon: <Settings />, to: "/settings" },
  ];

  return (
    <div className="fixed h-[95vh] w-64 bg-white shadow- p-4 flex flex-col justify-between ">
      <div>
        {/* Sidebar Navigation */}
        <nav className="space-y-4 mt-8">
          {links.map((link) => (
            <NavLink
              to={link.to}
              key={link.name}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>

  );
};

export default Sidebar;
