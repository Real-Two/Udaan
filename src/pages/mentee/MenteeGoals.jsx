import React from 'react';
import KanbanBoard from '../../components/kanban/KanbanBoard';

export default function MenteeGoals() {
  return (
    <div className="flex-1 w-full h-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Goal Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track your mentorship milestones.</p>
      </div>
      <KanbanBoard />
    </div>
  );
}
