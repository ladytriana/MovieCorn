import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Edit2, Save, X, Camera, ShieldCheck } from 'lucide-react';
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

    // --- 1. AMBIL DATA PROFIL DARI SUPABASE ---
    useEffect(() => {
        const getProfile = async () => {
            if (!user) return;
            
            try {
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
                    setNewName(data.full_name || '');
                }
            } catch (error) {
                console.error("Error loading profile:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [user]);

    // --- 2. FUNGSI LOGOUT ---
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    // --- 3. FUNGSI UPDATE PROFIL ---
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
            
            // Update state lokal agar langsung berubah di layar
            setProfile({ ...profile, full_name: newName });
            setIsEditing(false);
            alert("Profil berhasil diperbarui!");
            
        } catch (error) {
            console.error("Gagal update:", error.message);
            alert("Gagal memperbarui profil.");
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <User size={32} className="text-gray-500" />
                </div>
                <p className="text-gray-400">Memuat data pengguna...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 pt-24 pb-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 pl-2 border-l-4 border-yellow-500">Profil Saya</h1>

                {/* --- KARTU PROFIL UTAMA --- */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 mb-6 relative overflow-hidden">
                    {/* Hiasan Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-1 shadow-lg">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-bold text-yellow-500">
                                            {user.email.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Ikon Kamera (Hiasan) */}
                            <div className="absolute bottom-0 right-0 bg-gray-700 p-1.5 rounded-full border border-gray-600 text-gray-300">
                                <Camera size={14} />
                            </div>
                        </div>

                        {/* Info User */}
                        <div className="text-center sm:text-left flex-1">
                            {isEditing ? (
                                <div className="animate-fade-in">
                                    <label className="text-xs text-gray-400 ml-1 block mb-1">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="w-full bg-gray-900 border border-yellow-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                                        placeholder="Masukkan nama kamu..."
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-white">
                                        {profile?.full_name || "Pengguna MovieCorn"}
                                    </h2>
                                    <p className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-1 mt-1">
                                        <Mail size={14} />
                                        {user.email}
                                    </p>
                                </>
                            )}
                            
                            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold gap-1">
                                <ShieldCheck size={12} />
                                Member Gratis
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TOMBOL MENU --- */}
                <div className="space-y-3">
                    
                    {/* 1. Tombol Edit Profil (Toggle) */}
                    {isEditing ? (
                        <div className="flex gap-3">
                            <button 
                                onClick={handleUpdateProfile}
                                disabled={saving}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                            >
                                {saving ? <span className="animate-pulse">Menyimpan...</span> : <><Save size={20} /> Simpan Perubahan</>}
                            </button>
                            <button 
                                onClick={() => {
                                    setIsEditing(false);
                                    setNewName(profile?.full_name || ''); // Reset nama jika batal
                                }}
                                className="w-14 bg-gray-700 hover:bg-gray-600 text-white rounded-xl flex items-center justify-center transition"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-gray-800 hover:bg-gray-750 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-between group border border-gray-700/50 hover:border-gray-600 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300">
                                    <Edit2 size={20} />
                                </div>
                                <span>Edit Profil</span>
                            </div>
                            <span className="text-gray-500 group-hover:translate-x-1 transition-transform">&gt;</span>
                        </button>
                    )}

                    {/* 2. Tombol Keluar */}
                    <button 
                        onClick={handleLogout}
                        className="w-full bg-gray-800 hover:bg-red-900/20 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-between group border border-gray-700/50 hover:border-red-500/30 transition-all mt-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 group-hover:text-red-300">
                                <LogOut size={20} />
                            </div>
                            <span className="text-red-400 group-hover:text-red-300">Keluar</span>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Profile;