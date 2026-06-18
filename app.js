// app.js
require('dotenv').config(); 
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");
const express = require('express'); 
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require("./src/routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/books", bookRoutes);
console.log("Book Routes Loaded");

app.get("/", (req, res) => {
  res.json({
    message: "Backend API aktif",
    endpoints: {
      auth: "/api/auth",
      books: "/books",
      docs: "/api-docs",
      health: "/health"
    }
  });
});

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