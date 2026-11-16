import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Clock, MessageSquare, CalendarPlus, CheckCircle, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';

export default function MentorProfileModal() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const mentor = state.selectedMentor;

  if (!mentor) return null;

  const handleClose = () => {
    dispatch({ type: 'VIEW_MENTOR_PROFILE', payload: null });
  };

  const handleRequestMeeting = () => {
    handleClose();
    navigate(`/mentee/request-meeting?mentor=${mentor.id}`);
  };

  const handleMessage = () => {
    handleClose();
    navigate('/mentee/messages');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-xl w-full z-10 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-primary-600 via-teal-700 to-teal-800 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 pb-6 pt-0 relative">
            {/* Avatar */}
            <div className={`w-20 h-20 rounded-2xl border-4 border-white ${mentor.avatarColor || 'bg-teal-600'} text-white flex items-center justify-center text-2xl font-black shadow-md -mt-10 mb-3`}>
              {mentor.initials}
            </div>

            {/* Title & Organization */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Matched Mentor
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">
                  {mentor.title} at <span className="text-gray-900 font-bold">{mentor.company}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg">
                  {mentor.yearsExp} Yrs Experience
                </span>
                <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-lg font-semibold">
                  {mentor.timezone?.split(' ')[0] || 'IST'}
                </span>
              </div>
            </div>

            {/* Bio & Background */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                About & Track Record
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                {mentor.bio || 'Seasoned technical leader dedicated to helping high-potential engineers navigate promotions, system architecture, and team leadership.'}
              </p>
            </div>

            {/* Advisory Skills */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Core Advisory Domains
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {mentor.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary-50 text-primary-700 font-semibold px-2.5 py-1 rounded-full text-xs border border-primary-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentorship Style & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mentorship Style</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{mentor.style || 'Direct Coaching'}</p>
                <p className="text-[11px] text-gray-500 mt-1">Focus on tactical architecture reviews and actionable growth.</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Availability</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{mentor.availability || 'Tue/Thu 10am-12pm IST'}</p>
                <p className="text-[11px] text-gray-500 mt-1">Accepting 1-on-1 strategy sessions upon request.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleRequestMeeting}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-98"
              >
                <CalendarPlus className="w-4 h-4" /> Request a 1-on-1 Meeting
              </button>
              <button
                type="button"
                onClick={handleMessage}
                className="flex-1 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-gray-500" /> Send Message
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
