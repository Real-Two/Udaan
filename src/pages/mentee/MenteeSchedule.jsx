import React from 'react';
import WeeklyCalendar from '../../components/scheduling/WeeklyCalendar';

export default function MenteeSchedule() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your meetings and availability.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <WeeklyCalendar />
      </div>
    </div>
  );
}
