import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import Provider Auth

// Import Komponen Navigasi
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';

// Import Halaman-halaman
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Favorites from './pages/Favorites'; 
import About from './pages/About'; 
import MovieDetail from './pages/MovieDetail'; 
import TopRated from './pages/TopRated'; 
import Login from './pages/Login'; // Import Halaman Login

function App() {
  return (
    // PENTING: Bungkus seluruh aplikasi dengan AuthProvider
    <AuthProvider>
        <div className="App min-h-screen bg-gray-900 text-white"> 
          
          {/* 1. Navbar Atas (Desktop) */}
          <Navbar />
          
          {/* 2. Konten Halaman */}
          <div className="md:pt-20"> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/favorites" element={<Favorites />} /> 
                <Route path="/profile" element={<Profile />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/about" element={<About />} />
                {/* Route Baru untuk Login */}
                <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          
          {/* 3. Navbar Bawah (Mobile) */}
          <BottomNav />
          
        </div>
    </AuthProvider>
  );
}

export default App;