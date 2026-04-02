import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = await login({ username, password });
      localStorage.setItem("token", token);
      navigate("/books");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-center items-center text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-96">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-white transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-white transition-colors"
            required
          />
          <button className="bg-white text-black font-bold p-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">
            Login
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-red-400">
            {error}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
