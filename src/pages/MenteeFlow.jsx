import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { matches } from '../data/mockData';
import SwipeableCards from '../components/matching/SwipeableCards';
import { ArrowRight, ArrowLeft, User, Briefcase, Sparkles, CheckCircle, Tag } from 'lucide-react';

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
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: '',
    skills: [],
    goals: '',
  });
  const [swipedCards, setSwipedCards] = useState([]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSwipe = (card, direction) => {
    setSwipedCards((prev) => [...prev, { ...card, liked: direction === 'right' }]);
  };

  const handleComplete = () => {
    dispatch({
      type: 'LOGIN',
      payload: { ...formData, role: 'mentee' },
    });
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Step {step} of 3</span>
            <span className="text-sm text-primary-600 font-medium">Mentee Registration</span>
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
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Let's get started</h2>
            <p className="text-gray-500 mb-6">Tell us a bit about yourself and where you're headed.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Aditya Kulkarni"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="alex@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="">Select your target role...</option>
                  {targetRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
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

        {/* Step 2: Swipeable Mentor Cards */}
        {step === 2 && (
          <div className="animate-bounce-in">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Meet your matches</h2>
              <p className="text-gray-500">Swipe right on mentors you'd like to connect with.</p>
            </div>

            <div className="flex justify-center mb-6" style={{ minHeight: '420px' }}>
              <SwipeableCards cards={matches} onSwipe={handleSwipe} />
            </div>

            <div className="flex gap-3">
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

        {/* Step 3: Deeper Profile */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-bounce-in">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Tag className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Almost there!</h2>
            <p className="text-gray-500 mb-6">Help us fine-tune your mentor matches.</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        formData.skills.includes(skill)
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Goals</label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none h-24"
                  placeholder="What do you most want to achieve with a mentor?"
                />
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
                onClick={handleComplete}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
