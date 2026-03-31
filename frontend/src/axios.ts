import axios from "axios";

interface loginInfo {
  username: string;
  password: string;
}
interface LoginResponse {
  token: string;
}

const axiosApi = axios.create({ baseURL: "" });
export const login = async ({ username, password }: loginInfo) => {
  const res = await axiosApi.post<LoginResponse>("/users/login", {
    username,
    password,
  });
  return res.data.token;
};


