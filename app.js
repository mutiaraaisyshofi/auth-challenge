// app.js
require('dotenv').config(); 
const express = require('express'); 
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());

// Registrasi routes 
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
   res.json({ status: 'OK', timestamp: new Date().toISOString()}); 
});

// Global error handler

// eslint-disable-next-line no-unused-vars

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: "Terjadi kesalahan pada server." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));