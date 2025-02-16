import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase"; // Ensure Firebase is properly imported
import { doc, getDoc } from "firebase/firestore";
import MapComponent from "../components/MapComponent";
import { FaIdCardAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaRegClock,
  FaClipboardList,
} from "react-icons/fa";

export default function PharmacyDetailPage() {
  const { id } = useParams(); // Get pharmacy ID from the URL
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility
  const mapRef = useRef(null); // Reference for the map section

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const docRef = doc(db, "pharmacies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPharmacy(docSnap.data());
        } else {
          setError("Pharmacy not found.");
        }
      } catch (error) {
        setError("Error fetching pharmacy details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [id]);

  // Function to scroll to the map component
  const scrollToMap = () => {
    // Add a slight delay to allow the map to render first
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // 100ms delay before scrolling
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading pharmacy details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Pharmacy Overview Section */}
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Left Column: Pharmacy Details */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-semibold text-gray-900">
                {pharmacy.NAME_OF_INSTITUTION}
              </h1>
              <p className="text-lg text-gray-600 flex items-center space-x-2">
                <FaUserMd className="text-gray-600" />
                <span>{pharmacy.NAME_OF_TECHNICIAN}</span>
              </p>
              <p className="text-lg text-gray-600 flex items-center space-x-2">
                <FaIdCardAlt className="text-gray-600" />
                <span>{pharmacy.COUNCIL_REGISTRATION_NUMBER}</span>
              </p>
              <p className="text-lg text-gray-600 flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-600" />
                <span>{pharmacy.PROVINCE}-{pharmacy.DISTRICT},  {pharmacy.SECTOR}</span>
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <p className="text-lg font-semibold text-green-600">Stock: </p>
                <span
                  className={`text-lg ${
                    pharmacy.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {pharmacy.stock || "N/A"} drugs available
                </span>
              </div>
            </div>

            {/* Right Column: Contact and Quick Actions */}
            <div className="flex-1 space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
                <p className="text-gray-500 text-sm">(100 reviews)</p>
              </div>
              {/* Contact Information */}
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-500" />
                <p className="text-lg">078888888</p>
              </div>
              {/* Operating Hours */}
              <div className="flex items-center space-x-4">
                <FaRegClock className="text-purple-500" />
                <p className="text-lg">8.00-18.00</p>
              </div>
              {/* Quick Actions */}
              <div className="space-y-4 mt-6">
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200">
                  <FaPhoneAlt className="inline mr-2" /> Call Pharmacy
                </button>
                {/* Get Directions Button */}
                <button
                  onClick={() => {
                    setShowMap(!showMap); // Toggle map visibility
                    scrollToMap(); // Scroll to the map section
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <FaMapMarkedAlt className="inline mr-2" /> Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

         {/* Prescription Upload Section */}
         <div className="bg-white shadow-xl rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Prescription
          </h3>
          <p className="text-gray-600 mb-4">
            Need a prescription? Upload it here, and we’ll check if the
            medicines are in stock.
          </p>
          <div className="flex items-center space-x-2 mb-4">
            <FaClipboardList className="text-gray-500" />
            <input
              type="file"
              className="border-2 border-gray-300 rounded-lg p-4 w-full"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            <FaClipboardList className="inline mr-2" /> Upload Prescription
          </button>
        </div>

        {/* Map Section: Show map if 'showMap' is true */}
        {showMap && (
          <div ref={mapRef} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Pharmacy Location
            </h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <MapComponent pharmacies={pharmacy} /> 
            </div>
          </div>
        )}
      </div>
    </>
  );
}
