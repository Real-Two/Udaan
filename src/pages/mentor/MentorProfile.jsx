import React from 'react';
import { useApp } from '../../context/AppContext';
import { mentors } from '../../data/mockData';
import { Briefcase, MapPin, Clock, Award, Mail, CheckCircle } from 'lucide-react';

const MentorProfile = () => {
  const { state } = useApp();
  const user = state.user || {};
  const isSelf = user.role === 'mentor';

  const mentor = isSelf
    ? {
        name: user.name || 'Sneha Iyer',
        email: user.email || 'sneha@udaan.com',
        title: user.title || 'VP of Engineering',
        company: user.company || 'Razorpay',
        industry: user.industry || 'FinTech',
        yearsExp: user.yearsExp || 12,
        timezone: 'IST (UTC+5:30)',
        bio: user.bio || 'Passionate about scaling engineering teams, system design architecture, and mentoring engineers to transition from individual contributors to technical leads.',
        skills: user.skills?.length > 0 ? user.skills : ['System Design', 'Leadership', 'Cloud Architecture', 'Scaling'],
        style: 'Direct Coaching',
        avatarColor: user.avatarColor || 'bg-teal-500',
        initials: user.initials || 'SI',
      }
    : mentors[0];

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Mentor Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your mentoring credentials, styles, and availability.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-teal-700"></div>
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className={`w-24 h-24 rounded-full border-4 border-white ${mentor.avatarColor} flex items-center justify-center text-white text-3xl font-extrabold absolute -top-12 shadow-md`}>
            {mentor.initials}
          </div>

          <div className="mt-14 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2.5 py-0.5 rounded-full border border-teal-100">
                  Verified Mentor
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 font-medium">{mentor.title} at {mentor.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider text-xs">
                About & Bio
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                {mentor.bio}
              </p>

              <div className="space-y-2 mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary-600" />
                  <span>{mentor.yearsExp} Years of Experience in {mentor.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span>Primary Timezone: {mentor.timezone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-600" />
                  <span>{mentor.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-wider text-xs">
                Advisory Skills & Focus
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-teal-50 border border-teal-100">
                <p className="text-xs font-bold text-teal-900">Mentorship Style</p>
                <p className="text-xs text-teal-700 mt-1">{mentor.style}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
