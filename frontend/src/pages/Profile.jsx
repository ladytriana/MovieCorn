import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Edit2, Save, X, Heart, Calendar } from 'lucide-react';
import { supabase } from '../supabaseClient';

function Profile() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    
    // State untuk data profil
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // State untuk Mode Edit
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [saving, setSaving] = useState(false);

    // State untuk statistik favorit
    const [favoritesCount, setFavoritesCount] = useState(0);
    
    // --- 1. AMBIL DATA PROFIL DARI SUPABASE ---
    useEffect(() => {
        const getProfile = async () => {
            if (!user) {
                navigate('/login');
                return;
            }
            
            try {
                // Ambil data profil
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    throw error;
                }

                if (data) {
                    setProfile(data);
                    setNewName(data.full_name || user.email.split('@')[0]);
                } else {
                    setNewName(user.email.split('@')[0]);
                    setProfile({});
                }

                // Ambil jumlah favorit
                const { count } = await supabase
                    .from('favorites')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id);
                
                setFavoritesCount(count || 0);

            } catch (error) {
                console.error("Error loading profile:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [user, navigate]);

    // --- 2. FUNGSI LOGOUT ---
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    // --- 3. FUNGSI UPDATE NAMA PROFIL ---
    const handleUpdateProfile = async () => {
        setSaving(true);
        try {
            const updates = {
                id: user.id,
                full_name: newName,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;
            
            setProfile(current => ({ ...current, full_name: newName }));
            setIsEditing(false);
            
        } catch (error) {
            console.error("Gagal update:", error.message);
            alert("Gagal memperbarui profil. Cek RLS atau kolom database.");
        } finally {
            setSaving(false);
        }
    };

    // Fallback saat loading
    if (!user || loading) {
        return (
            <div className="relative min-h-screen bg-gray-900 overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-4">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full"></div>
                        <div className="relative w-20 h-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-gray-700/50 animate-pulse">
                            <User size={40} className="text-gray-500" />
                        </div>
                    </div>
                    <p className="text-gray-400 font-medium">Memuat data pengguna...</p>
                </div>
            </div>
        );
    }

    const displayName = profile?.full_name || user.email.split('@')[0];
    const initial = user.email.charAt(0).toUpperCase();
    const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : 'Baru saja';

    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            
            {/* Advanced Gradient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 pb-24">
                
                {/* --- HERO SECTION --- */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-2xl shadow-yellow-500/30">
                                <User size={32} className="text-black" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text animate-gradient">
                        Profil Saya
                    </h1>
                    
                    <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide animate-fade-in-delayed">
                        Informasi akun dan koleksi film favoritmu
                    </p>
                </div>

                {/* --- PROFILE CARD --- */}
                <div className="relative mb-6 animate-slide-up">
                    <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
                        
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                
                                {/* Avatar Section */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-1 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500">
                                                {initial}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* User Info Section */}
                                <div className="flex-1 text-center md:text-left w-full">
                                    {isEditing ? (
                                        <div className="animate-fade-in space-y-3">
                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 block mb-2">Nama Lengkap</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                                    <input 
                                                        type="text" 
                                                        value={newName}
                                                        onChange={(e) => setNewName(e.target.value)}
                                                        className="relative w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl px-4 py-3 text-white font-medium focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                                                        placeholder="Masukkan nama kamu..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <h2 className="text-3xl font-black tracking-tight text-white">
                                                {displayName}
                                            </h2>
                                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 text-sm flex-wrap">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                                                    <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                                    <span className="text-gray-300 font-medium truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                                                    <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                                                    <span className="text-gray-300 font-medium whitespace-nowrap">Bergabung {joinDate}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Film Favorit Badge */}
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm">
                                                <div className="relative">
                                                    <Heart size={16} className="text-red-500" fill="currentColor" />
                                                    <div className="absolute inset-0 bg-red-500/50 blur-md"></div>
                                                </div>
                                                <span className="text-red-400 font-bold text-sm">{favoritesCount} Film Favorit</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ACTION BUTTONS --- */}
                <div className="space-y-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
                    
                    {/* Edit Profile / Save Changes */}
                    {isEditing ? (
                        <div className="flex gap-3">
                            <button 
                                onClick={handleUpdateProfile}
                                disabled={saving}
                                className="group relative flex-1 px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {saving ? (
                                        <span className="animate-pulse">Menyimpan...</span>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </span>
                            </button>
                            
                            <button 
                                onClick={() => {
                                    setIsEditing(false);
                                    setNewName(profile?.full_name || user.email.split('@')[0]);
                                }}
                                className="group relative px-6 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-2xl font-bold border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="group relative w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/70"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform">
                                    <Edit2 size={22} className="text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-white text-lg">Edit Profil</p>
                                    <p className="text-xs text-gray-400 font-medium">Ubah nama dan informasi pribadi</p>
                                </div>
                            </div>
                        </button>
                    )}

                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout}
                        className="group relative w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:bg-red-900/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:scale-110 transition-transform">
                                <LogOut size={22} className="text-red-400" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-red-400 text-lg group-hover:text-red-300 transition-colors">Keluar</p>
                                <p className="text-xs text-gray-400 font-medium">Logout dari akun kamu</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
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

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out both;
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default Profile;