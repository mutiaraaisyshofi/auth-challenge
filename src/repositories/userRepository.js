// src/repositories/userRepository.js

const prisma = require('../config/prisma');
const userRepository = {
  async findByEmail(email) { 
    return prisma.user.findUnique({ where: { email } });
  },

// Mencari user berdasarkan ID
  async findById(id) { 
    return prisma.user.findUnique({ where: { id } });
  },

// Membuat user baru
  async create(data) { 
    return prisma.user.create({ data });
  },

// Memperbarui data user
  async update(id, data) { 
    return prisma.user.update({ where: { id}, data });
  },

// Mencari user berdasarkan refresh token
  async findByRefreshToken(refreshToken) { 
    return prisma.user.findFirst({ where: { refreshToken }
})}, 
}; 

module.exports = userRepository;