import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="bg-gradient-to-r from-purple-500 to-cyan-400 p-2 rounded-xl shadow-md">
            📦
          </div>

          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SkyTrack
          </h1>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-gray-300 font-medium">
          <Link to="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>

          <Link to="/add" className="hover:text-white transition">
            Add Product
          </Link>

          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg text-white hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
