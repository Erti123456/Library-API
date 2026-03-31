import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-96">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-white transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-white transition-colors"
          />
          <button className="bg-white text-black font-bold p-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
