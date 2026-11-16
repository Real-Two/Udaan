import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, FileText, User, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../ui/Avatar';
import TemplateMenu from './TemplateMenu';
import { mentors, mentees } from '../../data/mockData';

// Multi-contact conversations mapping
const INITIAL_CONVERSATIONS = {
  // Mentors for mentee to chat with
  'm1': {
    id: 'm1',
    name: 'Sneha Iyer',
    role: 'VP of Engineering, Razorpay',
    gender: 'female',
    avatarColor: 'bg-teal-500',
    initials: 'SI',
    online: true,
  },
  'm4': {
    id: 'm4',
    name: 'Karthik Raman',
    role: 'Staff Engineer, Zerodha',
    gender: 'male',
    avatarColor: 'bg-orange-500',
    initials: 'KR',
    online: true,
  },
  'm7': {
    id: 'm7',
    name: 'Vikram Bhat',
    role: 'Tech Lead, Google India',
    gender: 'male',
    avatarColor: 'bg-slate-700',
    initials: 'VB',
    online: false,
  },
  // Mentees for mentor to chat with
  'me1': {
    id: 'me1',
    name: 'Aditya Kulkarni',
    role: 'Junior Engineer, TechStartup Labs',
    gender: 'male',
    avatarColor: 'bg-cyan-500',
    initials: 'AK',
    online: true,
  },
  'me2': {
    id: 'me2',
    name: 'Nisha Agarwal',
    role: 'Product Analyst, Deloitte',
    gender: 'female',
    avatarColor: 'bg-rose-500',
    initials: 'NA',
    online: true,
  },
  'me3': {
    id: 'me3',
    name: 'Rahul Nair',
    role: 'UX Designer, DesignCraft',
    gender: 'male',
    avatarColor: 'bg-amber-500',
    initials: 'RN',
    online: false,
  },
  'me4': {
    id: 'me4',
    name: 'Shruti Joshi',
    role: 'Data Analyst, Apollo Health',
    gender: 'female',
    avatarColor: 'bg-emerald-500',
    initials: 'SJ',
    online: true,
  },
};

const EXTRA_CHAT_HISTORY = {
  'm4': [
    {
      id: 'm4-1',
      senderId: 'm4',
      senderName: 'Karthik Raman',
      senderInitials: 'KR',
      avatarColor: 'bg-orange-500',
      text: 'Hey Aditya! Checked out your React repo. You might want to optimize your context re-renders with selectors.',
      timestamp: '2026-09-14T11:00:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm4-2',
      senderId: 'current-user',
      senderName: 'You',
      senderInitials: 'AK',
      avatarColor: 'bg-cyan-500',
      text: 'Thanks Karthik! Would love to see an example of how you handle that at Zerodha.',
      timestamp: '2026-09-14T11:20:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm4-3',
      senderId: 'm4',
      senderName: 'Karthik Raman',
      senderInitials: 'KR',
      avatarColor: 'bg-orange-500',
      text: 'Sure, I will share our open-source state utilities in our next catchup!',
      timestamp: '2026-09-14T11:35:00Z',
      isCurrentUser: false,
    },
  ],
  'me2': [
    {
      id: 'me2-1',
      senderId: 'me2',
      senderName: 'Nisha Agarwal',
      senderInitials: 'NA',
      avatarColor: 'bg-rose-500',
      text: 'Hi Sneha! Here is my draft product requirement document for review.',
      timestamp: '2026-09-14T08:30:00Z',
      isCurrentUser: false,
    },
    {
      id: 'me2-2',
      senderId: 'current-user',
      senderName: 'You',
      senderInitials: 'SI',
      avatarColor: 'bg-teal-500',
      text: 'Looks well-structured Nisha. Add metrics around retention for section 3.',
      timestamp: '2026-09-14T09:10:00Z',
      isCurrentUser: true,
    },
  ],
  'me3': [
    {
      id: 'me3-1',
      senderId: 'me3',
      senderName: 'Rahul Nair',
      senderInitials: 'RN',
      avatarColor: 'bg-amber-500',
      text: 'Hey Sneha! Submitted the design system Figma link for Thursday.',
      timestamp: '2026-09-13T16:00:00Z',
      isCurrentUser: false,
    },
  ],
};

const ChatWindow = ({ compact = false, role }) => {
  const { state, dispatch } = useApp();
  const [inputText, setInputText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef(null);

  const isMentor = role === 'mentor' || state.user?.role === 'mentor';

  // Contact list based on user role
  const contactIds = isMentor
    ? ['me1', 'me2', 'me3', 'me4']
    : ['m1', 'm4', 'm7'];

  const [activeContactId, setActiveContactId] = useState(contactIds[0]);
  const [threads, setThreads] = useState(EXTRA_CHAT_HISTORY);

  const activeContact = INITIAL_CONVERSATIONS[activeContactId] || INITIAL_CONVERSATIONS[contactIds[0]];

  // Messages for active contact
  const currentMessages = activeContactId === 'm1' || activeContactId === 'me1'
    ? state.messages
    : threads[activeContactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: state.user?.name || 'You',
      senderInitials: state.user?.initials || 'U',
      avatarColor: state.user?.avatarColor || 'bg-gray-400',
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };

    if (activeContactId === 'm1' || activeContactId === 'me1') {
      dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    } else {
      setThreads((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), newMessage],
      }));
    }

    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Contact List Sidebar (Hidden only if compact prop is true on mobile) */}
      <div className={`w-72 border-r border-gray-200 bg-gray-50 flex flex-col ${compact ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200 bg-white">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {isMentor ? 'Your Mentees' : 'Your Mentors'}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Active messaging channels</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {contactIds.map((cId) => {
            const contact = INITIAL_CONVERSATIONS[cId];
            if (!contact) return null;
            const isSelected = activeContactId === cId;
            const isFemale = contact.gender === 'female';

            return (
              <button
                key={cId}
                onClick={() => setActiveContactId(cId)}
                className={`w-full p-3 flex items-start gap-3 text-left transition-all ${
                  isSelected
                    ? 'bg-white border-l-4 border-l-primary-600 shadow-xs'
                    : 'hover:bg-gray-100/70'
                }`}
              >
                {/* Gender Indicator Badge on Avatar */}
                <div className="relative shrink-0">
                  <Avatar initials={contact.initials} color={contact.avatarColor} size="md" />
                  <span
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs border border-white ${
                      isFemale ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                    }`}
                    title={isFemale ? 'Female contact' : 'Male contact'}
                  >
                    <User className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-primary-700' : 'text-gray-900'}`}>
                      {contact.name}
                    </p>
                    {contact.online && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{contact.role}</p>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isFemale ? 'bg-pink-400' : 'bg-blue-400'}`}></span>
                    {isFemale ? 'Female' : 'Male'} · {contact.online ? 'Online' : 'Away'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar initials={activeContact.initials} color={activeContact.avatarColor} />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shadow-xs border border-white ${
                  activeContact.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                }`}
                title={activeContact.gender === 'female' ? 'Female' : 'Male'}
              >
                <User className="w-2.5 h-2.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-gray-900 text-sm">{activeContact.name}</h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  activeContact.gender === 'female' ? 'bg-pink-50 text-pink-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {activeContact.gender === 'female' ? 'Female' : 'Male'}
                </span>
              </div>
              <p className="text-xs text-gray-500">{activeContact.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Channel</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/60">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start gap-2.5'}`}
            >
              {!msg.isCurrentUser && (
                <Avatar initials={msg.senderInitials} color={msg.avatarColor} size="sm" className="shrink-0 mt-1" />
              )}
              <div className={`max-w-[78%] flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 text-sm ${
                    msg.isCurrentUser
                      ? 'bg-primary-600 text-white rounded-2xl rounded-br-xs shadow-xs'
                      : 'bg-white text-gray-900 rounded-2xl rounded-bl-xs border border-gray-200/80 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 px-1">
                  <span>{format(new Date(msg.timestamp), 'h:mm a')}</span>
                  {msg.isCurrentUser && <CheckCheck className="w-3 h-3 text-primary-500" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Quick Action Templates */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTemplates(!showTemplates)}
                className="border border-gray-200 rounded-xl p-2.5 hover:bg-gray-100 text-gray-600 transition-colors shadow-xs"
                title="Insert Quick Template"
              >
                <FileText size={18} />
              </button>
              <TemplateMenu
                isOpen={showTemplates}
                onClose={() => setShowTemplates(false)}
                onSelect={(text) => {
                  setInputText(text);
                }}
              />
            </div>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${activeContact.name.split(' ')[0]}...`}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-primary-600 text-white p-2.5 rounded-xl hover:bg-primary-700 disabled:opacity-40 transition-all shadow-xs shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
