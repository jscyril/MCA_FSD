import React, { useState } from "react";

const PostCard = ({ post, user, onShowComments }) => {
  const { id, title, body, userId } = post;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold text-gray-800">
            {user?.name || "Unknown User"}
          </h4>
          <p className="text-sm text-gray-600">
            @{user?.username || "username"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {isExpanded
            ? body
            : `${body.substring(0, 150)}${body.length > 150 ? "..." : ""}`}
        </p>
        {body.length > 150 && (
          <button
            onClick={toggleExpanded}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">Like</span>
          </button>

          <button
            onClick={() => onShowComments(post)}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">Comments</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span className="text-sm">Share</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">Post #{id}</div>
      </div>
    </div>
  );
};

export default PostCard;
