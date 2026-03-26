import { prisma } from "../utils/prismaClient.js";

export const getAllBooks = async () => {
  try {
    return await prisma.book.findMany();
  } catch (err) {
    throw err;
  }
};
export const saveBook = async (bookData) => {
  try {
    return await prisma.book.create({ data: bookData });
  } catch (err) {
    throw err;
  }
};

export const findBookById = async (id) => {
  try {
    return await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};
export const updateBook = async (id, bookData) => {
  try {
    return await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: bookData,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteBook = async (id) => {
  try {
    return await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};
