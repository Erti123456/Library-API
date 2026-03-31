import { Link } from "react-router-dom";

function Bookshelf() {
  return (
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
      <h1 className="text-6xl font-bold mb-8">Bookshelf</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {/* Placeholder for Books */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold">The Great Gatsby</h3>
          <p className="text-gray-400 italic">By F. Scott Fitzgerald</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold">1984</h3>
          <p className="text-gray-400 italic">By George Orwell</p>
        </div>
      </div>
      <Link to="/" className="mt-12 text-blue-400 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export default Bookshelf;
