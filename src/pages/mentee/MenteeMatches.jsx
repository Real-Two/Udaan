import React from 'react';
import MatchList from '../../components/matching/MatchList';

export default function MenteeMatches() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI-Suggested Matches</h1>
        <p className="text-gray-500 text-sm mt-1">Discover mentors tailored to your career goals and skills.</p>
      </div>
      <MatchList />
    </div>
  );
}
