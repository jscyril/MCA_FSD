import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=8"),
    ])
      .then(([usersRes, postsRes]) => {
        setUsers(usersRes.data);
        setPosts(postsRes.data);
        // Add 2 second delay to see loading state
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again.");
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      });
  }, []);

  const handleShowComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(response.data);
      setSelectedPostId(postId);
      setShowComments(true);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const closeComments = () => {
    setShowComments(false);
    setSelectedPostId(null);
    setComments([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="text-center text-gray-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Social Dashboard
          </h1>
          <p className="text-gray-600">
            Connect with people and share your thoughts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Users Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                People
              </h2>
              <div className="space-y-3">
                {users.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {user.email}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Posts
              </h2>
              <div className="space-y-4">
                {posts.map((post) => {
                  const user = users.find((u) => u.id === post.userId);
                  return (
                    <div
                      key={post.id}
                      className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* Post Header */}
                      <div className="mb-3">
                        <div className="font-medium text-gray-800">
                          {user ? user.name : "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{user ? user.username : "unknown"}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-800 mb-2 capitalize">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {post.body}
                        </p>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                        <button className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                          👍 Like
                        </button>
                        <button
                          onClick={() => handleShowComments(post.id)}
                          className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          💬 Comment
                        </button>
                        <button className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                          📤 Share
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Modal */}
        {showComments && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Comments</h3>
                  <button
                    onClick={closeComments}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
