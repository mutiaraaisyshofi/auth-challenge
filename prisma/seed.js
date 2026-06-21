const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {

  console.log("Mulai seeding...");

  const adminPassword =
    await bcrypt.hash("adminbook123", 10);

  const moderatorPassword =
    await bcrypt.hash("moderator.book123", 10);

  const userPassword =
    await bcrypt.hash("Mutiaraaisy09", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "admin.bookapiandauth@gmail.com",
        password: adminPassword,
        role: "ADMIN"
      },
      {
        email: "moderator.bookapiandauth@gmail.com",
        password: moderatorPassword,
        role: "MODERATOR"
      },
      {
        email: "mutiaraaisy@gmail.com",
        password: userPassword,
        role: "USER"
      }
    ],
    skipDuplicates: true
  });

  await prisma.book.createMany({
    data: [
      {
        title: "Bug di Hati, Fullstack di Mimpi",
        author: "Mutiii",
        price: 150000,
        stock: 10
      },
      {
        title: "Tips dan Trik ST dalam 2 Semester",
        author: "James Clear",
        price: 120000,
        stock: 15
      },
      {
        title: "Sejarang Angka",
        author: "Sari",
        price: 130000,
        stock: 8
      },
      {
        title: "Jalan Ninjaku",
        author: "Andrew Hunt",
        price: 175000,
        stock: 12
      },
      {
        title: "Keteladanan Pahlaman Himmel",
        author: "Erich Gamma",
        price: 200000,
        stock: 5
      },
      {
        title: "Matematika Berkata",
        author: "Martin Fowler",
        price: 185000,
        stock: 7
      },
      {
        title: "Its Time, Dude",
        author: "Marijn Haverbeke",
        price: 110000,
        stock: 20
      },
      {
        title: "",
        author: "Kyle Simpson",
        price: 125000,
        stock: 10
      },
      {
        title: "Node.js Design Patterns",
        author: "Mario Casciaro",
        price: 165000,
        stock: 6
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        price: 95000,
        stock: 18
      }
    ],
    skipDuplicates: true
  });

  console.log("Seeding selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });