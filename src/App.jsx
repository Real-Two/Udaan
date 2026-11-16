import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MenteeFlow from './pages/MenteeFlow';
import MentorFlow from './pages/MentorFlow';
import DashboardLayout from './components/layout/DashboardLayout';

// Mentee pages
import MenteeDashboard from './pages/mentee/MenteeDashboard';
import MenteeMatches from './pages/mentee/MenteeMatches';
import MenteeGoals from './pages/mentee/MenteeGoals';
import MenteeMessages from './pages/mentee/MenteeMessages';
import MenteeSchedule from './pages/mentee/MenteeSchedule';
import MenteeProfile from './pages/mentee/MenteeProfile';

// Mentor pages
import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorMentees from './pages/mentor/MentorMentees';
import MentorGoals from './pages/mentor/MentorGoals';
import MentorMessages from './pages/mentor/MentorMessages';
import MentorSchedule from './pages/mentor/MentorSchedule';
import MentorProfile from './pages/mentor/MentorProfile';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/mentee" element={<AuthPage role="mentee" />} />
      <Route path="/auth/mentor" element={<AuthPage role="mentor" />} />
      <Route path="/register/mentee" element={<MenteeFlow />} />
      <Route path="/register/mentor" element={<MentorFlow />} />

      {/* Mentee dashboard — nested routes under persistent layout */}
      <Route path="/mentee" element={<DashboardLayout />}>
        <Route index element={<MenteeDashboard />} />
        <Route path="matches" element={<MenteeMatches />} />
        <Route path="goals" element={<MenteeGoals />} />
        <Route path="messages" element={<MenteeMessages />} />
        <Route path="schedule" element={<MenteeSchedule />} />
        <Route path="profile" element={<MenteeProfile />} />
      </Route>

      {/* Mentor dashboard — nested routes under persistent layout */}
      <Route path="/mentor" element={<DashboardLayout />}>
        <Route index element={<MentorDashboard />} />
        <Route path="mentees" element={<MentorMentees />} />
        <Route path="goals" element={<MentorGoals />} />
        <Route path="messages" element={<MentorMessages />} />
        <Route path="schedule" element={<MentorSchedule />} />
        <Route path="profile" element={<MentorProfile />} />
      </Route>

      {/* Legacy /dashboard route redirects to mentee dashboard */}
      <Route path="/dashboard/*" element={<Navigate to="/mentee" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
