import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Heart, User, Info, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

function BottomNav() {
  const location = useLocation();
  const { user } = useAuth(); // Cek status login
  const isActive = (path) => location.pathname === path;

  const navItemClass = "flex flex-col items-center justify-center w-full h-full transition-colors duration-200 hover:bg-gray-800/50 py-1";
  const activeClass = "text-yellow-400";
  const inactiveClass = "text-gray-400 hover:text-gray-200";

  // Tentukan item navigasi yang selalu ada
  const navItems = [
    { to: '/', label: 'Beranda', Icon: Home, size: user ? 20 : 22 },
    { to: '/top-rated', label: 'Top', Icon: Trophy, size: user ? 20 : 22 },
  ];

  if (user) {
    // Mode Member (Total 5 menu)
    navItems.push(
      { to: '/favorites', label: 'Favorit', Icon: Heart, size: 20, fill: true },
      { to: '/profile', label: 'Profil', Icon: User, size: 20 },
    );
  } else {
    // Mode Tamu (Total 4 menu: Login menggantikan Favorit/Profil)
    navItems.push(
        { to: '/login', label: 'Login', Icon: LogIn, size: 22 }
    );
  }

  // Tambahkan About (Selalu ada di akhir)
  navItems.push({ to: '/about', label: 'About', Icon: Info, size: user ? 20 : 22 });

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 h-16 z-50 shadow-lg">
      
      {/* PERBAIKAN: Gunakan Flexbox dengan w-full untuk container */}
      <div className="flex w-full h-full max-w-lg mx-auto justify-between items-center">
        
        {navItems.map((item) => (
            <Link 
                key={item.to}
                to={item.to} 
                // PERBAIKAN: Tambahkan 'flex-1' agar setiap tombol punya lebar yang sama rata
                className={`flex-1 ${navItemClass} ${isActive(item.to) ? activeClass : inactiveClass}`} 
            >
                <item.Icon 
                    size={item.size} 
                    // Logika fill untuk ikon Heart
                    fill={(item.fill && isActive(item.to)) ? "currentColor" : "none"}
                    className="mb-1" 
                />
                <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
        ))}

      </div>
    </div>
  );
}

export default BottomNav;