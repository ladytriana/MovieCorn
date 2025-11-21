import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { logIn, signUp } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await logIn(email, password);
            } else {
                await signUp(email, password);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Gagal masuk. Periksa email/password atau koneksi internet.');
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 pb-20 text-white">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                        {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'Masuk untuk menyimpan film favoritmu' : 'Daftar untuk mulai mengoleksi film'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            minLength={6}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        {loading ? 'Memproses...' : (isLogin ? <><LogIn size={20}/> Masuk</> : <><UserPlus size={20}/> Daftar</>)}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="text-yellow-400 hover:underline font-bold"
                    >
                        {isLogin ? 'Daftar sekarang' : 'Login disini'}
                    </button>
                </div>
                
                <div className="mt-4 text-center">
                    <Link to="/" className="text-xs text-gray-500 hover:text-gray-300">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;