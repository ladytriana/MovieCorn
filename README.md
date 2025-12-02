# 🍿 MovieCorn - Aplikasi Katalog Film Modern (Vite + React + Supabase)

MovieCorn adalah aplikasi web progresif (PWA) yang dirancang untuk menjadi teman setia Anda dalam menjelajahi dunia perfilman.  
Aplikasi ini dibangun menggunakan teknologi front-end modern dan menawarkan antarmuka yang cepat, responsif, dan elegan.

vercel link : https://movie-corn-v2u7.vercel.app/
---

## ✨ Fitur Utama Aplikasi

- **Pencarian & Penjelajahan Film**  
  Menggunakan API TMDB untuk menampilkan film *Trending* dan hasil pencarian secara *real-time*.

- **Mode Tamu (Guest Mode)**  
  Pengguna dapat menjelajah beranda, Top Rated, dan About tanpa perlu login. Menu navigasi berubah dinamis.

- **Sistem Otentikasi Penuh**  
  Fitur daftar (Sign Up) dan masuk (Login) menggunakan Supabase Auth.

- **Favorit Personal (Database)**  
  Pengguna yang login dapat menyimpan dan menghapus film favorit mereka secara aman di database Supabase PostgreSQL.

- **Manajemen Profil**  
  Pengguna dapat melihat detail akun dan mengubah nama profil mereka.

- **Pagination & Loading**  
  Konten dibagi menjadi halaman-halaman yang rapi (18 film per halaman) dengan *skeleton loading* untuk performa optimal.

- **Desain Responsif**  
  Layout sepenuhnya mendukung perangkat mobile (Navigasi bawah) maupun desktop (Navbar atas).

---

## 💡 Teknologi yang Digunakan

| Kategori      | Teknologi                     | Deskripsi                                                                 |
|---------------|------------------------------|--------------------------------------------------------------------------|
| Front-End     | React & Vite                 | Library utama untuk membangun antarmuka pengguna yang cepat.            |
| Styling       | Tailwind CSS                 | Framework CSS utility-first untuk desain responsif dan custom.          |
| Ikon          | Lucide React                 | Set ikon modern dan ringan.                                             |
| Data Film     | The Movie Database (TMDB)    | Sumber data untuk katalog film, sinopsis, dan rating.                   |
| Back-End / DB | Supabase                     | Backend-as-a-Service (BaaS) untuk Otentikasi dan Database (PostgreSQL). |
| Deployment    | Vercel                       | Platform hosting cepat untuk aplikasi Front-End.                        |

