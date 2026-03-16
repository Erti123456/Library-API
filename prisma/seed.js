import fs from "fs/promises";
import { PrismaClient } from "../src/generated/prisma/index.js";
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  const data = await fs.readFile("../books.json", "utf-8");
  const allBooks = JSON.parse(data);
  const cleanedAllBooks = allBooks.map((book) => {
    const { id, ...rest } = book;
    return rest;
  });
  console.log("Seeding started!");
  await prisma.book.createMany({
    data: cleanedAllBooks,
  });
  console.log("Seeding done!");
};

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
