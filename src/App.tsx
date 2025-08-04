import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapView from './pages/MapView';
import ProjectDetail from './pages/ProjectDetail';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import LandingScreen from './components/LandingScreen';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-primary-50">
          <AnimatePresence>
            {showLanding && (
              <LandingScreen onEnter={handleEnterApp} />
            )}
          </AnimatePresence>
          
          {!showLanding && (
            <>
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </>
          )}
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App; 