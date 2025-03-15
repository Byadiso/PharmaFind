import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CreatePharmacyPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [insurancePartners, setInsurancePartners] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !insurancePartners || !lat || !lng) {
      alert("Please fill in all fields.");
      return;
    }

    const newPharmacy = {
      name,
      address,
      insurancePartners,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
    };

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "pharmacies"), newPharmacy);
      console.log("Pharmacy added with ID: ", docRef.id);

      // Reset form
      setName("");
      setAddress("");
      setInsurancePartners("");
      setLat("");
      setLng("");

      // Navigate back after submission
      navigate("/pharmacies");
    } catch (error) {
      console.error("Error adding pharmacy: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Form Container */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl relative">
        

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create a New Pharmacy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pharmacy Name
            </label>
            <input
              type="text"
              placeholder="Enter pharmacy name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter pharmacy address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Insurance Partners
            </label>
            <textarea
              placeholder='Enter insurance partners (e.g., "RSSB, MMI")'
              value={insurancePartners}
              onChange={(e) => setInsurancePartners(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                placeholder="Enter latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                placeholder="Enter longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Pharmacy"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
