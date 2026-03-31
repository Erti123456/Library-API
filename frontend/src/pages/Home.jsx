import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative z-10 flex justify-center items-center h-full w-full pointer-events-none">
      <div className="pointer-events-auto text-center">
        <div className="w-full flex justify-center items-center h-20 mb-10">
          <p className="text-white text-8xl font-bold">Library API</p>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <Link
            to="/books"
            className="bg-white rounded-3xl p-4 hover:bg-gray-200 transition-colors font-semibold"
          >
            Explore Books
          </Link>
          <Link
            to="/login"
            className="bg-white rounded-3xl p-4 hover:bg-gray-200 transition-colors font-semibold"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-white rounded-3xl p-4 hover:bg-gray-200 transition-colors font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
