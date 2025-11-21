import React from 'react';
import { motion } from 'framer-motion'; // Untuk animasi sederhana
import { CheckCircle } from 'lucide-react'; // Ikon menarik

function About() {
  const yourName = "Lady Triana Surbakti"; // Ganti dengan nama Anda!
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="bg-gray-900 min-h-screen text-white p-4 sm:p-8 pt-24 pb-20 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center mb-12"
        variants={itemVariants}
      >
        <img 
          src="/logo.png" // Path ke logo Anda di folder public
          alt="MovieCorn Logo" 
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-4 animate-spin-slow" 
        />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          MovieCorn 🍿
        </h1>
        <p className="text-gray-400 text-sm">Versi 1.0.0 (PWA Ready)</p>
      </motion.div>

      {/* --- Tentang Aplikasi --- */}
      <motion.div 
        className="max-w-3xl w-full bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700 mb-8 overflow-hidden relative"
        variants={itemVariants}
      >
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mt-20 animate-float-delayed"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mb-10 animate-pulse"></div>

        <h2 className="text-2xl font-bold mb-5 pl-3 border-l-4 border-yellow-500 relative z-10">
          Tentang Aplikasi
        </h2>
        <motion.p 
          className="text-gray-300 leading-relaxed mb-6 text-justify relative z-10"
          variants={itemVariants}
        >
          MovieCorn adalah aplikasi web progresif (PWA) yang dirancang untuk menjadi teman setia Anda dalam menjelajahi dunia perfilman. Kami menyediakan katalog film yang kaya, ulasan, dan rekomendasi tontonan akhir pekan yang disajikan dengan antarmuka modern dan responsif.
        </motion.p>

        <h3 className="text-xl font-semibold mb-4 pl-3 border-l-4 border-blue-500 relative z-10">
          Fitur Unggulan
        </h3>
        <ul className="space-y-3 text-gray-300 relative z-10">
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <strong className="text-white">Katalog Film Lengkap:</strong> Jelajahi ribuan film dengan detail lengkap seperti sinopsis, rating, genre, dan tanggal rilis.
            </div>
          </motion.li>
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <strong className="text-white">Fitur Favorit Personal:</strong> Login dan simpan film-film favorit Anda, buat daftar tontonan yang bisa diakses kapan saja.
            </div>
          </motion.li>
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <strong className="text-white">Desain Responsif & Modern:</strong> Nikmati pengalaman menonton yang mulus di perangkat apa pun, dari desktop hingga smartphone.
            </div>
          </motion.li>
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <strong className="text-white">Teknologi Terkini:</strong> Dibangun dengan React (Vite), Tailwind CSS, Node.js, dan Supabase untuk performa dan keamanan optimal.
            </div>
          </motion.li>
        </ul>
      </motion.div>

      <motion.p 
        className="text-gray-500 text-sm mt-8 relative z-10"
        variants={itemVariants}
      >
        Dibuat oleh <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">{yourName}</a> &copy; {currentYear}
      </motion.p>
    </motion.div>
  );
}

export default About;