import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Globe,
  Heart,
  CheckCircle,
} from 'lucide-react';

const industries = [
  'Technology', 'FinTech', 'Healthcare', 'Education', 'E-Commerce',
  'Media & Entertainment', 'Consulting', 'Finance', 'Design', 'Other',
];

const timezones = [
  { label: 'PST (UTC-8) — US Pacific', value: 'PST' },
  { label: 'MST (UTC-7) — US Mountain', value: 'MST' },
  { label: 'CST (UTC-6) — US Central', value: 'CST' },
  { label: 'EST (UTC-5) — US Eastern', value: 'EST' },
  { label: 'GMT (UTC+0) — UK/Ireland', value: 'GMT' },
  { label: 'CET (UTC+1) — Central Europe', value: 'CET' },
  { label: 'IST (UTC+5:30) — India', value: 'IST' },
  { label: 'CST (UTC+8) — China/Singapore', value: 'CST-Asia' },
  { label: 'JST (UTC+9) — Japan', value: 'JST' },
  { label: 'AEST (UTC+10) — Australia', value: 'AEST' },
];

const styles = [
  {
    id: 'direct',
    title: 'Direct Coaching',
    emoji: '🎯',
    description: 'Hands-on guidance with specific advice, code reviews, and direct feedback.',
  },
  {
    id: 'guided',
    title: 'Guided Discovery',
    emoji: '🧭',
    description: 'Ask questions that lead mentees to their own insights and solutions.',
  },
  {
    id: 'accountability',
    title: 'Accountability Partner',
    emoji: '🤝',
    description: 'Regular check-ins focused on goal progress, habits, and consistent growth.',
  },
  {
    id: 'sponsor',
    title: 'Career Sponsor',
    emoji: '🚀',
    description: 'Open doors through introductions, recommendations, and advocacy.',
  },
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hourSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function MentorFlow() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    yearsExp: '',
    timezone: '',
    availability: {},
    style: '',
    bio: '',
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleSlot = (day, hour) => {
    const key = `${day}-${hour}`;
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [key]: !prev.availability[key],
      },
    }));
  };

  const handleComplete = () => {
    dispatch({
      type: 'LOGIN',
      payload: { ...formData, role: 'mentor' },
    });
    navigate('/mentor');
  };

  const formatHour = (h) => {
    if (h === 12) return '12 PM';
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Step {step} of 3</span>
            <span className="text-sm text-primary-600 font-medium">Mentor Registration</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-bounce-in">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Share your expertise</h2>
            <p className="text-gray-500 mb-6">Tell us about your professional background.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Sneha Iyer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="sneha@razorpay.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="">Select your industry...</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={formData.yearsExp}
                  onChange={(e) => setFormData({ ...formData, yearsExp: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="10"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Availability */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-bounce-in">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">When are you available?</h2>
            <p className="text-gray-500 mb-6">Select your timezone and available hours.</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="">Select timezone...</option>
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Availability</label>
                <p className="text-xs text-gray-400 mb-3">Click slots to toggle availability</p>
                <div className="overflow-x-auto">
                  <div className="inline-grid gap-1" style={{ gridTemplateColumns: 'auto repeat(7, 1fr)' }}>
                    {/* Day headers */}
                    <div />
                    {dayLabels.map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-gray-500 pb-1 px-1">
                        {d}
                      </div>
                    ))}

                    {/* Hour rows */}
                    {hourSlots.map((h) => (
                      <>
                        <div key={`h-${h}`} className="text-xs text-gray-400 pr-2 flex items-center">
                          {formatHour(h)}
                        </div>
                        {dayLabels.map((_, di) => {
                          const key = `${di}-${h}`;
                          const active = formData.availability[key];
                          return (
                            <button
                              key={key}
                              onClick={() => toggleSlot(di, h)}
                              className={`w-9 h-7 rounded transition-all duration-150 ${
                                active
                                  ? 'bg-primary-500 shadow-sm'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                            />
                          );
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBack}
                className="flex-1 border border-gray-200 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Mentorship Style */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-bounce-in">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Your mentoring style</h2>
            <p className="text-gray-500 mb-6">How do you prefer to mentor?</p>

            <div className="space-y-3 mb-5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFormData({ ...formData, style: s.id })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.style === s.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="text-sm text-gray-500">{s.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio (optional)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none h-20"
                placeholder="Tell mentees about your experience and what you offer..."
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBack}
                className="flex-1 border border-gray-200 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Start Mentoring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
