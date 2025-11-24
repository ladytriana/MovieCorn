import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { ArrowLeft, ArrowRight, Trophy, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Fallback aman untuk API KEY
let API_KEY = '';
try {
  API_KEY = import.meta.env.VITE_TMDB_API_KEY;
} catch (e) {
  if (typeof process !== 'undefined' && process.env) {
    API_KEY = process.env.VITE_TMDB_API_KEY;
  }
}

function TopRated() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (!API_KEY) {
                setError("API Key tidak ditemukan.");
                setLoading(false);
                return;
            }

            try {
                // LOGIKA 18 FILM: Single fetch biasa
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=id-ID&page=${page}`
                );
                
                const results = response.data?.results || [];
                // Potong jadi 18 agar pas 3 baris (pada layout 6 kolom)
                setMovies(results.slice(0, 18));
            } catch (err) {
                console.error("Error fetching top rated:", err);
                setError("Gagal mengambil data film.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);

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
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* --- HERO SECTION --- */}
                <div className="text-center mb-12 mt-8">
                    <div className="flex justify-center items-center gap-4 mb-4 animate-fade-in">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-2xl shadow-yellow-500/30">
                                <Trophy size={32} className="text-black" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text animate-gradient">
                        Rating Tertinggi
                    </h1>
                    
                    <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide max-w-2xl mx-auto animate-fade-in-delayed">
                        Kumpulan film legendaris dengan penilaian terbaik dari penonton di seluruh dunia
                    </p>
                </div>

                {/* --- SECTION HEADER --- */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/50">
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30">
                            <Award className="text-yellow-500" size={26} />
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-2xl"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                Film Terbaik
                                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                            </h2>
                            <p className="text-sm text-gray-400 mt-0.5">Halaman {page} dari koleksi film berrating tinggi</p>
                        </div>
                    </div>

                    {/* Results Count */}
                    {!loading && movies.length > 0 && (
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-gray-300">{movies.length} Film</span>
                        </div>
                    )}
                </div>
                
                {error && (
                    <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl"></div>
                            <div className="relative p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-red-500/30">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                        <span className="text-2xl">⚠️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-red-400 mb-1">Terjadi Kesalahan</h3>
                                        <p className="text-red-300 text-sm">{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MOVIE GRID --- */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {[...Array(18)].map((_, i) => (
                            <div key={i} className="group relative">
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 via-gray-800/40 to-gray-900/40 animate-pulse-slow"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Array.isArray(movies) && movies.map((movie, index) => (
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

                        {/* --- RESPONSIVE PAGINATION --- */}
                        {movies.length > 0 && (
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
            
            {/* ANIMATIONS */}
            <style>{`
                @keyframes pulse-slow {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.6; }
                }
                .animate-pulse-slow {
                  animation: pulse-slow 2s ease-in-out infinite;
                }
                
                @keyframes fadeInScale {
                  from { opacity: 0; transform: scale(0.9) translateY(20px); }
                  to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-delayed {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes slide-up {
                  from { opacity: 0; transform: translateY(30px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                  0%, 100% { transform: translate(0, 0) scale(1); }
                  50% { transform: translate(30px, -30px) scale(1.1); }
                }
                @keyframes float-delayed {
                  0%, 100% { transform: translate(0, 0) scale(1); }
                  50% { transform: translate(-30px, 30px) scale(1.05); }
                }
                @keyframes gradient {
                  0%, 100% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                }

                .animate-fade-in { animation: fade-in 0.8s ease-out; }
                .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.3s both; }
                .animate-slide-up { animation: slide-up 0.8s ease-out 0.2s both; }
                .animate-float { animation: float 20s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
                .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
            `}</style>
        </div>
    );
}

export default TopRated;