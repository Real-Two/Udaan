import { useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  MessageSquare,
  CalendarPlus,
  Calendar,
  User,
  Rocket,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const menteeNav = [
  { path: '/mentee', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/mentee/mentors', icon: Users, label: 'My Mentors' },
  { path: '/mentee/goals', icon: Target, label: 'Goals' },
  { path: '/mentee/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/mentee/request-meeting', icon: CalendarPlus, label: 'Request Meeting' },
  { path: '/mentee/profile', icon: User, label: 'Profile' },
];

const mentorNav = [
  { path: '/mentor', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/mentor/mentees', icon: Users, label: 'My Mentees' },
  { path: '/mentor/goals', icon: Target, label: 'Goals' },
  { path: '/mentor/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/mentor/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/mentor/profile', icon: User, label: 'Profile' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useApp();
  const mainRef = useRef(null);

  // Scroll to top automatically when navigating to any new page
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isMentor = location.pathname.startsWith('/mentor');
  const navItems = isMentor ? mentorNav : menteeNav;
  const currentUser = state.user || {};

  const initials = currentUser.initials || (isMentor ? 'SI' : 'AK');
  const displayName = currentUser.name || (isMentor ? 'Sneha Iyer' : 'Aditya Kulkarni');
  const avatarColor = currentUser.avatarColor || (isMentor ? 'bg-teal-500' : 'bg-cyan-500');

  const isActive = (path) => {
    if (path === '/mentee' || path === '/mentor') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleSwitchRole = () => {
    if (isMentor) {
      navigate('/mentee');
    } else {
      navigate('/mentor');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — always visible */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shrink-0">
        {/* Logo & Platform Brand */}
        <div className="p-5 border-b border-gray-200">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-xs">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Udaan</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isMentor ? 'bg-teal-50 text-teal-700' : 'bg-cyan-50 text-cyan-700'
            }`}>
              {isMentor ? 'Mentor Portal' : 'Mentee Portal'}
            </span>
            <button
              onClick={handleSwitchRole}
              title={`Switch to ${isMentor ? 'Mentee' : 'Mentor'} view`}
              className="text-[10px] text-gray-400 hover:text-primary-600 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Switch
            </button>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  active
                    ? 'bg-primary-50 text-primary-700 shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Profile & Navigation Footer */}
        <div className="p-3 border-t border-gray-200 space-y-1.5">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gray-50 border border-gray-100">
            <div className={`w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-[10px] text-gray-500 truncate capitalize">
                {isMentor ? 'Active Mentor' : 'Active Mentee'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out / Return Home
          </button>
        </div>
      </aside>

      {/* Main content — resets scroll to top automatically on page change */}
      <main ref={mainRef} className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
