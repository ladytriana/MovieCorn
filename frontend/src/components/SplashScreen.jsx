import React from 'react';

function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black flex flex-col items-center justify-center z-50 overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Rotating Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-64 h-64 border border-yellow-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-72 h-72 border border-orange-500/10 rounded-full animate-spin-reverse"></div>
        <div className="absolute w-80 h-80 border border-yellow-400/5 rounded-full animate-spin-slower"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Container with Advanced Animation */}
        <div className="relative mb-8 animate-scale-in">
          {/* Outer Glow Ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 rounded-full blur-2xl animate-pulse-glow"></div>
          
          {/* Spinning Border */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 animate-spin-border" style={{maskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)'}}></div>
            
            {/* Inner Container */}
            <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-700/50 overflow-hidden">
              <div className="w-20 h-20 p-3 animate-float-gentle">
                <img 
                  src="/logo.png" 
                  alt="MovieCorn" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Text with Stagger Animation */}
        <div className="text-center space-y-3 animate-fade-in-up">
          <h1 className="text-5xl font-black tracking-wider relative">
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-transparent bg-clip-text animate-gradient-x">
              MOVIECORN
            </span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient-x">
              MOVIECORN
            </span>
          </h1>
          
          <p className="text-gray-400 text-sm font-bold tracking-[0.3em] uppercase animate-fade-in-delayed">
            Your Ultimate Movie Companion
          </p>
        </div>

        {/* Animated Loading Dots */}
        <div className="flex items-center gap-2 mt-12 animate-fade-in-delayed-2">
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-bounce-dot"></div>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce-dot" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-bounce-dot" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>

      {/* Bottom Wave Loading Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-1/3 animate-wave-loading"></div>
      </div>

      <style>{`
        /* Float Animations */
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }

        /* Spin Animations */
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Scale and Fade Animations */
        @keyframes scale-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fade-in-delayed {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fade-in-delayed-2 {
          0% { opacity: 0; transform: translateY(10px); }
          60% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Pulse Animations */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        /* Gradient Animation */
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Bounce Dots */
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.3); opacity: 1; }
        }

        /* Wave Loading */
        @keyframes wave-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        /* Apply Animations */
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 25s linear infinite;
        }

        .animate-spin-border {
          animation: spin-border 2s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 2s ease-out both;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in-delayed-2 2s ease-out both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.4s ease-in-out infinite;
        }

        .animate-wave-loading {
          animation: wave-loading 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;