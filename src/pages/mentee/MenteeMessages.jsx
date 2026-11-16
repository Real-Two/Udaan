import React from 'react';
import ChatWindow from '../../components/chat/ChatWindow';

export default function MenteeMessages() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">Chat with your mentor</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[650px] overflow-hidden">
        <ChatWindow role="mentee" />
      </div>
    </div>
  );
}
