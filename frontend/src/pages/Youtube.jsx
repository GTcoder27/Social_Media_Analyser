import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Sidebar from "../components/Sidebar";

const Youtube = () => {
  const CLIENT_ID = '133244074560-6tepsbitnh58aj32ebucgbapv1q72vsu.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCPg0CcAIkrr0evRZF3iVQplTFWQqJxFXE';
  const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';


  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticate = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        setIsLoggedIn(true);
        loadClient();
      })
      .catch((error) => console.error('Error signing in', error));
  };

  const loadClient = () => {
    gapi.client.setApiKey(API_KEY);
    gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then(() => {
        listVideos();
      })
      .catch((error) => console.error('Error loading GAPI client', error));
  };

  const listVideos = () => {
    setLoading(true);
    gapi.client.youtube.search
      .list({
        part: 'id,snippet',
        forMine: true,
        type: 'video',
        maxResults: 10,
      })
      .then((response) => {
        const videoIds = response.result.items.map((item) => item.id.videoId);
        fetchVideoDetails(videoIds);
      })
      .catch((error) => {
        console.error('Error fetching videos', error);
        setLoading(false);
      });
  };

  const fetchVideoDetails = (videoIds) => {
    gapi.client.youtube.videos
      .list({
        part: 'snippet,statistics,status,contentDetails',
        id: videoIds.join(','),
      })
      .then((response) => {
        setVideos(response.result.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching video details', error);
        setLoading(false);
      });
  };

  const openVideoStats = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoStats = () => {
    setSelectedVideo(null);
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: SCOPES,
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
  <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50 w-[100%]">
    {/* <Sidebar /> */}
    <main className="flex-1 overflow-y-auto p-6 md:p-8 w-[100%]">
      {!isLoggedIn ? (
        <div className="text-center bg-white shadow-lg p-8 rounded-lg max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to YouTube Video Viewer</h1>
          <p className="mb-6 text-gray-600 text-lg">Sign in to Add YouTube Account.</p>
          <button
            onClick={authenticate}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
          >
            Sign In with Google
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your YouTube Videos</h1>

          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Thumbnail</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Published Date</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Visibility</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Views</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Likes</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr
                    key={video.id}
                    className="cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => openVideoStats(video)}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                        className="rounded-lg w-16"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{video.snippet.title}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-500">{new Date(video.snippet.publishedAt).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{video.status.privacyStatus}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{video.statistics.viewCount || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{video.statistics.likeCount || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedVideo && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-4xl space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">{selectedVideo.snippet.title}</h2>
                <img
                  src={selectedVideo.snippet.thumbnails.medium.url}
                  alt={selectedVideo.snippet.title}
                  className="rounded-lg mx-auto"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Published At:</strong> {new Date(selectedVideo.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Visibility:</strong> {selectedVideo.status.privacyStatus}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Views:</strong> {selectedVideo.statistics.viewCount}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Likes:</strong> {selectedVideo.statistics.likeCount}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Comments:</strong> {selectedVideo.statistics.commentCount}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-gray-700">
                      <strong>Duration:</strong> {selectedVideo.contentDetails.duration}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeVideoStats}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:shadow-lg transition mx-auto block"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  </div>
</div>

  );
};

export default Youtube;
