import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { GamificationProvider } from './context/GamificationContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import WorkoutLogger from './components/WorkoutLogger';
import DietTracker from './components/DietTracker';
import AICoach from './components/AICoach';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import VoiceAssistant from './components/VoiceAssistant';
import LevelUpModal from './components/ui/LevelUpModal';
import { GamificationContext } from './context/GamificationContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { levelUp, setLevelUp } = useContext(GamificationContext);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <Navbar />
      {levelUp && <LevelUpModal level={levelUp} onClose={() => setLevelUp(null)} />}
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/workouts" element={<PrivateRoute><WorkoutLogger /></PrivateRoute>} />
          <Route path="/diet" element={<PrivateRoute><DietTracker /></PrivateRoute>} />
          <Route path="/coach" element={<PrivateRoute><AICoach /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <GamificationProvider>
            <AppContent />
            <VoiceAssistant />
          </GamificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
