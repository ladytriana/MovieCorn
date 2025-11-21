import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Heart, User, Info, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

function BottomNav() {
  const location = useLocation();
  const { user } = useAuth(); // Cek status login
  const isActive = (path) => location.pathname === path;

  const navItemClass = "flex flex-col items-center justify-center w-full h-full transition-colors duration-200 hover:bg-gray-800/50";
  const activeClass = "text-yellow-400";
  const inactiveClass = "text-gray-400 hover:text-gray-200";

  // Tentukan item navigasi yang selalu ada
  const navItems = [
    { to: '/', label: 'Beranda', Icon: Home, size: user ? 20 : 24, isAuthRequired: false },
    { to: '/top-rated', label: 'Top', Icon: Trophy, size: user ? 20 : 24, isAuthRequired: false },
  ];

  if (user) {
    // Mode Member (Total 5 menu)
    navItems.push(
      { to: '/favorites', label: 'Favorit', Icon: Heart, size: 20, isAuthRequired: true, fill: true },
      { to: '/profile', label: 'Profil', Icon: User, size: 20, isAuthRequired: true },
    );
  } else {
    // Mode Tamu (Total 4 menu: Login menggantikan Favorit/Profil)
    navItems.push(
        { to: '/login', label: 'Login', Icon: LogIn, size: 24, isAuthRequired: false, activeStyle: 'text-yellow-500' }
    );
  }

  // Tambahkan About (Selalu ada di akhir)
  navItems.push({ to: '/about', label: 'About', Icon: Info, size: user ? 20 : 24, isAuthRequired: false });


  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 h-16 z-50 shadow-lg">
      
      {/* Menggunakan grid-cols-4 jika tamu, atau grid-cols-5 jika member */}
      <div className={`grid grid-cols-${navItems.length} h-full max-w-lg mx-auto`}>
        
        {navItems.map((item) => (
            <Link 
                key={item.to}
                to={item.to} 
                className={`${navItemClass} 
                            ${item.activeStyle || (isActive(item.to) ? activeClass : inactiveClass)}
                            ${item.label === 'Login' ? 'text-yellow-500' : ''}`} 
            >
                <item.Icon 
                    size={item.size} 
                    // Logika fill untuk ikon Heart
                    fill={(item.fill && isActive(item.to)) ? "currentColor" : "none"}
                    stroke={item.fill ? "currentColor" : "currentColor"}
                    className={item.label === 'Login' ? 'text-yellow-500' : ''}
                />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
        ))}

      </div>
    </div>
  );
}

export default BottomNav;