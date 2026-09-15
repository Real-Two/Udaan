import { createContext, useContext, useReducer } from 'react';
import {
  currentUser,
  currentMentor,
  matches,
  kanbanGoals,
  chatMessages,
  upcomingMeetings,
} from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  user: currentUser,
  mentor: currentMentor,
  isLoggedIn: false,
  matches,
  goals: kanbanGoals,
  messages: chatMessages,
  meetings: upcomingMeetings,
  registrationData: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, user: { ...state.user, ...action.payload } };
    case 'SET_ROLE':
      return { ...state, user: { ...state.user, role: action.payload } };
    case 'UPDATE_REGISTRATION':
      return { ...state, registrationData: { ...state.registrationData, ...action.payload } };
    case 'MOVE_GOAL': {
      const { goalId, sourceCol, destCol, sourceIndex, destIndex } = action.payload;
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
