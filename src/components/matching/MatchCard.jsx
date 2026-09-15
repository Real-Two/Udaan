import React from 'react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

const MatchCard = ({ match }) => {
  const { mentor, score, reasons } = match;

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-5 relative flex flex-col gap-4">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Avatar 
            name={mentor.name} 
            initials={mentor.initials} 
            color={mentor.avatarColor} 
            size="lg" 
          />
          <div>
            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-500">{mentor.title} at {mentor.company}</p>
          </div>
        </div>
        <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold shrink-0">
          {score}%
        </div>
      </div>

      {/* Match Reasons */}
      <div className="flex flex-col gap-3 mt-2">
        {reasons && reasons.map((reason, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{reason.label}</span>
              <span>{reason.detail}</span>
            </div>
            <ProgressBar value={reason.value} color={idx === 0 ? 'bg-teal-500' : idx === 1 ? 'bg-emerald-500' : 'bg-amber-500'} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto pt-2">
        <button className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
          Connect
        </button>
        <button className="flex-1 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
