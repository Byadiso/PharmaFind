import { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiHome, FiGlobe, FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PharmacyCard from "../components/PharmacyCard";
import Footer from "../components/Footer";
import heroImage from "../assets/pharmacy.jpeg";
import { ClipLoader } from "react-spinners";  // Import spinner component

export default function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [totalPharmacies, setTotalPharmacies] = useState(0);
  const [uniqueProvinces, setUniqueProvinces] = useState(0);
  const [uniqueDistricts, setUniqueDistricts] = useState(0);
  const [uniqueSectors, setUniqueSectors] = useState(0);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Normalize province names only for statistics calculation
  const normalizeProvinceForStatistics = (province) => {
    if (province) {
     
      const normalizedProvince = province.toUpperCase();
      
      if (normalizedProvince.includes("SOUTHERN") || normalizedProvince === "SOUTH") {
        return "SOUTHERN";
      }
      if (normalizedProvince.includes("KIGALI") || normalizedProvince === "KIGALI CITY") {
        return "KIGALI";
      }
      if (normalizedProvince.includes("EASTERN") || normalizedProvince === "EASTERN PROVINCE") {
        return "EASTERN";
      }
    }
    return province; // Keep original value for pharmacy listing
  };

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

        // Normalize provinces only for statistics
        const normalizedProvinces = new Set(pharmaciesData.map((p) => normalizeProvinceForStatistics(p.PROVINCE)));
        setUniqueProvinces(normalizedProvinces.size);
        console.log(normalizedProvinces)

        const districts = new Set(pharmaciesData.map((p) => p.DISTRICT));
        setUniqueDistricts(districts.size);

        const sectors = new Set(pharmaciesData.map((p) => p.SECTOR));
        setUniqueSectors(sectors.size);

      } catch (error) {
        setMessage("Failed to load pharmacies. Please try again.");
        console.error("Error fetching pharmacies: ", error);
      }
      setLoading(false);
    };

    fetchPharmacies();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPharmacies(pharmacies);
      return;
    }

    const filtered = pharmacies.filter((pharmacy) =>
      [
        pharmacy.NAME_OF_INSTITUTION,
        pharmacy.PROVINCE,
        pharmacy.DISTRICT,
        pharmacy.SECTOR,
        pharmacy.CELL
      ]
      .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
              <FiGlobe className="text-blue-600" size={40} />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{uniqueDistricts}</h2>
                <p className="text-gray-500">Districts Covered</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
              <FiGlobe className="text-orange-600" size={40} />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{uniqueSectors}</h2>
                <p className="text-gray-500">Sectors Covered</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {searchQuery ? `Results Found (${filteredPharmacies.length})` : "All Licensed Pharmacies in Rwanda"}
        </h2>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <ClipLoader color="#1D4ED8" loading={loading} size={50} />
          </div>
        ) : displayedPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedPharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FiSearch className="text-gray-400 mx-auto" size={50} />
            <p className="text-gray-600 mt-4 text-lg">No pharmacies found. Try searching with different keywords.</p>
          </div>
        )}
      </div>

      {filteredPharmacies.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
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
      )}

      <section className="mt-10">
        <Footer />
      </section>
    </div>
  );
}
