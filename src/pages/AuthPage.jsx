import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rocket, ArrowLeft, ArrowRight, UserCheck, ShieldCheck, Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function AuthPage({ role = 'mentee' }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  const { state, dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer');
  const [industry, setIndustry] = useState('Technology');
  const [errors, setErrors] = useState({});

  const isMentor = role === 'mentor';

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password.trim()) {
      errs.password = 'Password is required';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    dispatch({
      type: 'DEMO_LOGIN',
      payload: { email },
    });

    // Check if user exists in state
    const targetProfile = state.profiles.find(
      (p) => p.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (targetProfile) {
      navigate(targetProfile.role === 'mentor' ? '/mentor' : '/mentee');
    }
  };

  const handleQuickDemoLogin = (demoProfile) => {
    dispatch({
      type: 'LOGIN',
      payload: demoProfile,
    });
    navigate(demoProfile.role === 'mentor' ? '/mentor' : '/mentee');
  };

  const handleSignupStart = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    // Store in registrationData and navigate to the step-by-step flow
    dispatch({
      type: 'UPDATE_REGISTRATION',
      payload: {
        name: name.trim(),
        email: email.trim(),
        targetRole,
        industry,
        role,
      },
    });

    if (isMentor) {
      navigate('/register/mentor');
    } else {
      navigate('/register/mentee');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Back Nav */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Udaan</span>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isLogin ? `Welcome back, ${isMentor ? 'Mentor' : 'Mentee'}` : `Join Udaan as a ${isMentor ? 'Mentor' : 'Mentee'}`}
        </h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          {isLogin
            ? 'Sign in to access your dashboard and active matches'
            : 'Create your account to start your personalized journey'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-200 sm:px-10">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                dispatch({ type: 'CLEAR_AUTH_ERROR' });
              }}
              className={`flex-1 pb-3 text-sm font-semibold text-center border-b-2 transition-all ${
                isLogin
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                dispatch({ type: 'CLEAR_AUTH_ERROR' });
              }}
              className={`flex-1 pb-3 text-sm font-semibold text-center border-b-2 transition-all ${
                !isLogin
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              New Registration (Sign Up)
            </button>
          </div>

          {/* Auth Error Banner */}
          {state.authError && (
            <div className="mb-4 bg-rose-50 border border-rose-200 rounded-lg p-3 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{state.authError}</span>
            </div>
          )}

          {isLogin ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder={isMentor ? 'sneha@udaan.com' : 'aditya@udaan.com'}
                    className={`block w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.email ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                    }}
                    placeholder="••••••••"
                    className={`block w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.password ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                Sign In to Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Demo Profiles */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">
                  Or 1-Click Demo Log In
                </p>
                <div className="space-y-2">
                  {state.profiles
                    .filter((p) => (isMentor ? p.role === 'mentor' : p.role === 'mentee'))
                    .map((profile) => (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => handleQuickDemoLogin(profile)}
                        className="w-full text-left p-2.5 rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50/40 transition-all flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${profile.avatarColor} text-white flex items-center justify-center font-bold text-[10px]`}>
                            {profile.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 group-hover:text-primary-700">{profile.name}</p>
                            <p className="text-[11px] text-gray-400">{profile.email}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-primary-600 group-hover:underline">Log in →</span>
                      </button>
                    ))}
                </div>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignupStart} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`block w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.name ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Work / Personal Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="you@company.com"
                    className={`block w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.email ? 'border-rose-300 bg-rose-50/30' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {!isMentor ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Target Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    <option value="Senior Software Engineer">Senior Software Engineer</option>
                    <option value="Staff Engineer">Staff Engineer</option>
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="UX Designer">UX Designer</option>
                    <option value="Design Lead">Design Lead</option>
                    <option value="Tech Lead">Tech Lead</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Industry Focus <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Consumer Tech">Consumer Tech</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                Proceed to Matching Onboarding <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
