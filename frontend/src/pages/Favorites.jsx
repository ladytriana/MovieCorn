import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Star, Calendar, Heart, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Lock, Info } from 'lucide-react';
// Import AuthContext dan Supabase Client
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient'; 

// URL Gambar TMDB (w500 cukup untuk kartu)
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
  const itemsPerPage = 9; // 9 film per halaman
  
  // --- LOAD DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchFavorites = async () => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

        if (error) {
            console.error("Error fetching favs:", error.message);
        } else {
            setFavorites(data || []);
        }
        setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  // Scroll ke atas saat ganti halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // --- HAPUS DATA ---
  const removeFavorite = async (movieId) => {
    if (!user) return;
    
    // Optimistic UI: Hapus dari tampilan dulu
    const previousFavorites = [...favorites];
    setFavorites(favorites.filter(m => m.movie_id !== movieId));

    try {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('movie_id', movieId);
        
        if (error) throw error;

        // Penyesuaian halaman setelah penghapusan
        const newLength = favorites.length - 1;
        const totalPages = Math.ceil(newLength / itemsPerPage);
        if (page > totalPages && page > 1) {
            setPage(page - 1);
        }

    } catch (err) {
        console.error("Gagal hapus:", err.message);
        setFavorites(previousFavorites); // Kembalikan data jika gagal
    }
  };

  // --- LOGIKA PAGINATION ---
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedFavorites = favorites.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // --- RENDER JIKA BELUM LOGIN (PROTEKSI) ---
  if (!user) {
      return (
        <div className="relative bg-gray-900 min-h-screen text-white overflow-hidden">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <div className="max-w-md w-full text-center animate-slide-up">
              {/* Lock Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full"></div>
                <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center border border-gray-700/50">
                  <Lock size={56} className="text-gray-600" strokeWidth={1.5} />
                </div>
              </div>

              <h2 className="text-3xl font-black tracking-tight mb-3 bg-gradient-to-br from-red-400 via-red-500 to-orange-500 text-transparent bg-clip-text">
                Akses Terbatas
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Silakan login untuk melihat dan menyimpan film favoritmu di koleksi pribadi.
              </p>
              
              <Link 
                to="/login" 
                className="group relative inline-flex px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={20} />
                  Login / Daftar
                </span>
              </Link>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="relative bg-gray-900 min-h-screen text-white overflow-hidden">
      
      {/* Advanced Gradient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content Container */}
      {/* PERBAIKAN UTAMA: Tambahkan pb-24 (padding-bottom besar) untuk memberi ruang pada nav button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24"> 
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-12 mt-8">
          <div className="flex justify-center items-center gap-4 mb-4 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl shadow-red-500/30">
                <Heart size={32} className="text-white" fill="currentColor" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 bg-gradient-to-br from-red-400 via-red-500 to-orange-500 text-transparent bg-clip-text animate-gradient">
            Film Favorit Saya
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide max-w-2xl mx-auto animate-fade-in-delayed">
            Koleksi film pilihan yang telah kamu simpan untuk ditonton kapan saja
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-gray-800/50 backdrop-blur-sm mb-4 flex items-center justify-center border border-gray-700/50">
              <Heart size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-500 font-medium">Memuat koleksi film...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-slide-up">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full"></div>
              <div className="relative w-32 h-32 rounded-3xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center border border-gray-700/50">
                <Heart size={56} className="text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-300 mb-3">Belum Ada Film Favorit</h3>
            <p className="text-gray-500 mb-8 max-w-md text-center">
              Mulai tambahkan film kesukaanmu dengan klik icon hati pada film yang kamu suka
            </p>
            
            <Link 
              to="/" 
              className="group relative px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={20} />
                Jelajahi Film
              </span>
            </Link>
          </div>
        ) : (
          <>
            {/* --- SECTION HEADER --- */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30">
                  <Heart className="text-red-500" fill="currentColor" size={26} />
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    Koleksi Saya
                    <Sparkles size={20} className="text-yellow-500" />
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {favorites.length} film tersimpan
                    {totalPages > 1 && ` • Halaman ${page} dari ${totalPages}`}
                  </p>
                </div>
              </div>

              {/* Results Count */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-300">{displayedFavorites.length} ditampilkan</span>
              </div>
            </div>

            {/* Grid Film */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedFavorites.map((movie, index) => (
                <div key={movie.movie_id} className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-20">
                   <div className="relative flex bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
                      <Link to={`/movie/${movie.movie_id}`} className="relative w-1/3 min-w-[120px]">
                        <img 
                            src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300'} 
                            alt={movie.title}
                            className="w-full h-full object-cover" 
                        />
                      </Link>
                      <div className="relative flex-1 p-5 flex flex-col justify-between">
                        <div>
                           <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{movie.title}</h3>
                           <div className="flex items-center gap-4 text-sm mb-4">
                              <span className="text-yellow-500 font-bold flex items-center gap-1"><Star size={14} fill="currentColor"/> {movie.vote_average?.toFixed(1)}</span>
                              <span className="text-gray-400 flex items-center gap-1"><Calendar size={14}/> {movie.release_date?.split('-')[0]}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <button 
                                onClick={() => removeFavorite(movie.movie_id)} 
                                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                title="Hapus"
                            >
                                <Trash2 size={18}/>
                            </button>
                            <Link to={`/movie/${movie.movie_id}`} className="flex-1 py-2.5 rounded-xl bg-gray-700/50 text-center text-sm font-semibold hover:bg-yellow-500 hover:text-black transition-all">Lihat Detail</Link>
                        </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
            
            {/* --- RESPONSIVE PAGINATION (SAMA DENGAN HOME & TOP RATED) --- */}
            {favorites.length > itemsPerPage && (
              <>
                {/* MOBILE VERSION */}
                <div className="sm:hidden flex justify-center items-center gap-2 mt-8 mb-20 pb-4">
                  <button 
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`
                      p-3 rounded-xl font-bold transition-all duration-200
                      ${page === 1 
                        ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg active:scale-95'
                      }
                    `}
                  >
                    <ChevronLeft size={20} strokeWidth={3} />
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/70 backdrop-blur-sm border border-gray-700/50">
                    <span className="text-xs font-semibold text-gray-400">PAGE</span>
                    <div className="flex items-center justify-center min-w-[2rem] h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                      <span className="text-lg font-black text-black">{page}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-bold transition-all duration-200 shadow-lg active:scale-95"
                  >
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>

                {/* DESKTOP VERSION */}
                <div className="hidden sm:flex justify-center items-center gap-4 mt-20 mb-10">
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
                    disabled={page === totalPages}
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
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        /* Animasi tambahan */
        @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.1); } }
        @keyframes float-delayed { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 30px) scale(1.05); } }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-delayed { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.3s both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.2s both; }
      `}</style>
    </div>
  );
}

export default Favorites;