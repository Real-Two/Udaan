import React from 'react';
import { Sparkles } from 'lucide-react';
import MatchCard from './MatchCard';
import { matches } from '../../data/mockData';

const MatchList = ({ compact = false }) => {
  const displayMatches = compact ? matches.slice(0, 2) : matches;

  return (
    <div className="w-full">
      {!compact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-teal-600" size={24} />
            AI-Suggested Matches
          </h2>
          <p className="text-gray-500 mt-1">
            Based on your skills, goals, and working style, here are your best mentor matches.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchList;
