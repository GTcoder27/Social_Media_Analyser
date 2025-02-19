import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import Youtube from "./pages/Youtube";
import Instagram from "./pages/Instagram";
import Facebook from "./pages/Facebook";
import FacebookData from "./pages/FacebookData";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Chat from "./chatbot/Chat";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => (
  <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto ">
      <Navbar />

    <main className="flex-1 overflow-y-auto p-6 md:p-8 ">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/facebook/data" element={<FacebookData />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<Chat />} />
      </Routes>
    </main>
  </div>
);

export default App;
