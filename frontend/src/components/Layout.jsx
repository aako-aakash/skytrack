import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        {children}
      </main>

      <Footer />

    </div>
  );
}
