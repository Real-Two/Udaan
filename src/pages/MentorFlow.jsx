import { useState, useEffect } from 'react';
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
  'Consumer Tech', 'Consulting', 'Finance', 'Design', 'Other',
];

const timezones = [
  { label: 'IST (UTC+5:30) — India', value: 'IST' },
  { label: 'PST (UTC-8) — US Pacific', value: 'PST' },
  { label: 'EST (UTC-5) — US Eastern', value: 'EST' },
  { label: 'GMT (UTC+0) — UK/Europe', value: 'GMT' },
  { label: 'CET (UTC+1) — Central Europe', value: 'CET' },
  { label: 'SGT (UTC+8) — Singapore', value: 'SGT' },
];

const styles = [
  {
    id: 'direct',
    title: 'Direct Coaching',
    emoji: '🎯',
    description: 'Hands-on architectural guidance, tactical code reviews, and explicit feedback.',
  },
  {
    id: 'guided',
    title: 'Guided Discovery',
    emoji: '🧭',
    description: 'Socratic questioning that leads mentees to their own architectural solutions.',
  },
  {
    id: 'accountability',
    title: 'Accountability Partner',
    emoji: '🤝',
    description: 'Structured weekly milestones focused on promotion criteria and habits.',
  },
  {
    id: 'sponsor',
    title: 'Career Sponsor',
    emoji: '🚀',
    description: 'High-visibility advocacy, portfolio teardowns, and leadership intros.',
  },
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hourSlots = [9, 10, 11, 14, 15, 16, 17, 18, 19];

export default function MentorFlow() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: state.registrationData?.name || '',
    email: state.registrationData?.email || '',
    industry: state.registrationData?.industry || 'Technology',
    yearsExp: '10',
    timezone: 'IST',
    availability: { '0-10': true, '2-15': true, '4-11': true },
    style: 'direct',
    bio: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state.registrationData) {
      setFormData((prev) => ({
        ...prev,
        name: state.registrationData.name || prev.name,
        email: state.registrationData.email || prev.email,
        industry: state.registrationData.industry || prev.industry,
      }));
    }
  }, [state.registrationData]);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleStep1Submit = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.industry) errs.industry = 'Industry selection is required';
    if (!formData.yearsExp || parseInt(formData.yearsExp) < 1) {
      errs.yearsExp = 'Please enter valid years of experience (at least 1)';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStep(2);
  };

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
      type: 'REGISTER',
      payload: {
        ...formData,
        role: 'mentor',
      },
    });
    navigate('/mentor');
  };

  const formatHour = (h) => {
    if (h === 12) return '12 PM';
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Top Exit Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <span className="text-xs font-medium text-gray-400">Step {step} of 3</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basics with Full Validation */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-8">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Mentor Profile</h2>
            <p className="text-gray-500 text-sm mb-6">Tell us about your professional expertise and track record.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                  }}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200'
                  }`}
                  placeholder="e.g. Sneha Iyer"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200'
                  }`}
                  placeholder="e.g. sneha@razorpay.com"
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Primary Industry <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => {
                    setFormData({ ...formData, industry: e.target.value });
                    if (errors.industry) setErrors((prev) => ({ ...prev, industry: null }));
                  }}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-rose-500 text-xs mt-1">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Years of Experience <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.yearsExp}
                  onChange={(e) => {
                    setFormData({ ...formData, yearsExp: e.target.value });
                    if (errors.yearsExp) setErrors((prev) => ({ ...prev, yearsExp: null }));
                  }}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.yearsExp ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200'
                  }`}
                  min="1"
                  max="50"
                  placeholder="10"
                />
                {errors.yearsExp && <p className="text-rose-500 text-xs mt-1">{errors.yearsExp}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStep1Submit}
              className="mt-6 w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              Continue to Availability
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Availability */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-8">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">When can you mentor?</h2>
            <p className="text-gray-500 text-sm mb-6">Select your primary timezone and open hours for sessions.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase">
                    Weekly Slots
                  </label>
                  <span className="text-[11px] text-gray-400">Click to toggle active hours</span>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  <div className="inline-grid gap-1" style={{ gridTemplateColumns: 'auto repeat(7, 1fr)' }}>
                    <div />
                    {dayLabels.map((d) => (
                      <div key={d} className="text-center text-[11px] font-bold text-gray-500 pb-1">
                        {d}
                      </div>
                    ))}

                    {hourSlots.map((h) => (
                      <div key={`row-${h}`} className="contents">
                        <div className="text-[10px] text-gray-400 pr-2 flex items-center font-medium">
                          {formatHour(h)}
                        </div>
                        {dayLabels.map((_, di) => {
                          const key = `${di}-${h}`;
                          const active = formData.availability[key];
                          return (
                            <button
                              type="button"
                              key={key}
                              onClick={() => toggleSlot(di, h)}
                              className={`w-8 h-7 rounded transition-all duration-150 ${
                                active
                                  ? 'bg-primary-600 shadow-xs'
                                  : 'bg-white border border-gray-200 hover:border-primary-400'
                              }`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Continue to Style
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Mentorship Style & Bio */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-8">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Mentorship Style</h2>
            <p className="text-gray-500 text-sm mb-6">Choose how you best engage with your mentees.</p>

            <div className="space-y-3 mb-5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, style: s.id })}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 ${
                    formData.style === s.id
                      ? 'border-primary-600 bg-primary-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Short Bio / Expertise Note
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-20"
                placeholder="Share your technical leadership background or what areas you love coaching..."
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <CheckCircle className="w-5 h-5" />
                Finish & Go to Mentor Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
