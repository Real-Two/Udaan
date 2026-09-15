import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  MessageSquare,
  Calendar,
  User,
  Rocket,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const menteeNav = [
  { path: '/mentee', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/mentee/matches', icon: Users, label: 'Matches' },
  { path: '/mentee/goals', icon: Target, label: 'Goals' },
  { path: '/mentee/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/mentee/schedule', icon: Calendar, label: 'Schedule' },
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
  const { state } = useApp();

  const isMentor = location.pathname.startsWith('/mentor');
  const navItems = isMentor ? mentorNav : menteeNav;
  const user = state.user;

  const isActive = (path) => {
    if (path === '/mentee' || path === '/mentor') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — always visible */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Udaan</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isMentor ? 'Mentor Dashboard' : 'Mentee Dashboard'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-400'}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className={`w-8 h-8 ${isMentor ? 'bg-teal-500' : 'bg-cyan-500'} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
              {isMentor ? 'SI' : 'AK'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {isMentor ? 'Sneha Iyer' : 'Aditya Kulkarni'}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">{isMentor ? 'Mentor' : 'Mentee'}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </aside>

      {/* Main content — rendered by nested route */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
