import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CalendarPlus,
  Clock,
  Video,
  CheckCircle,
  AlertCircle,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';

const TOPIC_TEMPLATES = [
  'System Design & Architecture Review',
  'Resume & Portfolio Feedback',
  'Senior Engineering Promotion Strategy',
  'Mock Technical Interview Simulation',
  'Codebase & State Management Optimization',
];

const TIME_WINDOWS = [
  { id: 'morning', label: 'Morning', hours: '9:00 AM – 12:00 PM IST' },
  { id: 'afternoon', label: 'Afternoon', hours: '2:00 PM – 5:00 PM IST' },
  { id: 'evening', label: 'Evening', hours: '5:00 PM – 8:00 PM IST' },
];

export default function MenteeRequestMeeting() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mentorsList = state.matchedMentors || [];
  const preselectedMentorId = searchParams.get('mentor');

  const [selectedMentorId, setSelectedMentorId] = useState(
    preselectedMentorId || mentorsList[0]?.id || 'm1'
  );

  useEffect(() => {
    if (preselectedMentorId) {
      setSelectedMentorId(preselectedMentorId);
    }
  }, [preselectedMentorId]);

  const [topic, setTopic] = useState(TOPIC_TEMPLATES[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [urgency, setUrgency] = useState('This Week');
  const [timeWindow, setTimeWindow] = useState('Morning');
  const [duration, setDuration] = useState('45 mins');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const selectedMentor =
    mentorsList.find((m) => m.id === selectedMentorId) || mentorsList[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTopic = topic === 'Custom' ? (customTopic.trim() || 'General Mentorship Catchup') : topic;

    const payload = {
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      mentorTitle: `${selectedMentor.title}, ${selectedMentor.company}`,
      mentorAvatarColor: selectedMentor.avatarColor,
      mentorInitials: selectedMentor.initials,
      topic: finalTopic,
      urgency,
      preferredTime: `${timeWindow} (${TIME_WINDOWS.find((w) => w.label === timeWindow)?.hours || 'IST'})`,
      duration,
      notes: notes.trim() || 'No additional notes provided.',
    };

    dispatch({
      type: 'REQUEST_MEETING',
      payload,
    });

    setSubmittedSuccess(true);
    setNotes('');
    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4500);
  };

  const requests = state.meetingRequests || [];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Request a Meeting</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Select one of your matched mentors, share what you need help with, and request a 1-on-1 session. Your mentor will confirm their availability.
        </p>
      </div>

      {submittedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 shadow-xs animate-bounce-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold">Meeting Request Sent Successfully!</h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              {selectedMentor?.name} has received your agenda. You will be notified in messages as soon as the session is scheduled.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: The Meeting Request Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6"
          >
            {/* 1. Mentor Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                1. Choose Matched Mentor <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {mentorsList.map((m) => {
                  const isSelected = selectedMentorId === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setSelectedMentorId(m.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50/60 ring-2 ring-primary-500/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Avatar initials={m.initials} color={m.avatarColor} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-primary-800' : 'text-gray-900'}`}>
                          {m.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">{m.company}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Topic Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                2. Discussion Topic / Milestone <span className="text-rose-500">*</span>
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {TOPIC_TEMPLATES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
                <option value="Custom">Custom Topic...</option>
              </select>

              {topic === 'Custom' && (
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter your custom meeting topic..."
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}
            </div>

            {/* 3. Duration & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Session Duration
                </label>
                <div className="flex gap-2">
                  {['30 mins', '45 mins', '60 mins'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        duration === d
                          ? 'border-primary-600 bg-primary-600 text-white shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Target Timeframe
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="This Week">This Week (High Priority)</option>
                  <option value="Next Week">Next Week</option>
                  <option value="Flexible (Within 2 Weeks)">Flexible (Within 2 Weeks)</option>
                </select>
              </div>
            </div>

            {/* 4. Preferred Time of Day */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Preferred Time Window (IST)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TIME_WINDOWS.map((w) => (
                  <button
                    type="button"
                    key={w.id}
                    onClick={() => setTimeWindow(w.label)}
                    className={`p-2.5 text-left rounded-xl border transition-all ${
                      timeWindow === w.label
                        ? 'border-primary-600 bg-primary-50/70 ring-1 ring-primary-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-900">{w.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{w.hours}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Notes & Deliverables */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Specific Questions / Links to Review
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Share any PR links, Figma design URLs, or specific architectural questions you want feedback on..."
                className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-99"
            >
              <Send className="w-4 h-4" /> Send Request to {selectedMentor?.name}
            </button>
          </form>
        </div>

        {/* Right: Active Requests & Sessions List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Meeting Requests & Status
            </h3>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
              {requests.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => {
              const isConfirmed = req.status === 'confirmed';

              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${req.mentorAvatarColor || 'bg-teal-500'} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                        {req.mentorInitials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{req.mentorName}</p>
                        <p className="text-[10px] text-gray-500">{req.mentorTitle}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isConfirmed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}
                    >
                      {isConfirmed ? '✓ Confirmed' : '⏳ Pending Confirmation'}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-snug">{req.topic}</h5>
                    {req.notes && (
                      <p className="text-[11px] text-gray-500 mt-1 italic line-clamp-2">
                        "{req.notes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {req.duration} · {req.preferredTime?.split(' ')[0] || 'Morning'}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {req.scheduledDate}
                    </span>
                  </div>

                  {isConfirmed && (
                    <button
                      type="button"
                      onClick={() => alert(`Launching video session with ${req.mentorName}...`)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Video Room
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
