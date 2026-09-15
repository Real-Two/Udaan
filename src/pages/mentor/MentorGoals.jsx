import React from 'react';
import KanbanBoard from '../../components/kanban/KanbanBoard';

const MentorGoals = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Goal Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Track and guide your mentees' progress</p>
      </header>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
};

export default MentorGoals;
