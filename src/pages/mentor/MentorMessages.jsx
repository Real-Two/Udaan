import React from 'react';
import ChatWindow from '../../components/chat/ChatWindow';

const MentorMessages = () => {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">Stay connected with your mentees</p>
      </header>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[600px] min-h-[500px]">
        <ChatWindow />
      </div>
    </div>
  );
};

export default MentorMessages;
