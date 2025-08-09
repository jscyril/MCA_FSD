import React from "react";

const CommentCard = ({ comment }) => {
  const { id, name, email, body } = comment;

  return (
    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-3">
          <h5 className="font-medium text-gray-800 text-sm">{name}</h5>
          <p className="text-xs text-gray-600">{email}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed ml-11">{body}</p>

      <div className="flex items-center justify-between mt-3 ml-11">
        <div className="flex space-x-3">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
            <svg
              className="w-4 h-4"
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
            <span className="text-xs">Like</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <span className="text-xs">Reply</span>
          </button>
        </div>

        <span className="text-xs text-gray-500">Comment #{id}</span>
      </div>
    </div>
  );
};

export default CommentCard;
