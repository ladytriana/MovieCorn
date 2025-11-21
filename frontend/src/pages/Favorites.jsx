import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Star, Calendar, Heart, ArrowLeft, ArrowRight, Sparkles, Lock } from 'lucide-react';
// Import AuthContext dan Supabase Client
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient'; 

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
  const itemsPerPage = 9; 
  
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

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
            .order('created_at', { ascending: false });

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
    
    const previousFavorites = [...favorites];
    setFavorites(favorites.filter(m => m.movie_id !== movieId));

    try {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('movie_id', movieId);
        
        if (error) throw error;

        const newLength = favorites.length - 1;
        const totalPages = Math.ceil(newLength / itemsPerPage);
        if (page > totalPages && page > 1) {
            setPage(page - 1);
        }

    } catch (err) {
        console.error("Gagal hapus:", err.message);
        setFavorites(previousFavorites);
    }
  };

  // --- LOGIKA PAGINATION ---
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedFavorites = favorites.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // Jika belum login
  if (!user) {
      return (
        <div className="bg-gray-900 min-h-screen text-white p-4 flex flex-col items-center justify-center h-[80vh]">
            <Lock size={64} className="text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Akses Terbatas</h2>
            <p className="text-gray-400 mb-6 text-center">Silakan login untuk melihat dan menyimpan film favoritmu.</p>
            <Link to="/login" className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
                Login / Daftar
            </Link>
        </div>
      );
  }

  return (
    <div className="relative bg-gray-900 min-h-screen text-white overflow-hidden">
      {/* Background Animasi */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 bg-gradient-to-br from-red-400 via-red-500 to-orange-500 text-transparent bg-clip-text animate-gradient">
            Film Favorit Saya
          </h1>
        </div>

        {loading ? (
          <div className="text-center mt-20 text-gray-500 animate-pulse">Memuat koleksi film...</div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] animate-slide-up">
             <Heart size={56} className="text-gray-600 mb-4" />
             <h3 className="text-2xl font-bold text-gray-300 mb-3">Belum Ada Film Favorit</h3>
             <Link to="/" className="mt-4 px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold">Jelajahi Film</Link>
          </div>
        ) : (
          <>
            {/* Grid Film */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedFavorites.map((movie, index) => (
                <div key={movie.id || movie.movie_id} className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:z-20">
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
            
            {/* Pagination */}
            {favorites.length > itemsPerPage && (
               <div className="flex justify-center items-center gap-4 mt-10">
                  <button onClick={handlePrev} disabled={page===1} className="px-6 py-2 bg-gray-800 rounded-full disabled:opacity-50"><ArrowLeft size={18}/> Prev</button>
                  <span>{page} / {totalPages}</span>
                  <button onClick={handleNext} disabled={page===totalPages} className="px-6 py-2 bg-gray-800 rounded-full disabled:opacity-50">Next <ArrowRight size={18}/></button>
               </div>
            )}
          </>
        )}
      </div>

      {/* PERBAIKAN: HAPUS 'jsx' DARI TAG STYLE */}
      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
}

export default Favorites;