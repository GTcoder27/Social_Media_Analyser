import React from 'react';
import Sidebar from "../components/Sidebar";


const Team = () => {
  return (
    <div>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Team</h1>
          {/* Team content will be implemented in the next phase */}
        </main>
      </div>
    </div>
  );
}

export default Team;