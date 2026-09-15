import { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import MatchList from '../components/matching/MatchList';
import KanbanBoard from '../components/kanban/KanbanBoard';
import ChatWindow from '../components/chat/ChatWindow';
import WeeklyCalendar from '../components/scheduling/WeeklyCalendar';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Target,
  Video,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Bell,
} from 'lucide-react';

function NextMeetingCard({ meeting }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-primary-600 uppercase tracking-wider">Next Meeting</p>
            <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
          </div>
        </div>
        <span className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
          {meeting.duration}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {meeting.date}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {meeting.time} {meeting.timezone}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className={`w-7 h-7 ${meeting.mentor.avatarColor} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
          {meeting.mentor.initials}
        </div>
        <span className="text-sm text-gray-600">with {meeting.mentor.name}</span>
      </div>
    </div>
  );
}

function ActiveGoalCard({ goal }) {
  if (!goal) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-l-4 border-l-primary-600 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Current Goal</p>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
          </div>
        </div>
        <span className="text-sm font-bold text-primary-600">{goal.progress}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-700"
          style={{ width: `${goal.progress}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {goal.tags.map((tag) => (
          <span key={tag.label} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tag.color}`}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuickStats() {
  const stats = [
    { label: 'Sessions This Month', value: '8', icon: Video, color: 'text-primary-600 bg-primary-50' },
    { label: 'Goals In Progress', value: '3', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
    { label: 'Match Score', value: '92%', icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
    { label: 'Notifications', value: '5', icon: Bell, color: 'text-rose-600 bg-rose-50' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  const nextMeeting = state.meetings[0];
  const activeGoal = state.goals['in-progress']?.find((g) => g.isActive) || state.goals['in-progress']?.[0];

  const renderContent = () => {
    switch (activeTab) {
      case 'matches':
        return <MatchList />;
      case 'goals':
        return <KanbanBoard />;
      case 'messages':
        return (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm" style={{ height: '600px' }}>
            <ChatWindow />
          </div>
        );
      case 'schedule':
        return <WeeklyCalendar />;
      case 'profile':
        return (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              AK
            </div>
            <h2 className="text-xl font-bold text-gray-900">Aditya Kulkarni</h2>
            <p className="text-gray-500">Junior Software Engineer at TechStartup Labs</p>
            <p className="text-sm text-primary-600 mt-1">Target: Senior Engineer</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['JavaScript', 'React', 'Python'].map((s) => (
                <span key={s} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">{s}</span>
              ))}
            </div>
          </div>
        );
      default:
        // Dashboard overview
        return (
          <>
            {/* Hero cards: Next Meeting + Current Goal */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <NextMeetingCard meeting={nextMeeting} />
              <ActiveGoalCard goal={activeGoal} />
            </div>

            {/* Quick Stats */}
            <div className="mb-6">
              <QuickStats />
            </div>

            {/* Matches Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Top Matches
                </h2>
                <button
                  onClick={() => setActiveTab('matches')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <MatchList compact />
            </div>

            {/* Goals Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Goal Tracker
                </h2>
                <button
                  onClick={() => setActiveTab('goals')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  Full board <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <KanbanBoard />
            </div>

            {/* Chat + Schedule side by side */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Open chat <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm" style={{ height: '400px' }}>
                  <ChatWindow />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Full view <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <WeeklyCalendar compact />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'dashboard' ? 'Welcome back, Aditya 👋' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeTab === 'dashboard'
              ? 'Here\'s what\'s happening with your mentorship journey.'
              : `Manage your ${activeTab} here.`}
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
