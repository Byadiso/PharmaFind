import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  FiMapPin,
  FiSearch,
  FiClock,
  FiHeart,
  FiPhone,
  FiInfo,
  FiHome,
  FiGlobe,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PharmacyCard from "../components/PharmacyCard";
import MapComponent from "../components/MapComponent";
import heroImage from "../assets/pharmacy.jpeg";
import Footer from "../components/Footer";

export default function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const [totalPharmacies, setTotalPharmacies] = useState(0);
  const [uniqueProvinces, setUniqueProvinces] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch pharmacies from Firestore
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pharmacies"));
        const pharmaciesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPharmacies(pharmaciesData);
        setFilteredPharmacies(pharmaciesData);
        setTotalPages(Math.ceil(pharmaciesData.length / itemsPerPage));

        // Update statistics
        setTotalPharmacies(pharmaciesData.length);
        const provinces = new Set(pharmaciesData.map((p) => p.PROVINCE));
        setUniqueProvinces(provinces.size);
      } catch (error) {
        setMessage("Failed to load pharmacies. Please try again.");
        console.error("Error fetching pharmacies: ", error);
      }
    };
    fetchPharmacies();
  }, []);

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
          <p className="text-lg mt-2">
            Discover trusted pharmacies across Rwanda
          </p>
          <div className="mt-6 max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchQuery} message={message} />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Pharmacies */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FiHome className="text-blue-600" size={40} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {totalPharmacies}
              </h2>
              <p className="text-gray-500">Total Pharmacies</p>
            </div>
          </div>

          {/* Total Provinces */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FiGlobe className="text-green-600" size={40} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {uniqueProvinces}
              </h2>
              <p className="text-gray-500">Provinces Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 p-4 bg-white shadow rounded-lg hover:bg-blue-100 transition">
            <FiClock className="text-blue-600" size={20} />
            <span className="text-gray-700 font-medium">24/7 Pharmacies</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-white shadow rounded-lg hover:bg-blue-100 transition">
            <FiMapPin className="text-blue-600" size={20} />
            <span className="text-gray-700 font-medium">Nearest to You</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-white shadow rounded-lg hover:bg-blue-100 transition">
            <FiHeart className="text-blue-600" size={20} />
            <span className="text-gray-700 font-medium">By Cities</span>
          </button>
          <button className="flex items-center space-x-2 p-4 bg-white shadow rounded-lg hover:bg-blue-100 transition">
            <FiSearch className="text-blue-600" size={20} />
            <span className="text-gray-700 font-medium">
              Specialty Medicines
            </span>
          </button>
        </div>
      </div>

      {/* Display Pharmacies */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Licensed Pharmacies in Rwanda
        </h2>
        {filteredPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPharmacies
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((pharmacy) => (
                <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">{message}</p>
        )}
      </div>

     
      {/* Pagination Controls */}
<div className="flex justify-center items-center space-x-4 mt-6 px-4 sm:px-6 lg:px-8">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  <span className="text-lg text-gray-700">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Next
  </button>
</div>


      {/* Footer Section */}
      <section className="mt-10">
        <Footer />
      </section>
    </div>
  );
}
