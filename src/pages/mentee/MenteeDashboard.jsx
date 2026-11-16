import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../../components/kanban/KanbanBoard';
import ChatWindow from '../../components/chat/ChatWindow';
import MentorProfileModal from '../../components/mentors/MentorProfileModal';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import {
  Calendar,
  Clock,
  Target,
  Video,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Bell,
  Users,
  CalendarPlus,
  ExternalLink,
} from 'lucide-react';

export default function MenteeDashboard() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const nextMeeting = state.meetings?.[0];
  const activeGoal =
    state.goals?.['in-progress']?.find((g) => g.isActive) ||
    state.goals?.['in-progress']?.[0];

  const matchedMentors = state.matchedMentors || [];
  const meetingRequests = state.meetingRequests || [];

  const handleOpenMentorProfile = (mentor) => {
    dispatch({ type: 'VIEW_MENTOR_PROFILE', payload: mentor });
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-16">
      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {state.user?.name ? state.user.name.split(' ')[0] : 'Aditya'} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your mentorship journey.</p>
      </div>

      {/* Hero Cards: Next Meeting & Active Goal */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {nextMeeting && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary-50 text-primary-600 p-2 rounded-xl">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Next Confirmed Meeting</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-sm">{nextMeeting.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{nextMeeting.date}</span>
                  <Clock className="w-3.5 h-3.5 ml-2" />
                  <span>{nextMeeting.time} ({nextMeeting.timezone})</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-full mb-1.5">
                  {nextMeeting.duration}
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${nextMeeting.mentor?.avatarColor || 'bg-teal-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                    {nextMeeting.mentor?.initials || 'SI'}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{nextMeeting.mentor?.name || 'Sneha Iyer'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGoal && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs border-l-4 border-l-primary-600">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-50 text-amber-600 p-2 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Active Priority Goal</h3>
            </div>

            <div>
              <p className="font-bold text-gray-900 text-sm">{activeGoal.title}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Completion</span>
                  <span className="font-bold text-primary-600">{activeGoal.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${activeGoal.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {activeGoal.tags?.map((tag, i) => {
                  const label = typeof tag === 'object' ? tag.label : tag;
                  const color = typeof tag === 'object' ? tag.color : 'bg-gray-100 text-gray-600';
                  return (
                    <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${color}`}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl"><Video className="w-5 h-5" /></div>
          <div>
            <p className="text-xl font-black text-gray-900">8</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Completed Sessions</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl"><Target className="w-5 h-5" /></div>
          <div>
            <p className="text-xl font-black text-gray-900">3</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Goals in Progress</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="bg-teal-50 text-teal-600 p-2.5 rounded-xl"><Users className="w-5 h-5" /></div>
          <div>
            <p className="text-xl font-black text-gray-900">{matchedMentors.length}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Matched Mentors</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="bg-rose-50 text-rose-600 p-2.5 rounded-xl"><CalendarPlus className="w-5 h-5" /></div>
          <div>
            <p className="text-xl font-black text-gray-900">{meetingRequests.length}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Session Requests</p>
          </div>
        </div>
      </div>

      {/* My Matched Mentors Section (Replaces Top Matches) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" /> My Mentors
            </h2>
            <p className="text-xs text-gray-500">Your confirmed mentors ready for 1-on-1 strategy and reviews</p>
          </div>
          <button
            onClick={() => navigate('/mentee/mentors')}
            className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-1"
          >
            View all mentors <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matchedMentors.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar initials={mentor.initials} color={mentor.avatarColor} size="md" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{mentor.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{mentor.title}</p>
                    <p className="text-[11px] font-semibold text-gray-700 truncate">{mentor.company}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.skills?.slice(0, 2).map((skill) => (
                    <Badge key={skill} color="bg-gray-100 text-gray-700 text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenMentorProfile(mentor)}
                  className="flex-1 border border-gray-200 hover:border-primary-400 hover:bg-primary-50/40 text-gray-700 hover:text-primary-700 rounded-xl py-2 px-2 text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> View Profile
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/mentee/request-meeting?mentor=${mentor.id}`)}
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
                >
                  <CalendarPlus className="w-3.5 h-3.5" /> Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Goal Tracker</h2>
            <p className="text-xs text-gray-500">Track and prioritize shared milestones with your advisors</p>
          </div>
          <button
            onClick={() => navigate('/mentee/goals')}
            className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-1"
          >
            Full board <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <KanbanBoard />
      </div>

      {/* Messages & Request a Meeting Previews */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Messages Preview */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
              <p className="text-xs text-gray-500">Quick-chat with mentors</p>
            </div>
            <button
              onClick={() => navigate('/mentee/messages')}
              className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-1"
            >
              Open messaging <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[420px] border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            <ChatWindow compact role="mentee" />
          </div>
        </div>

        {/* Meeting Requests & Sessions Preview (Replaces Schedule) */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Meeting Requests</h2>
              <p className="text-xs text-gray-500">Status of requested and confirmed sessions</p>
            </div>
            <button
              onClick={() => navigate('/mentee/request-meeting')}
              className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-1"
            >
              Request session <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-5 h-[420px] flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3">
              {meetingRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-gray-200 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${req.mentorAvatarColor || 'bg-teal-500'} text-white flex items-center justify-center text-[10px] font-bold`}>
                        {req.mentorInitials}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{req.mentorName}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {req.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 truncate">{req.topic}</p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>{req.duration} · {req.urgency}</span>
                    <span className="font-semibold text-gray-600">{req.scheduledDate}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/mentee/request-meeting')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" /> + Ask for a New Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Mentor Profile Modal */}
      {state.selectedMentor && <MentorProfileModal />}
    </div>
  );
}
