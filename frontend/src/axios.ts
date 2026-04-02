import axios from "axios";

interface LoginInfo {
  username: string;
  password: string;
}

interface RegisterInfo extends LoginInfo {
  email: string;
}

interface AuthResponse {
  token: string;
  message?: string;
}

export interface BookPayload {
  title: string;
  author: string;
  year: number;
}

export interface Book extends BookPayload {
  id: number;
}

interface BooksQueryOptions {
  search?: string;
  sortBy?: string;
  order?: string;
}

const axiosApi = axios.create({ baseURL: "" });

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.errorMessage;

    if (typeof apiMessage === "string") {
      return apiMessage;
    }
  }

  return "Something went wrong. Please try again.";
};

export const register = async ({ username, password, email }: RegisterInfo) => {
  try {
    const res = await axiosApi.post<AuthResponse>("/api/users/register", {
      username,
      password,
      email,
    });

    return res.data.token;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const login = async ({ username, password }: LoginInfo) => {
  try {
    const res = await axiosApi.post<AuthResponse>("/api/users/login", {
      username,
      password,
    });

    return res.data.token;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getBooks = async (
  page = 1,
  limit = 6,
  { search = "", sortBy = "", order = "" }: BooksQueryOptions = {},
) => {
  try {
    const res = await axiosApi.get<Book[] | { errorMessage?: string }>(
      "/api/books",
      {
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(order ? { order } : {}),
        },
      },
    );

    if (Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getBookById = async (id: number) => {
  try {
    const res = await axiosApi.get<Book>(`/api/books/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createBook = async ({ title, author, year }: BookPayload) => {
  try {
    const res = await axiosApi.post<Book>("/api/books", {
      title,
      author,
      year,
    });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateBook = async (
  id: number,
  { title, author, year }: BookPayload,
) => {
  try {
    const res = await axiosApi.put<Book>(`/api/books/${id}`, {
      title,
      author,
      year,
    });

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const patchBook = async (id: number, updates: Partial<BookPayload>) => {
  try {
    const res = await axiosApi.patch<Book>(`/api/books/${id}`, updates);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteBook = async (id: number) => {
  try {
    await axiosApi.delete(`/api/books/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const hasToken = () => {
  return Boolean(localStorage.getItem("token"));
};
