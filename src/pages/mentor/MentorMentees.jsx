import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mentees } from '../../data/mockData';
import { MessageSquare, Target } from 'lucide-react';

const MentorMentees = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Mentees</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage your mentee relationships</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentees.map(mentee => (
          <div key={mentee.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${mentee.avatarColor}`}>
                {mentee.initials}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{mentee.name}</h3>
                <p className="text-sm text-gray-500">{mentee.title}</p>
                <p className="text-xs text-gray-400">{mentee.company}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Target Role</span>
                <p className="text-sm font-medium text-primary-700 bg-primary-50 inline-block px-2 py-0.5 rounded-full mt-1 border border-primary-100">
                  {mentee.targetRole}
                </p>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Focus Areas</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {mentee.skills && mentee.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {mentee.goals && mentee.goals.length > 0 && (
                 <div>
                   <span className="text-xs text-gray-500 uppercase font-semibold">Current Goals</span>
                   <ul className="mt-1 space-y-1">
                     {mentee.goals.slice(0, 2).map((goal, idx) => (
                       <li key={idx} className="text-sm text-gray-700 flex items-center before:content-['•'] before:mr-2 before:text-primary-500">
                         {goal.title || goal}
                       </li>
                     ))}
                   </ul>
                 </div>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => navigate('/mentor/messages')}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </button>
              <button 
                onClick={() => navigate('/mentor/goals')}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center transition-colors"
              >
                <Target className="w-4 h-4 mr-2" /> View Goals
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorMentees;
