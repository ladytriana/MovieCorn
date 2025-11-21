import React, { createContext, useContext, useEffect, useState } from 'react';
// Mengimpor supabase client
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function useAuth() {
    // Hook untuk digunakan di komponen manapun (misal: Navbar, MovieCard)
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Untuk menunda render sampai status auth tercek

    useEffect(() => {
        // 1. Cek sesi saat aplikasi dimuat
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Menyimpan objek user atau null
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // 2. Mendengarkan perubahan status otentikasi (login/logout secara real-time)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Membersihkan subscription saat komponen di-unmount
        return () => subscription.unsubscribe();
    }, []);

    // Fungsi Mendaftar
    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    };

    // Fungsi Login
    const logIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    // Fungsi Logout
    const logOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const value = { user, signUp, logIn, logOut };

    return (
        <AuthContext.Provider value={value}>
            {/* Hanya menampilkan children (aplikasi) setelah loading selesai */}
            {!loading && children}
        </AuthContext.Provider>
    );
}