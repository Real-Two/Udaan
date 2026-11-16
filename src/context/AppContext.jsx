import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  currentUser,
  currentMentor,
  mentors,
  mentees,
  matches,
  kanbanGoals,
  chatMessages,
  upcomingMeetings,
} from '../data/mockData';

const AppContext = createContext(null);

const DEFAULT_PROFILES = [
  {
    id: 'demo-mentee-1',
    name: 'Aditya Kulkarni',
    email: 'aditya@udaan.com',
    role: 'mentee',
    gender: 'male',
    initials: 'AK',
    title: 'Junior Software Engineer',
    company: 'TechStartup Labs',
    targetRole: 'Senior Software Engineer',
    skills: ['JavaScript', 'React', 'Python'],
    avatarColor: 'bg-cyan-500',
  },
  {
    id: 'demo-mentee-2',
    name: 'Nisha Agarwal',
    email: 'nisha@udaan.com',
    role: 'mentee',
    gender: 'female',
    initials: 'NA',
    title: 'Product Analyst',
    company: 'Deloitte India',
    targetRole: 'Product Manager',
    skills: ['Product Strategy', 'Data Analysis', 'UX Research'],
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'demo-mentor-1',
    name: 'Sneha Iyer',
    email: 'sneha@udaan.com',
    role: 'mentor',
    gender: 'female',
    initials: 'SI',
    title: 'VP of Engineering',
    company: 'Razorpay',
    industry: 'FinTech',
    yearsExp: 12,
    skills: ['System Design', 'Leadership', 'Scaling', 'Cloud Architecture'],
    style: 'Direct Coaching',
    avatarColor: 'bg-teal-500',
  },
];

const loadInitialProfiles = () => {
  try {
    const saved = localStorage.getItem('udaan_profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading stored profiles', e);
  }
  return DEFAULT_PROFILES;
};

const initialState = {
  profiles: loadInitialProfiles(),
  user: currentUser,
  mentor: currentMentor,
  isLoggedIn: false,
  matches,
  goals: kanbanGoals,
  messages: chatMessages,
  meetings: upcomingMeetings,
  registrationData: null,
  selectedGoal: null,
  authError: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      const updatedUser = { ...state.user, ...action.payload };
      return {
        ...state,
        isLoggedIn: true,
        user: updatedUser,
        authError: null,
      };
    }

    case 'DEMO_LOGIN': {
      const { email } = action.payload;
      const normalizedEmail = (email || '').trim().toLowerCase();
      const found = state.profiles.find(
        (p) => p.email.toLowerCase() === normalizedEmail
      );
      if (!found) {
        return {
          ...state,
          authError: `No account found with "${email}". Try aditya@udaan.com or sneha@udaan.com`,
        };
      }
      return {
        ...state,
        isLoggedIn: true,
        user: found,
        authError: null,
      };
    }

    case 'REGISTER': {
      const { name, email, role, targetRole, industry, yearsExp, skills } = action.payload;
      const nameParts = (name || 'User').trim().split(' ');
      const initials =
        nameParts.length > 1
          ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
          : name.slice(0, 2).toUpperCase();

      const newProfile = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role || 'mentee',
        initials,
        title: role === 'mentor' ? `${industry || 'Tech'} Leader` : 'Aspiring Professional',
        company: role === 'mentor' ? 'Industry Veteran' : 'Independent',
        targetRole: targetRole || '',
        industry: industry || '',
        yearsExp: yearsExp || '',
        skills: skills || [],
        avatarColor: role === 'mentor' ? 'bg-teal-500' : 'bg-cyan-500',
      };

      const updatedProfiles = [...state.profiles.filter(p => p.email !== newProfile.email), newProfile];
      try {
        localStorage.setItem('udaan_profiles', JSON.stringify(updatedProfiles));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }

      return {
        ...state,
        profiles: updatedProfiles,
        isLoggedIn: true,
        user: newProfile,
        authError: null,
      };
    }

    case 'CLEAR_AUTH_ERROR':
      return { ...state, authError: null };

    case 'LOGOUT':
      return { ...state, isLoggedIn: false };

    case 'SET_ROLE':
      return { ...state, user: { ...state.user, role: action.payload } };

    case 'UPDATE_REGISTRATION':
      return { ...state, registrationData: { ...state.registrationData, ...action.payload } };

    case 'TOGGLE_GOAL_DETAIL':
      return { ...state, selectedGoal: action.payload };

    case 'MOVE_GOAL': {
      const { sourceCol, destCol, sourceIndex, destIndex } = action.payload;
      const newGoals = { ...state.goals };
      const sourceItems = [...newGoals[sourceCol]];
      const [moved] = sourceItems.splice(sourceIndex, 1);
      const destItems = sourceCol === destCol ? sourceItems : [...newGoals[destCol]];
      destItems.splice(destIndex, 0, moved);
      newGoals[sourceCol] = sourceItems;
      if (sourceCol !== destCol) newGoals[destCol] = destItems;
      return { ...state, goals: newGoals };
    }

    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem('udaan_profiles', JSON.stringify(state.profiles));
    } catch (e) {
      console.error(e);
    }
  }, [state.profiles]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
