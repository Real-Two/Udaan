import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Briefcase, Target, Shield, CheckCircle } from 'lucide-react';

export default function MenteeProfile() {
  const { state } = useApp();
  const user = state.user || {};

  const name = user.name || 'Aditya Kulkarni';
  const email = user.email || 'aditya@udaan.com';
  const initials = user.initials || 'AK';
  const avatarColor = user.avatarColor || 'bg-cyan-500';
  const title = user.title || 'Junior Software Engineer';
  const company = user.company || 'TechStartup Labs';
  const targetRole = user.targetRole || 'Senior Software Engineer';
  const skills = user.skills?.length > 0
    ? user.skills
    : ['JavaScript', 'React', 'Python', 'System Design'];

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Mentee Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Review your registered credentials, goals, and matching preferences.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
          <div className={`w-20 h-20 ${avatarColor} text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-sm shrink-0`}>
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <span className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-full font-semibold border border-cyan-100">
                Active Mentee
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium mt-1">{title} · {company}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {email}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-primary-600" /> Target: {targetRole}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Core Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Mentorship Verification Status
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Profile verified for AI matching on Udaan platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
