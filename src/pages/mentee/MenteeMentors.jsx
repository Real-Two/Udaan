import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, CalendarPlus, MessageSquare, ExternalLink, ShieldCheck, Clock, Award } from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import MentorProfileModal from '../../components/mentors/MentorProfileModal';

export default function MenteeMentors() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const mentorsList = state.matchedMentors || [];

  const handleOpenProfile = (mentor) => {
    dispatch({ type: 'VIEW_MENTOR_PROFILE', payload: mentor });
  };

  const handleRequestMeeting = (mentorId) => {
    navigate(`/mentee/request-meeting?mentor=${mentorId}`);
  };

  const handleSendMessage = () => {
    navigate('/mentee/messages');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Matched Mentors</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            The industry leaders paired with you. You can review their background, initiate chat, or request a strategy session.
          </p>
        </div>

        <button
          onClick={() => navigate('/mentee/request-meeting')}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
        >
          <CalendarPlus className="w-4 h-4" /> Request a Session
        </button>
      </div>

      {/* Grid of Matched Mentors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentorsList.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={mentor.initials} color={mentor.avatarColor} size="lg" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{mentor.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {mentor.title} at <span className="text-gray-800 font-semibold">{mentor.company}</span>
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Confirmed Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                {mentor.bio}
              </p>

              {/* Badges: Style & Timezone */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {mentor.style}
                </span>
                <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
                  {mentor.timezone?.split(' ')[0] || 'IST'}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.skills?.slice(0, 3).map((skill) => (
                  <Badge key={skill} color="bg-gray-50 text-gray-700 text-[10px] font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleOpenProfile(mentor)}
                className="w-full py-2 px-3 border border-gray-200 hover:border-primary-400 hover:bg-primary-50/30 text-gray-700 hover:text-primary-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Full Profile
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRequestMeeting(mentor.id)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1"
                >
                  <CalendarPlus className="w-3.5 h-3.5" /> Request Call
                </button>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="px-3 py-2 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center"
                  title="Message Mentor"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Mentor Profile Modal */}
      {state.selectedMentor && <MentorProfileModal />}
    </div>
  );
}
