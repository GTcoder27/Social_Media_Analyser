import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostTable from "../components/PostTable";
import Dashboard from "./Dashboard";
function HomePage() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App w-full">
      <Navbar/>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Dashboard /> 
        </main>
      </div>
    </div>
  );
}

export default HomePage;
