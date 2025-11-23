import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, AlertCircle, Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from 'lucide-react';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
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
                alert("Pendaftaran berhasil! Silakan login.");
                setIsLogin(true);
                setLoading(false);
                return;
            }
            navigate('/');
        } catch (err) {
            console.error("Error:", err.message);
            let msg = err.message;
            if (msg.includes("Invalid login credentials")) msg = "Email atau password salah.";
            if (msg.includes("User already registered")) msg = "Email sudah terdaftar. Silakan login.";
            if (msg.includes("Password should be at least 6 characters")) msg = "Password minimal 6 karakter.";
            setError(msg);
        }
        setLoading(false);
    }

    return (
        <div className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
            
            {/* Advanced Gradient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Back to Home Button */}
            <Link 
                to="/"
                className="group fixed top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-300 hover:text-white hover:border-yellow-500/30 transition-all duration-300"
            >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-semibold">Kembali</span>
            </Link>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md px-4 py-8 animate-slide-up">
                
                {/* Logo Section */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full animate-pulse"></div>
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-500/30">
                                <img 
                                    src="/logo.png" 
                                    alt="MovieCorn Logo" 
                                    className="w-12 h-12 object-contain"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
                        MovieCorn
                    </h1>
                </div>

                {/* Card Container */}
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-4">
                                {isLogin ? (
                                    <LogIn size={28} className="text-yellow-500" />
                                ) : (
                                    <UserPlus size={28} className="text-yellow-500" />
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">
                                {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
                            </h2>
                            <p className="text-gray-400 text-sm font-medium">
                                {isLogin ? 'Masuk untuk menyimpan film favoritmu' : 'Daftar untuk mulai mengoleksi film'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 animate-shake">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl"></div>
                                    <div className="relative flex items-center gap-3 p-4 bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl">
                                        <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                                        <p className="text-red-300 text-sm font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center">
                                        <Mail size={18} className="absolute left-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="nama@email.com"
                                            className="relative w-full bg-gray-900/80 backdrop-blur-sm text-white pl-12 pr-4 py-3.5 rounded-2xl border border-gray-700 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all placeholder:text-gray-500 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center">
                                        <Lock size={18} className="absolute left-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="relative w-full bg-gray-900/80 backdrop-blur-sm text-white pl-12 pr-12 py-3.5 rounded-2xl border border-gray-700 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all placeholder:text-gray-500 font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 text-gray-400 hover:text-yellow-500 transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full mt-8 px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        <>
                                            {isLogin ? (
                                                <>
                                                    <LogIn size={20} />
                                                    <span>Masuk</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={20} />
                                                    <span>Daftar</span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Toggle Login/Register */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    className="text-yellow-400 hover:text-yellow-300 font-bold hover:underline transition-colors"
                                >
                                    {isLogin ? 'Daftar sekarang' : 'Login disini'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SAYA MENAMBAHKAN KEMBALI DEFINISI ANIMASI YANG HILANG DI SINI */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-30px, 30px) scale(1.05); }
                }

                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-shake {
                    animation: shake 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default Login;