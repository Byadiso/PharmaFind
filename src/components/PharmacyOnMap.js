import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { db } from "../firebase"; // Firebase config
import { collection, query, getDocs, where } from "firebase/firestore";
import { GOOGLE_MAPS_API_KEY } from "../keys"; // Import API key from config.js

const containerStyle = {
  width: "100%",
  height: "500px",
};

const mapCenter = {
  lat: 1.2921, // Default coordinates (Kigali, Rwanda)
  lng: 36.8219,
};

// Define libraries outside the component to avoid reloading
const googleLibraries = ["places"];

function PharmacyFinder() {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(""); // Add state for selected city/province
  const [loading, setLoading] = useState(false); // Add loading state for fetching pharmacies

  // State to manage if Google Maps API has been loaded
  const [mapLoaded, setMapLoaded] = useState(false);

  // Province options for dropdown (Example, you can expand this list based on actual provinces)
  const provinces = ["Kigali", "EASTERN", "Northern", "Southern", "Western"];

  // UseJsApiLoader to load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Use the imported API key here
    libraries: googleLibraries, // Use static array of libraries
  });

  // Fetch pharmacies based on the selected city or province
  const fetchPharmacies = useCallback(async (province) => {
    setLoading(true); // Start loading
    try {
      const pharmaciesRef = collection(db, "Pharmacies");
      const q = query(pharmaciesRef, where("PROVINCE", "==", province)); // Query based on province
      const querySnapshot = await getDocs(q);

      const pharmaciesList = [];
      querySnapshot.forEach((doc) => {
        pharmaciesList.push(doc.data());
      });

      setPharmacies(pharmaciesList); // Update the pharmacies list in the component state
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  }, []);

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  const handleMarkerClick = (pharmacy) => {
    setActiveMarker(pharmacy);
  };

  const handleProvinceChange = (event) => {
    const province = event.target.value.toUpperCase(); // Corrected toUpperCase() method
    setSelectedProvince(province); // Update selected province
    setSelectedLocation(null); // Clear selected location when changing province
    setActiveMarker(null); // Clear active marker when changing province
    fetchPharmacies(province); // Fetch pharmacies based on selected province
  };

  useEffect(() => {
    if (isLoaded) {
      setMapLoaded(true); // Set the state to indicate that Google Maps API has loaded
    }
  }, [isLoaded]);

  // Handle error loading the API
  if (loadError) {
    return <div>Error loading the map: {loadError.message}</div>;
  }

  // If map hasn't loaded yet, show loading state
  if (!mapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Pharmacies in Your Area</h1>

      {/* Dropdown for selecting province */}
      <div className="mb-6">
        <label htmlFor="province" className="block text-lg font-semibold text-gray-700 mb-2">
          Select a Province
        </label>
        <select
          id="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* GoogleMap component without LoadScript */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {/* Render markers for each pharmacy */}
        {selectedLocation &&
          pharmacies.length > 0 &&
          pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              position={{
                lat: pharmacy.latitude,
                lng: pharmacy.longitude,
              }}
              onClick={() => handleMarkerClick(pharmacy)}
            />
          ))}

        {/* InfoWindow for the selected marker */}
        {activeMarker && (
          <InfoWindow
            position={{
              lat: activeMarker.latitude,
              lng: activeMarker.longitude,
            }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h4 className="font-semibold">{activeMarker.name}</h4>
              <p>{activeMarker.address}</p>
              <p>Stock: {activeMarker.stock || "N/A"} drugs available</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Pharmacies List Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Pharmacies in this area:</h2>
        <div className="mt-4 space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading pharmacies...</p> // Show loading state
          ) : pharmacies.length > 0 ? (
            pharmacies.map((pharmacy, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                <h3 className="text-lg font-bold text-gray-800">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600">{pharmacy.address}</p>
                <p className="text-sm text-green-600">Stock: {pharmacy.stock || "N/A"} drugs</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No pharmacies found in this area.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PharmacyFinder;
