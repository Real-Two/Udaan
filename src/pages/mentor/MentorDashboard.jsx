import React from 'react';
import { Users, Calendar, Target, TrendingUp, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { mentees, mentors } from '../../data/mockData';
import ChatWindow from '../../components/chat/ChatWindow';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const mentor = mentors[0];
  const meetings = state?.meetings || [];

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mentor.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here's your mentorship overview.</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Mentees', value: '4', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Sessions This Week', value: '3', icon: Calendar, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Goals Reviewed', value: '12', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Response Rate', value: '98%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center shadow-sm">
            <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Mentees */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Your Mentees</h2>
            <button onClick={() => navigate('/mentor/mentees')} className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentees.map(mentee => (
              <div key={mentee.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${mentee.avatarColor}`}>
                      {mentee.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{mentee.name}</h3>
                      <p className="text-xs text-gray-500">{mentee.title} at {mentee.company}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-100">
                    Target: {mentee.targetRole}
                  </span>
                  {mentee.skills && mentee.skills.slice(0, 2).map((skill, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => navigate('/mentor/goals')}
                    className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center"
                  >
                    View Goals <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Sessions & Messages Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
              <button onClick={() => navigate('/mentor/schedule')} className="text-sm font-medium text-primary-600 hover:text-primary-700">Schedule</button>
            </div>
            <div className="space-y-3">
              {meetings.length > 0 ? meetings.slice(0, 3).map(meeting => (
                <div key={meeting.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                   <div className="bg-primary-100 text-primary-700 p-2 rounded-lg mr-3 flex flex-col items-center justify-center w-12">
                     <span className="text-xs font-semibold">{meeting.date?.split(' ')[0] || '15'}</span>
                     <span className="text-xs">{meeting.date?.split(' ')[1] || 'Sep'}</span>
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-900">{meeting.title || 'Mentorship Session'}</p>
                     <p className="text-xs text-gray-500">{meeting.time || '10:00 AM'} - {meeting.with || 'Mentee'}</p>
                   </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 italic">No upcoming sessions this week.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-80 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <button onClick={() => navigate('/mentor/messages')} className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 pointer-events-none opacity-50 z-10 bg-gradient-to-t from-white to-transparent h-12 bottom-0" />
              <div className="h-[250px] overflow-hidden -mx-2 pointer-events-none">
                 <ChatWindow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
