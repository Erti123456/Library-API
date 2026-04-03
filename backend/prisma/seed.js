import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const seedTemplates = [
  { title: "Hidden Dream", author: "Marek Morrison" },
  { title: "Golden City", author: "Sofia Blackwood" },
  { title: "Forgotten Empire", author: "Elias Cross" },
  { title: "Burning Forest", author: "Mila Novak" },
  { title: "Secret Flame", author: "Samuel Morrison" },
  { title: "Midnight Garden", author: "Petra Blackwood" },
  { title: "Emerald Bridge", author: "Lukas Cross" },
  { title: "Crimson Code", author: "Nina Novak" },
  { title: "Endless Sea", author: "Jonas Morrison" },
  { title: "Ancient Kingdom", author: "Eva Blackwood" },
  { title: "Broken River", author: "David Cross" },
  { title: "Electric Road", author: "Iris Novak" },
  { title: "Fading Machine", author: "Victor Morrison" },
  { title: "Iron Star", author: "Elena Blackwood" },
  { title: "Glass Signal", author: "Daniel Cross" },
  { title: "Shadow Valley", author: "Clara Novak" },
  { title: "Lonely Labyrinth", author: "Tomas Morrison" },
  { title: "Solar Archive", author: "Lea Blackwood" },
  { title: "Winter Storm", author: "Noah Cross" },
  { title: "Silent Library", author: "Anna Novak" },
];

const buildSeedBooks = () =>
  Array.from({ length: 1000 }, (_, index) => {
    const template = seedTemplates[index % seedTemplates.length];

    return {
      ...template,
      year: 1900 + ((index + 1) % 125),
    };
  });

const main = async () => {
  const allBooks = buildSeedBooks();
  console.log("Seeding started!");
  await prisma.book.createMany({
    data: allBooks,
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
