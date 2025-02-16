import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition"
          onClick={() => navigate("/")}
        >
          PharmaFind Rwanda
        </h1>
        
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/")} className="text-white hover:text-gray-300 transition">Home</button>
          <button onClick={() => navigate("/about")} className="text-white hover:text-gray-300 transition">About</button>
         
          <button onClick={() => navigate("/contact")} className="text-white hover:text-gray-300 transition">Contact US</button>
          <button onClick={() => navigate("/faq")} className="text-white hover:text-gray-300 transition">FAQ</button>

          {isAuthenticated && (
            <button onClick={() => navigate("/admin")} className="text-white hover:text-gray-300 transition">Admin</button>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
          ) : (
            <button onClick={() => navigate("/login")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Login</button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 py-4 px-6 flex flex-col space-y-4 text-white">
          <button onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="hover:text-gray-300">Home</button>
          <button onClick={() => { navigate("/about"); setIsMenuOpen(false); }} className="hover:text-gray-300">About</button>
          <button onClick={() => { navigate("/faq"); setIsMenuOpen(false); }} className="hover:text-gray-300">FAQ</button>
          <button onClick={() => { navigate("/contact"); setIsMenuOpen(false); }} className="hover:text-gray-300">Contact</button>
          {isAuthenticated && (
            <button onClick={() => { navigate("/admin"); setIsMenuOpen(false); }} className="hover:text-gray-300">Admin</button>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
          ) : (
            <button onClick={() => { navigate("/login"); setIsMenuOpen(false); }} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">Login</button>
          )}
        </div>
      )}
    </nav>
  );
}
