import { Link } from "react-router-dom";
import { clearToken, hasToken } from "../axios";

function Home() {
  const isAuthenticated = hasToken();

  const handleSignOut = () => {
    clearToken();
    window.location.reload();
  };

  return (
    <div className="relative z-10 flex justify-center items-center h-full w-full pointer-events-none px-6">
      <div className="pointer-events-auto flex min-h-screen flex-col items-center justify-center text-center">
        <div className="w-full flex justify-center items-center h-20 mb-6">
          <p className="text-white text-6xl md:text-8xl font-bold">Library API</p>
        </div>
        <div className="flex w-full max-w-[42rem] items-center justify-between gap-4">
          <div className="shrink-0">
            <Link
              to="/books"
              className="bg-white rounded-3xl p-4 hover:bg-gray-200 transition-colors font-semibold"
            >
              Explore Books
            </Link>
          </div>
          <div className="flex shrink-0 gap-4 items-center">
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="bg-white rounded-3xl p-4 hover:bg-gray-200 transition-colors font-semibold"
              >
                Sign Out
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
