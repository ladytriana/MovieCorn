import React from 'react';

function ReviewCard({ username, rating, review }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-3 border border-gray-700">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-yellow-400">{username || 'User'}</span>
        <span className="text-sm bg-yellow-500/20 text-yellow-300 px-2 rounded">⭐ {rating}/10</span>
      </div>
      <p className="text-gray-300 text-sm">{review}</p>
    </div>
  );
}

export default ReviewCard;