import React from 'react';

export default function MenteeProfile() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and preferences.</p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-cyan-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
            AK
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Aditya Kulkarni</h2>
            <p className="text-gray-600 font-medium">Junior Software Engineer at TechStartup Labs</p>
            <p className="text-gray-500 mt-1">Target Role: Senior Engineer</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'React', 'Python', 'Web Development', 'System Design'].map((skill, index) => (
              <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
