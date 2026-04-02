import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const token = await register({ username, password, email });
      localStorage.setItem("token", token);
      navigate("/books");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-center items-center text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-96">
        <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>

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
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-white transition-colors"
            required
          />
          <button className="bg-white text-black font-bold p-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">
            Register
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center font-semibold animate-pulse">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Sign In
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

export default Register;
