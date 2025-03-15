import { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiHome, FiGlobe, FiSearch } from "react-icons/fi";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PharmacyCard from "../components/PharmacyCard";
import Footer from "../components/Footer";
import heroImage from "../assets/pharmacy.jpeg";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ExtraFeatureLinks from "../components/ExtraFeatures";
import Pagination from "../components/Pagination";
import StatisticsSection from "../components/StatisticsSection";

export default function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [totalPharmacies, setTotalPharmacies] = useState(0);
  const [uniqueProvinces, setUniqueProvinces] = useState(0);
  const [uniqueDistricts, setUniqueDistricts] = useState(0);
  const [uniqueSectors, setUniqueSectors] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const normalizeProvinceForStatistics = (province) => {
    if (province) {
      const normalizedProvince = province.toUpperCase();
      if (
        normalizedProvince.includes("SOUTHERN") ||
        normalizedProvince === "SOUTH"
      ) {
        return "SOUTHERN";
      }
      if (
        normalizedProvince.includes("KIGALI") ||
        normalizedProvince === "KIGALI CITY"
      ) {
        return "KIGALI";
      }
      if (
        normalizedProvince.includes("EASTERN") ||
        normalizedProvince === "EASTERN PROVINCE"
      ) {
        return "EASTERN";
      }
    }
    return province;
  };

  // Statistics data
  const statsData = [
    {
      icon: FiHome,
      iconColor: "text-blue-600",
      value: totalPharmacies,
      label: "Total Pharmacies",
    },
    {
      icon: FiGlobe,
      iconColor: "text-blue-600",
      value: uniqueProvinces-1,
      label: "Provinces Covered",
    },
    {
      icon: FiGlobe,
      iconColor: "text-blue-600",
      value: uniqueDistricts-1,
      label: "Districts Covered",
    },
    {
      icon: FiGlobe,
      iconColor: "text-blue-600",
      value: uniqueSectors,
      label: "Sectors Covered",
    },
  ];

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

        const normalizedProvinces = new Set(
          pharmaciesData.map((p) => normalizeProvinceForStatistics(p.PROVINCE))
        );
        setUniqueProvinces(normalizedProvinces.size);
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
        pharmacy.CELL,
      ].some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredPharmacies(filtered);
  }, [searchQuery, pharmacies]);

  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredPharmacies, totalPages, currentPage]);

  const displayedPharmacies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPharmacies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPharmacies, currentPage, itemsPerPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16 px-6 text-center rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 rounded-lg"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-semibold tracking-tight leading-tight text-white sm:text-5xl md:text-6xl">
            Find a Pharmacy Near You
          </h1>
          <p className="text-lg mt-4 opacity-90 sm:text-xl md:text-2xl">
            Discover trusted pharmacies across Rwanda
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar onSearch={setSearchQuery} message={message} />
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      {!searchQuery && (
        <div className="container mx-auto px-6 mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to PharmaFind
          </h2>
          <p className="text-md text-gray-600 mt-4 max-w-3xl mx-auto">
            PharmaFind helps you quickly find licensed pharmacies in your area
            across Rwanda. Easily search, check pharmacy details, and locate the
            nearest options—all in one place
          </p>
          <button
            onClick={() => navigate("/pharmacies")}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-6 hover:bg-blue-600 transition"
          >
            Discover Rwanda Pharmacies
          </button>
        </div>
      )}

      {/* Statistics Section */}
      {!searchQuery && <StatisticsSection stats={statsData} />}

      {/* Pharmacy List Section */}
      {searchQuery && (
        <div className="container mx-auto px-6 mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            {searchQuery
              ? `We Found (${filteredPharmacies.length}) Pharmacies for you!`
              : "All Licensed Pharmacies in Rwanda"}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <ClipLoader color="#1D4ED8" loading={loading} size={50} />
            </div>
          ) : displayedPharmacies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {displayedPharmacies.map((pharmacy) => (
                <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FiSearch className="text-gray-400 mx-auto" size={50} />
              <p className="text-gray-600 mt-4 text-lg">
                No pharmacies found. Try searching with different keywords.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          filteredPharmacies={filteredPharmacies}
        />
      )}

      {/* Extra Links Section */}
      {!searchQuery && <ExtraFeatureLinks />}

      {/* Footer */}
      <Footer />
    </div>
  );
}
