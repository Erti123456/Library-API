import fs from "fs/promises";

export const getAllUsers = async () => {
  try {
    const data = await fs.readFile("./users.json", "utf-8");
    const users = JSON.parse(data);
    return users;
  } catch (err) {
    throw err;
  }
};
export const saveUsers = async (users) => {
  try {
    await fs.writeFile("./users.json", JSON.stringify(users, null, 2));
  } catch (err) {
    throw err;
  }
};
