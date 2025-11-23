import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate untuk redirect login
import { Star, Heart } from 'lucide-react';

// Import Logika Database Supabase
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

function MovieCard({ movie }) {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Ambil data user untuk cek login
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- 1. CEK STATUS FAVORIT DARI DATABASE (SUPABASE) ---
  useEffect(() => {
    const checkFavorite = async () => {
      // Jika user belum login, status pasti false
      if (!user) {
        setIsFavorite(false);
        return;
      }

      // Cek ke database apakah film ini ada di daftar favorit user
      const { data } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('movie_id', movie.id)
        .maybeSingle(); // Pakai maybeSingle() agar tidak error jika data kosong

      if (data) setIsFavorite(true);
    };

    checkFavorite();
  }, [user, movie.id]);

  // --- 2. FUNGSI KLIK TOMBOL (SUPABASE) ---
  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Mencegah pindah halaman
    e.stopPropagation();
    
    // Proteksi: Jika belum login, tawarkan login
    if (!user) {
        if (confirm("Fitur ini khusus member. Mau login sekarang agar filmmu tersimpan aman?")) {
            navigate('/login');
        }
        return;
    }

    try {
        if (isFavorite) {
            // HAPUS dari database
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('movie_id', movie.id);
            
            if (error) throw error;
            setIsFavorite(false);
        } else {
            // SIMPAN ke database
            const { error } = await supabase
                .from('favorites')
                .insert([{
                    user_id: user.id,
                    movie_id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    overview: movie.overview
                }]);
            
            if (error) throw error;
            setIsFavorite(true);
        }
    } catch (err) {
        console.error("Gagal update favorit:", err.message);
        alert("Gagal menyimpan data. Cek koneksi internet.");
    }
  };

  // --- TAMPILAN (STYLING TETAP SAMA SEPERTI YANG ANDA KIRIM) ---
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 relative group"
    >
        {/* --- Indikator Favorit (Tombol Hati) --- */}
        <button 
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 z-10 p-2 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-all active:scale-90"
            title={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
            <Heart 
                size={18} 
                // Jika favorit: Warna Merah Penuh. Jika tidak: Putih Outline
                className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'}`} 
            />
        </button>

        {/* Poster Image */}
        <div className="relative aspect-[2/3]">
            <img 
                src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            
            {/* Overlay Rating di pojok kiri bawah gambar */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8">
                 <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold px-1">
                    <Star size={12} fill="currentColor" />
                    <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        </div>
        
        {/* Judul & Tahun */}
        <div className="p-3">
            <h3 className="font-bold text-sm text-white truncate" title={movie.title}>
                {movie.title}
            </h3>
            <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-400">
                    {movie.release_date ? movie.release_date.split('-')[0] : '-'}
                </p>
            </div>
        </div>
    </Link>
  );
}

export default MovieCard;