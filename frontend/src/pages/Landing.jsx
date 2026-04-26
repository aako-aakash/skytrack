import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white flex flex-col items-center justify-center text-center px-6">

      <div className="flex items-center gap-3 mb-4">
        <span className="bg-gradient-to-r from-purple-500 to-cyan-400 p-3 rounded-xl text-xl">
          📦
        </span>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          SKY Track
        </h1>
      </div>

      <p className="text-gray-400 mb-8 max-w-md">
        Smart Product Tracking & Analytics Platform
      </p>

      <Link
        to="/login"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Get Started
      </Link>
    </div>
  );
}
