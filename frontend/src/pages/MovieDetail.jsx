import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Calendar, Clock, Heart } from 'lucide-react';

// GUNAKAN AUTH DAN SUPABASE (BUKAN FIREBASE)
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient'; 

// Fallback API Key
let API_KEY = '';
try {
  API_KEY = import.meta.env.VITE_TMDB_API_KEY;
} catch (e) {
  if (typeof process !== 'undefined' && process.env) {
    API_KEY = process.env.VITE_TMDB_API_KEY;
  }
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Ambil status login

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // --- 1. FETCH DETAIL FILM (TMDB) ---
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const responseId = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=id-ID`
        );
        const dataIndo = responseId.data;

        if (!dataIndo.overview) {
            const responseEn = await axios.get(
                `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
            );
            setMovie({ ...dataIndo, overview: responseEn.data.overview });
        } else {
            setMovie(dataIndo);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // --- 2. CEK STATUS FAVORIT (SUPABASE) ---
  useEffect(() => {
    const checkFavStatus = async () => {
        if (!user) {
            setIsFavorite(false);
            return;
        }

        // Cek database Supabase: Apakah user ini sudah like film ini?
        const { data } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user.id)
            .eq('movie_id', id)
            .single();
        
        if (data) setIsFavorite(true);
    };

    checkFavStatus();
  }, [user, id]);


  // --- 3. TOMBOL FAVORIT (LOGIKA SUPABASE + REDIRECT) ---
  const handleFavorite = async () => {
    // JIKA TAMU: LANGSUNG KE LOGIN
    if (!user) {
        navigate('/login');
        return;
    }

    try {
        if (isFavorite) {
            // HAPUS DARI SUPABASE
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('movie_id', id);
            
            if (error) throw error;
            setIsFavorite(false);
        } else {
            // SIMPAN KE SUPABASE
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
    } catch (error) {
        console.error("Gagal update favorit:", error.message);
        alert("Gagal menyimpan. Cek koneksi internet.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20 animate-pulse">Memuat data film...</div>;
  if (!movie) return <div className="text-white text-center mt-20">Film tidak ditemukan</div>;

  const getYear = (date) => date ? date.split('-')[0] : '-';

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-20 relative">
      
      {/* Banner Atas */}
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition backdrop-blur-sm"
        >
            <ArrowLeft size={24} color="white" />
        </button>

        <img 
          src={movie.backdrop_path ? `${IMG_URL}${movie.backdrop_path}` : 'https://via.placeholder.com/1280x720'} 
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
          onError={(e) => e.target.style.display = 'none'} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450'} 
              alt={movie.title} 
              className="w-48 md:w-64 rounded-xl shadow-2xl border-4 border-gray-800"
            />
          </div>

          {/* Detail Teks */}
          <div className="flex-1 pt-4 md:pt-32">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-6">
                <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-yellow-500" />
                    <span>{getYear(movie.release_date)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} className="text-yellow-500" />
                    <span>{movie.runtime} menit</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span>{movie.vote_average?.toFixed(1)} / 10</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map(genre => (
                    <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-700">
                        {genre.name}
                    </span>
                ))}
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 border-l-4 border-yellow-500 pl-3">Sinopsis</h3>
                <div className="text-gray-300 leading-relaxed text-justify">
                    {movie.overview ? (
                        <p>{movie.overview}</p>
                    ) : (
                        <p className="italic text-gray-500 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                           "Maaf, sinopsis belum tersedia."
                        </p>
                    )}
                </div>
            </div>

            {/* --- TOMBOL FAVORIT --- */}
            <button 
                onClick={handleFavorite}
                className={`w-full md:w-auto font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 
                ${isFavorite ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-black'}`}
            >
                {isFavorite ? (
                    <>
                        <Heart size={20} fill="currentColor" />
                        Tersimpan di Favorit
                    </>
                ) : (
                    <>
                        <Heart size={20} />
                        Tambahkan ke Favorit
                    </>
                )}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;