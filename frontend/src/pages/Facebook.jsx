import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
function Facebook() {
  const [accessToken, setAccessToken] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAccountData = async () => {
    setError(null);
    setAccountData(null);

    try {
      const response = await axios(
        `https://graph.facebook.com/v17.0/me?fields=id,name,email,picture&access_token=${accessToken}`
      );
      setAccountData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 ml-64">
      
        <Sidebar />
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Facebook Account Dashboard</h1>
            <input
              type="text"
              placeholder="Enter Access Token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={fetchAccountData}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Fetch Account Data
            </button>

            <div className="mt-6">
              {error && <p className="text-red-500">{error}</p>}
              {accountData && (
                <div className="text-left">
                  <h2 className="text-xl font-bold mb-2 text-gray-700">Account Information:</h2>
                  <p><strong>ID:</strong> {accountData.id}</p>
                  <p><strong>Name:</strong> {accountData.name}</p>
                  <p><strong>Email:</strong> {accountData.email || 'Not available'}</p>
                  <img
                    src={accountData.picture?.data?.url}
                    alt="Profile"
                    className="rounded-full w-24 h-24 mt-4"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Facebook;
