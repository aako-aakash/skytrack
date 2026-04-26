export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-8 text-center">


        <div className="flex justify-center items-center gap-2 mb-2">
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 p-1.5 rounded-md shadow-md">
            📦
          </span>

          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SkyTrack
          </span>
        </div>


        <p className="text-gray-400 text-sm">
          © 2026 SkyTrack • Built by{" "}
          <a
            href="https://www.linkedin.com/in/akash-kumar-saw-bb1630258"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition font-medium"
          >
            AAKASH
          </a>
        </p>


        <p className="text-xs text-gray-500 mt-1 tracking-wide">
          Powered by <span className="text-cyan-400">SKYWARD</span>
        </p>

      </div>
    </footer>
  );
}
