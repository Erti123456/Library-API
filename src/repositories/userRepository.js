import { prisma } from "../utils/prismaClient.js";

export const findUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const saveUser = async (userData) => {
  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (err) {
    throw err;
  }
};

