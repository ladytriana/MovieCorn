import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Heart, User, Info, LogIn } from 'lucide-react';
// Import AuthContext untuk mengecek status login user
import { useAuth } from '../context/AuthContext'; 

function Navbar() {
  const location = useLocation();
  const { user } = useAuth(); // Ambil data user (null jika guest, object jika login)
  const isActive = (path) => location.pathname === path;

  // Style untuk link navigasi
  const linkClass = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium
    ${isActive(path) 
      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105' 
      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'}
  `;

  return (
    <nav className="hidden md:flex fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-800 z-50 py-4 px-8 justify-between items-center">
      
      {/* BAGIAN KIRI: LOGO */}
      <Link to="/" className="flex items-center gap-3 group">
        <img 
            src="/logo.png" 
            alt="MovieCorn" 
            className="w-10 h-10 object-contain drop-shadow-lg transition-transform duration-300 group-hover:rotate-12"
            onError={(e) => e.target.style.display = 'none'} 
        />
        <h1 className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            MovieCorn
        </h1>
      </Link>

      {/* BAGIAN KANAN: MENU NAVIGASI */}
      <div className="flex items-center gap-2">
        {/* Menu Umum (Semua bisa akses) */}
        <Link to="/" className={linkClass('/')}>
          <Home size={18} />
          Beranda
        </Link>
        
        <Link to="/top-rated" className={linkClass('/top-rated')}>
          <Trophy size={18} />
          Top Rated
        </Link>
        
        {/* Menu Khusus Member (Hanya muncul jika sudah Login) */}
        {user && (
            <>
                <Link to="/favorites" className={linkClass('/favorites')}>
                  <Heart size={18} fill={isActive('/favorites') ? "currentColor" : "none"} />
                  Favorit
                </Link>
                
                <Link to="/profile" className={linkClass('/profile')}>
                  <User size={18} />
                  Profil
                </Link>
            </>
        )}
        
        {/* About (Semua bisa akses) */}
        <Link to="/about" className={linkClass('/about')}>
          <Info size={18} />
          About
        </Link>

        {/* TOMBOL LOGIN (Hanya muncul jika BELUM Login) */}
        {!user && (
            <Link 
                to="/login" 
                className="ml-4 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform hover:shadow-yellow-500/40"
            >
                <LogIn size={18} />
                Login / Daftar
            </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;