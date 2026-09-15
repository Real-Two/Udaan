import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../ui/Avatar';
import TemplateMenu from './TemplateMenu';

const ChatWindow = () => {
  const { state, dispatch } = useApp();
  const [inputText, setInputText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef(null);
  
  const mentor = state.messages.find(m => !m.isCurrentUser) || { senderName: 'Mentor', senderInitials: 'M', avatarColor: 'bg-teal-600' };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      senderInitials: 'U',
      avatarColor: 'bg-gray-400',
      text: inputText,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Avatar initials={mentor.senderInitials} color={mentor.avatarColor} />
        <div>
          <h2 className="font-semibold text-gray-900">{mentor.senderName}</h2>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {state.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start gap-3'}`}
          >
            {!msg.isCurrentUser && (
              <Avatar initials={msg.senderInitials} color={msg.avatarColor} className="flex-shrink-0" />
            )}
            <div className={`max-w-[75%] flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-2 text-sm ${
                  msg.isCurrentUser
                    ? 'bg-teal-600 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-gray-900 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-400 mt-1">
                {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="border border-gray-200 rounded-lg p-2.5 hover:bg-gray-50 text-gray-500 transition-colors"
              title="Templates"
            >
              <FileText size={20} />
            </button>
            <TemplateMenu
              isOpen={showTemplates}
              onClose={() => setShowTemplates(false)}
              onSelect={(text) => {
                setInputText(text);
              }}
            />
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none h-[46px] min-h-[46px] max-h-32 text-sm"
            rows="1"
          />
          
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-teal-600 text-white p-2.5 rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
