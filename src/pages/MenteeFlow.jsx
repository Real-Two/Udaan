import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { matches } from '../data/mockData';
import SwipeableCards from '../components/matching/SwipeableCards';
import { ArrowRight, ArrowLeft, User, Sparkles, CheckCircle, Tag, AlertCircle } from 'lucide-react';

const targetRoles = [
  'Senior Software Engineer',
  'Staff Engineer',
  'Engineering Manager',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Design Lead',
  'Tech Lead',
];

const skillOptions = [
  'JavaScript', 'React', 'Python', 'System Design', 'Machine Learning',
  'Product Strategy', 'Leadership', 'Data Analysis', 'UX Research',
  'Cloud Architecture', 'Agile', 'Communication',
];

export default function MenteeFlow() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: state.registrationData?.name || '',
    email: state.registrationData?.email || '',
    targetRole: state.registrationData?.targetRole || 'Senior Software Engineer',
    skills: ['JavaScript', 'React'],
    goals: '',
  });

  const [errors, setErrors] = useState({});
  const [swipedCards, setSwipedCards] = useState([]);

  useEffect(() => {
    if (state.registrationData) {
      setFormData((prev) => ({
        ...prev,
        name: state.registrationData.name || prev.name,
        email: state.registrationData.email || prev.email,
        targetRole: state.registrationData.targetRole || prev.targetRole,
      }));
    }
  }, [state.registrationData]);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleStep1Submit = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.targetRole) errs.targetRole = 'Please select your target role';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleSwipe = (card, direction) => {
    setSwipedCards((prev) => [...prev, { ...card, liked: direction === 'right' }]);
  };

  const handleComplete = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        ...formData,
        role: 'mentee',
      },
    });
    // Navigate straight to Mentee dashboard
    navigate('/mentee');
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
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
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Let's get started</h2>
            <p className="text-gray-500 text-sm mb-6">Tell us your background and where you want to go.</p>

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
                  placeholder="e.g. Aditya Kulkarni"
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
                  placeholder="e.g. aditya@techstartup.in"
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Target Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => {
                    setFormData({ ...formData, targetRole: e.target.value });
                    if (errors.targetRole) setErrors((prev) => ({ ...prev, targetRole: null }));
                  }}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {targetRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.targetRole && <p className="text-rose-500 text-xs mt-1">{errors.targetRole}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStep1Submit}
              className="mt-6 w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Continue to Mentor Matches
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: 3D Swipeable Cards */}
        {step === 2 && (
          <div>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your AI-Curated Mentors</h2>
              <p className="text-gray-500 text-xs mt-1">
                Swipe right to connect or left to pass. You can also use the buttons below.
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <SwipeableCards cards={matches} onSwipe={handleSwipe} />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Details
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Continue to Skills
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Deeper Profile & Goals */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 p-8">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
              <Tag className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Almost there!</h2>
            <p className="text-gray-500 text-sm mb-6">Fine-tune your skills and define your top milestone.</p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                  Select Your Core Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        formData.skills.includes(skill)
                          ? 'bg-primary-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill} {formData.skills.includes(skill) ? '✓' : '+'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Primary Learning Goal
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24"
                  placeholder="e.g. Master distributed system design, pass mock technical rounds, and earn promotion to Senior Engineer."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Matches
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <CheckCircle className="w-5 h-5" />
                Complete Setup & Launch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
