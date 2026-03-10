import fs from "fs/promises";

export const getAllBooks = async () => {
  try {
    const data = await fs.readFile("./books.json", "utf-8");
    const books = JSON.parse(data);
    return books;
  } catch (err) {
    throw err;
  }
};
export const saveBooks = async (books) => {
  try {
    await fs.writeFile("./books.json", JSON.stringify(books, null, 2));
  } catch (err) {
    throw err;
  }
};
