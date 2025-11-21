import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movies.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rute Utama
app.get('/', (req, res) => {
    res.send('Backend MovieCorn Berjalan! 🌽');
});

// Gunakan rute movies untuk fitur Favorit
app.use('/api', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});