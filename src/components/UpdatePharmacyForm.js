import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function UpdatePharmacyForm({ pharmacy, onUpdate }) {
  const [name, setName] = useState(pharmacy.name);
  const [lat, setLat] = useState(pharmacy.location.lat);
  const [lng, setLng] = useState(pharmacy.location.lng);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lat || !lng) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedPharmacy = {
      name,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
    };

    try {
      // Update the pharmacy in Firestore
      await updateDoc(doc(db, "pharmacies", pharmacy.id), updatedPharmacy);
      console.log("Pharmacy updated successfully");

      // Notify the parent component (e.g., to update the list)
      onUpdate(updatedPharmacy);
    } catch (error) {
      console.error("Error updating pharmacy: ", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Pharmacy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Pharmacy Name</label>
          <input
            type="text"
            placeholder="Enter pharmacy name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input
            type="number"
            placeholder="Enter latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input
            type="number"
            placeholder="Enter longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg"
        >
          Update Pharmacy
        </button>
      </form>
    </div>
  );
}