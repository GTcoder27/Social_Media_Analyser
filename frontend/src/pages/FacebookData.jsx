import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function FacebookData() {
  const mock_acc_token = import.meta.env.FACEBOOK_MOCK_ACCESS_TOKEN;

  const [accessToken, setAccessToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [postDetails, setPostDetails] = useState(null);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState("");

  const fetchPosts = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v17.0/me/posts?fields=id,message,created_time,story&access_token=${accessToken}`
      );
      setPosts(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  const fetchPostDetails = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v17.0/${postId}?fields=id,message,created_time,likes.summary(true),comments.summary(true),shares&access_token=${accessToken}`
      );
      setPostDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  const AddMockFacebookAccount = () => {
    setAccessToken(mock_acc_token);
    console.log(mock_acc_token);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Facebook Post Dashboard</h1>
            <input
              type="text"
              placeholder="Enter Access Token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <button
              onClick={fetchPosts}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mb-4"
            >
              Fetch All Posts
            </button>

            <button
              onClick={AddMockFacebookAccount}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition mb-4"
            >
              Mock Account
            </button>

            {posts.length > 0 && (
              <div className="text-left mb-6">
                <h2 className="text-xl font-bold mb-2">Posts:</h2>
                <ul className="list-disc pl-5">
                  {posts.map((post) => (
                    <li key={post.id} className="mb-2">
                      <strong>ID:</strong> {post.id} <br />
                      <strong>Message:</strong> {post.message || "No message"} <br />
                      <strong>Created Time:</strong> {post.created_time}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <input
              type="text"
              placeholder="Enter Post ID"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={fetchPostDetails}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Fetch Post Details
            </button>

            {postDetails && (
              <div className="text-left mt-6">
                <h2 className="text-xl font-bold mb-2">Post Details:</h2>
                <p>
                  <strong>ID:</strong> {postDetails.id}
                </p>
                <p>
                  <strong>Message:</strong> {postDetails.message || "No message"}
                </p>
                <p>
                  <strong>Created Time:</strong> {postDetails.created_time}
                </p>
                <p>
                  <strong>Likes:</strong> {postDetails.likes?.summary?.total_count || 0}
                </p>
                <p>
                  <strong>Comments:</strong> {postDetails.comments?.summary?.total_count || 0}
                </p>
                <p>
                  <strong>Shares:</strong> {postDetails.shares?.count || 0}
                </p>
              </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FacebookData;
