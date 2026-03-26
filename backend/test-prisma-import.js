// test-prisma-import.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

try {
    const prisma = new PrismaClient();
    console.log("PrismaClient imported and instantiated successfully!");
    prisma.$disconnect(); // Disconnect to clean up
} catch (e) {
    console.error("Failed to import or instantiate PrismaClient:", e);
}
