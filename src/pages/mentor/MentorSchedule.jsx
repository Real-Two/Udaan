import React from 'react';
import WeeklyCalendar from '../../components/scheduling/WeeklyCalendar';

const MentorSchedule = () => {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your availability and sessions</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <WeeklyCalendar />
      </div>
    </div>
  );
};

export default MentorSchedule;
