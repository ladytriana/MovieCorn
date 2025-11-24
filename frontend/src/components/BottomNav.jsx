import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Heart, User, Info, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  // Tentukan item navigasi
  const navItems = [
    { to: '/', label: 'Beranda', Icon: Home },
    { to: '/top-rated', label: 'Top', Icon: Trophy },
  ];

  if (user) {
    // Mode Member (5 menu)
    navItems.push(
      { to: '/favorites', label: 'Favorit', Icon: Heart, fill: true },
      { to: '/profile', label: 'Profil', Icon: User }
    );
  } else {
    // Mode Tamu (4 menu)
    navItems.push(
      { to: '/login', label: 'Login', Icon: LogIn }
    );
  }

  // About selalu ada
  navItems.push({ to: '/about', label: 'About', Icon: Info });

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 shadow-lg safe-area-bottom">
      <div className="flex h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.to);
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1
                transition-all duration-200 active:scale-95
                ${active 
                  ? 'text-yellow-400' 
                  : 'text-gray-400 hover:text-gray-200 active:text-gray-100'
                }
              `}
            >
              <item.Icon
                size={22}
                strokeWidth={active ? 2.5 : 2}
                fill={item.fill && active ? 'currentColor' : 'none'}
                className="transition-transform duration-200"
              />
              <span 
                className={`
                  text-[11px] font-medium transition-all duration-200
                  ${active ? 'scale-105' : 'scale-100'}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;