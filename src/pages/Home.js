import { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiHome, FiGlobe } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PharmacyCard from "../components/PharmacyCard";
import Footer from "../components/Footer";
import heroImage from "../assets/pharmacy.jpeg";

export default function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [totalPharmacies, setTotalPharmacies] = useState(0);
  const [uniqueProvinces, setUniqueProvinces] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "pharmacies"));
        const pharmaciesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPharmacies(pharmaciesData);
        setFilteredPharmacies(pharmaciesData);
        setTotalPharmacies(pharmaciesData.length);

        const provinces = new Set(pharmaciesData.map((p) => p.PROVINCE));
        setUniqueProvinces(provinces.size);
      } catch (error) {
        setMessage("Failed to load pharmacies. Please try again.");
        console.error("Error fetching pharmacies: ", error);
      }
      setLoading(false);
    };

    fetchPharmacies();
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPharmacies(pharmacies);
      return;
    }

    const filtered = pharmacies.filter((pharmacy) =>
      pharmacy.NAME_OF_INSTITUTION.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.PROVINCE.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPharmacies(filtered);
  }, [searchQuery, pharmacies]);

  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredPharmacies, totalPages]);

  const displayedPharmacies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPharmacies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPharmacies, currentPage, itemsPerPage]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="relative bg-blue-600 text-white py-16 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Find a Pharmacy Near You</h1>
          <p className="text-lg mt-2">Discover trusted pharmacies across Rwanda</p>
          <div className="mt-6 max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchQuery} message={message} />
          </div>
        </div>
      </div>

      {!searchQuery && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
              <FiHome className="text-blue-600" size={40} />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{totalPharmacies}</h2>
                <p className="text-gray-500">Total Pharmacies</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
              <FiGlobe className="text-green-600" size={40} />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{uniqueProvinces}</h2>
                <p className="text-gray-500">Provinces Covered</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {searchQuery ? `Results Found (${filteredPharmacies.length})` : "Available Licensed Pharmacies in Rwanda"}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 animate-pulse">
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded mt-4 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : displayedPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedPharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <svg className="w-16 h-16 text-gray-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h.01M15 9h.01M9 15h6M5 5l14 14" />
            </svg>
            <p className="text-lg text-gray-700 font-semibold mt-4">No pharmacies found.</p>
            <p className="text-gray-500">Try searching with a different keyword.</p>
          </div>
        )}
      </div>

      <section className="mt-10">
        <Footer />
      </section>
    </div>
  );
}
