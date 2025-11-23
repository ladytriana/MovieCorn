import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

// Import Komponen
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';

// Import Halaman
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Favorites from './pages/Favorites'; 
import About from './pages/About'; 
import MovieDetail from './pages/MovieDetail'; 
import TopRated from './pages/TopRated'; 
import Login from './pages/Login'; 

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
        <div className="App min-h-screen bg-gray-900 text-white animate-fade-in"> 
          
          <Navbar />
          
          <div className="md:pt-20"> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/favorites" element={<Favorites />} /> 
                <Route path="/profile" element={<Profile />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          
          <BottomNav />
          
          {/* PERBAIKAN: Pastikan tidak ada kata 'jsx' di sini */}
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.8s ease-out;
            }
          `}</style>
        </div>
    </AuthProvider>
  );
}

export default App;