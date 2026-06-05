//src/validations/authValidation.js 
const { z } = require("zod");

//z.object() Mendefinisikan objek dengan properti tertentu
const loginSchema = z.object({
    email: z.string()
    .email(),
    password: z.string() 
    .min(8), 
});


const roleEnumz = z.enum(["USER", "MODERATOR"]);


const registerSchema = z.object({
    email: z.string()
    .email({ message: "Format email tidak valid." }), 
    password: z.string()
    .min(8, { message: "Password minimal 8 karakter." }), 
    role: z.enum(["USER", "MODERATOR"], { 
        errorMap: () => ({ message: "Role hanya boleh USER atau MODERATOR." }) 
    }).optional().default("USER"), 
});

// Schema Login
const loginSchemaFull = z.object({
    email: z.string().email({ message: "Format email tidak valid."}), 
    password: z.string().min(1, { message: "Password tidak boleh kosong." }),
})

// Schema Change Password
const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, { message: "Password lama tidak boleh kosong." }), 
    newPassword: z.string().min(8, { message: "Password baru minimal 8 karakter." }), 
});

module.exports = { registerSchema, loginSchemaFull, changePasswordSchema };