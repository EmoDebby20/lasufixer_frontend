import React, { useState } from 'react';

import './styles/general.css';
import './styles/images.css';
import './styles/buttons.css';
import './styles/login.css';
import './styles/dashboard.css';
import './styles/header.css';
import './styles/report.css';
import './styles/track.css';
import './styles/admin-dash.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ReportPage from './pages/ReportPage';
import TrackPage from './pages/TrackPage';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogout = () => {
  setCurrentUser(null); // Clear name
  setIsLoggedIn(false); // Close session
  goTo('landing');      // Go home
  };

  // Navigation Helper

  const goTo = (page) => {
    console.log("Navigating to:", page); // Add this log to debug!
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'landing' &&  <LandingPage goTo={goTo} />}
      {currentPage === 'login' && (
      <LoginPage 
      goTo={goTo} 
      setIsLoggedIn={setIsLoggedIn} 
      setCurrentUser={setCurrentUser} 
      />
      )}
      {currentPage === 'dashboard' && ( <Dashboard goTo={goTo} 
      user={currentUser} 
      handleLogout={handleLogout} />)}
      {currentPage === 'report' && <ReportPage goTo={goTo} user={currentUser} />}
      {currentPage === 'track' && <TrackPage goTo={goTo} user={currentUser} />}
      {currentPage === 'admin' && <AdminDashboard goTo={goTo} />}
    </div>
  );
}


export default App;