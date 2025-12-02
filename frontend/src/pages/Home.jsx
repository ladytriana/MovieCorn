import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Flame, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react'; // Search dihilangkan dari import

// Fallback aman untuk API KEY
let API_KEY = '';
try {
  API_KEY = import.meta.env.VITE_TMDB_API_KEY;
} catch (e) {
  if (typeof process !== 'undefined' && process.env) {
    API_KEY = process.env.VITE_TMDB_API_KEY;
  }
}

const BASE_URL = 'https://api.themoviedb.org/3';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // State 'searchTerm' dihapus karena tidak ada pencarian

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      try {
        // LOGIKA: Langsung ambil Trending (tanpa if/else pencarian)
        const endpoint = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=id-ID&page=${page}`;

        const response = await axios.get(endpoint);
        const results = response.data?.results || [];

        // Ambil hanya 18 film pertama agar tampilan rapi (3 baris x 6 kolom)
        setMovies(results.slice(0, 18));

      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]); // Dependency hanya 'page'

  const handlePrev = () => setPage(p => (p > 1 ? p - 1 : p));
  const handleNext = () => setPage(p => p + 1);

  return (
    <div className="relative bg-gray-900 min-h-screen text-white overflow-hidden">
      
      {/* Advanced Gradient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        
        {/* --- HEADER (Hanya Logo untuk Mobile) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pt-2">
          
          {/* BAGIAN LOGO (RESPONSIVE: Hanya muncul di HP) */}
          <div className="flex md:hidden items-center gap-4 group cursor-default self-start">
              <img 
                  src="/logo.png" 
                  alt="MovieCorn Logo" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                  onError={(e) => e.target.style.display = 'none'} 
              />
              <h1 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
                  MovieCorn
              </h1>
          </div>
          
          {/* SEARCH BAR DIHAPUS */}

        </div>

        {/* --- JUDUL SECTION --- */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/50">
            <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-sm border border-orange-500/30">
                    <Flame className="text-orange-500 animate-pulse" fill="currentColor" size={26} />
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-2xl"></div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    Sedang Trending
                    <TrendingUp size={20} className="text-yellow-500" />
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">Film populer minggu ini</p>
                </div>
            </div>
        </div>

        {/* --- MOVIE GRID --- */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
             {[...Array(18)].map((_, i) => (
                <div key={i} className="group relative">
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 via-gray-800/40 to-gray-900/40 animate-pulse-slow"></div>
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                  <p>Film tidak ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {movies.map((movie, index) => (
                  <div 
                    key={movie.id} 
                    className="transform transition-all duration-500 hover:scale-105 hover:z-20"
                    style={{
                      animation: `fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s both`
                    }}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {movies.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-20 mb-10">
                <button 
                  onClick={handlePrev}
                  disabled={page === 1}
                  className={`group relative px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                    page === 1 
                      ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed border border-gray-700/30' 
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95'
                  }`}
                >
                  {page !== 1 && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    Previous
                  </span>
                </button>

                <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 shadow-xl">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Page</span>
                  <div className="flex items-center justify-center min-w-[2.5rem] h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/30">
                    <span className="text-xl font-black text-black">{page}</span>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Next
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Home;