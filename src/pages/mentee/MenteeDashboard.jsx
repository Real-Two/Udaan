import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import MatchList from '../../components/matching/MatchList';
import KanbanBoard from '../../components/kanban/KanbanBoard';
import ChatWindow from '../../components/chat/ChatWindow';
import WeeklyCalendar from '../../components/scheduling/WeeklyCalendar';
import { Calendar, Clock, Target, Video, ChevronRight, Sparkles, TrendingUp, Bell } from 'lucide-react';

export default function MenteeDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const nextMeeting = state.meetings?.[0];
  const activeGoal = state.goals?.['in-progress']?.find(g => g.isActive) || state.goals?.['in-progress']?.[0];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {state.user?.name ? state.user.name.split(' ')[0] : 'Aditya'} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your mentorship journey.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {nextMeeting && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-50 text-teal-600 p-2 rounded-lg">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900">Next Meeting</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{nextMeeting.title}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{nextMeeting.date}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{nextMeeting.time} ({nextMeeting.timezone})</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full mb-2">
                  {nextMeeting.duration} min
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${nextMeeting.mentor?.avatarColor || 'bg-teal-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                    {nextMeeting.mentor?.initials || 'SI'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{nextMeeting.mentor?.name || 'Sneha Iyer'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGoal && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-l-4 border-l-teal-600">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-50 text-amber-600 p-2 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900">Active Goal</h3>
            </div>
            
            <div>
              <p className="font-medium text-gray-900">{activeGoal.title}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{activeGoal.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${activeGoal.progress}%` }}></div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {activeGoal.tags?.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Video className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 text-amber-600 p-3 rounded-xl"><Target className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Goals in Progress</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="bg-teal-50 text-teal-600 p-3 rounded-xl"><Sparkles className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl"><Bell className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Notifications</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Top Matches</h2>
          <button 
            onClick={() => navigate('/mentee/matches')}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <MatchList compact />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Goal Tracker</h2>
          <button 
            onClick={() => navigate('/mentee/goals')}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
          >
            Full board <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <KanbanBoard />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Messages</h2>
            <button 
              onClick={() => navigate('/mentee/messages')}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
            >
              Open chat <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[400px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <ChatWindow />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Schedule</h2>
            <button 
              onClick={() => navigate('/mentee/schedule')}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
            >
              Full calendar <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-[400px] overflow-auto">
            <WeeklyCalendar compact />
          </div>
        </div>
      </div>
    </div>
  );
}
