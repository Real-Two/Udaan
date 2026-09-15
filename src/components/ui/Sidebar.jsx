import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  MessageSquare,
  Calendar,
  User,
  Rocket,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/matches', icon: Users, label: 'Matches' },
  { to: '/dashboard/goals', icon: Target, label: 'Goals' },
  { to: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/dashboard/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Udaan</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Elevate your career</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = activeTab === label.toLowerCase();
          return (
            <button
              key={label}
              onClick={() => onTabChange(label.toLowerCase())}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Aditya Kulkarni</p>
            <p className="text-xs text-gray-500 truncate">Mentee</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
