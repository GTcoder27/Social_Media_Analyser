import React from 'react'

const PostTable = () => {
    const posts = [
        { date: '7 Dec 2024', time: '11:04 PM', visibility: 'Public', video: 'Free Fire Stream', views: 7, engagement: 4 },
        { date: '7 Dec 2024', time: '10:44 PM', visibility: 'Public', video: 'Bhushan More Live Stream', views: '-', engagement: '-' },
        { date: '13 May 2024', time: '12:23 PM', visibility: 'Public', video: 'ayush kawale live stream', views: 15, engagement: 4 },
        { date: '13 May 2024', time: '12:12 PM', visibility: 'Public', video: 'Bhushan More Live Stream', views: 23, engagement: 3 },
      ];
    
      return (
        <div className="flex-1 overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-2 border">Published On</th>
                <th className="p-2 border">Visibility</th>
                <th className="p-2 border">Video</th>
                <th className="p-2 border">Views</th>
                <th className="p-2 border">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
                  <td className="p-2 border">{`${post.date} ${post.time}`}</td>
                  <td className="p-2 border">{post.visibility}</td>
                  <td className="p-2 border">{post.video}</td>
                  <td className="p-2 border">{post.views}</td>
                  <td className="p-2 border">{post.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default PostTable
