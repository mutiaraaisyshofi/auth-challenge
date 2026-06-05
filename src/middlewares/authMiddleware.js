// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Format header harus: "Bearer <token>"
    if (!authHeader || ! authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Akses ditolak. Token tidak ditemukan.",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        // Verifikasi token dengan secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Simpan payload ke req.user agar bisa diakses controller
        req.user = decoded; // { userId, role, iat, exp}
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token telah kedaluwarsa." });
        }
        return res.status(403).json({ message: "Token tidak valid." });
    }
};

const authorize = (... roles) => {
    return (req, res, next) => {
        // Pastikan authenticate sudah dijalankan terlebih dahulu
        if (!req.user) {
            return res.status(401).json({ message: "Autentikasi diperlukan." });
        }
        
        // Cek apakah role user termasuk dalam daftar role yang diizinkan
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Akses ditolak. Diperlukan role: ${roles.join(" atau ")}.` 
            });
        }
        
        next();
    };
};

module.exports = { authenticate, authorize };