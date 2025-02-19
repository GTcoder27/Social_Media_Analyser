import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar";

function Instagram() {
  const [accessToken, setAccessToken] = useState('');
  const [instagramAccountId, setInstagramAccountId] = useState('');
  const [followers, setFollowers] = useState(null);
  const [error, setError] = useState('');

  const fetchInstagramAccountId = async () => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me?access_token=${accessToken}`
      );
      const pageId = response.data.id;
      setInstagramAccountId(pageId);
      console.log(pageId);
      // const igResponse = await axios.get(
      //   `https://graph.facebook.com/v17.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
      // );
      setError('');
    } catch (err) {
      setError('Failed to fetch Instagram Account ID. Please check your access token.');
    }
  };

  const fetchFollowerData = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v17.0/${instagramAccountId}?fields=followers_count&access_token=${accessToken}`
      );
      console.log(response.data);
      // setFollowers(response.data.data[0].values[0].value);
      setError('');
    } catch (err) {
      setError('Failed to fetch follower data. Please check your Instagram Account ID.');
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-5">Instagram Follower Dashboard</h1>
          <input
            type="text"
            placeholder="Enter Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-72 p-2 border border-gray-300 rounded-md mb-4"
          />


          <button
            onClick={fetchInstagramAccountId}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-3 hover:bg-blue-600">
            Get Instagram Account ID
          </button>

          <button
            onClick={fetchFollowerData}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Get Follower Data
          </button>

          {/* <button
        onClick={fetchFollowerData}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Get Follower Data
      </button> */}

          <div className="mt-5">
            {error && <p className="text-red-500">{error}</p>}
            {instagramAccountId && (
              <p className="text-gray-700">Instagram Account ID: {instagramAccountId}</p>
            )}
            {followers !== null && (
              <p className="text-gray-700">Total Followers: {followers}</p>
            )}
          </div>
        </main>
      </div>

    </div>
  );
}

export default Instagram;
