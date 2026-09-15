import React from 'react';
import { mentors } from '../../data/mockData';
import { Briefcase, MapPin, Clock, Award } from 'lucide-react';

const MentorProfile = () => {
  const mentor = mentors[0] || {
    name: 'Sneha Iyer',
    title: 'VP of Engineering',
    company: 'Razorpay',
    industry: 'FinTech',
    yearsExp: 12,
    timezone: 'IST',
    bio: 'Experienced engineering leader passionate about scaling teams and building resilient systems. Love mentoring early-stage engineers and helping them navigate their careers.',
    skills: ['System Design', 'Leadership', 'React', 'Node.js', 'Scaling'],
    style: 'Direct & Constructive'
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your professional information</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-white bg-teal-500 flex items-center justify-center text-white text-3xl font-bold absolute -top-12 shadow-md">
            {mentor.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div className="mt-14 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
              <p className="text-lg text-gray-600 mt-1">{mentor.title} at {mentor.company}</p>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {mentor.bio || 'Experienced engineering leader passionate about scaling teams and building resilient systems. Love mentoring early-stage engineers and helping them navigate their careers.'}
              </p>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Industry: <span className="font-medium text-gray-900">{mentor.industry || 'Tech'}</span></span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Award className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Experience: <span className="font-medium text-gray-900">{mentor.yearsExp || 10} Years</span></span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Location: <span className="font-medium text-gray-900">India</span></span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Timezone: <span className="font-medium text-gray-900">{mentor.timezone || 'IST'}</span></span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {(mentor.skills || ['Leadership', 'System Design']).map((skill, idx) => (
                    <span key={idx} className="bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Mentorship Style</h3>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {mentor.style || 'Supportive & Goal-Oriented'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
