import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import CreatePharmacyForm from "../components/CreatePharmacyForm ";
import UpdatePharmacyForm from "../components/UpdatePharmacyForm";
import DeletePharmacyButton from "../components/DeletePharmacyButton";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      const querySnapshot = await getDocs(collection(db, "pharmacies"));
      const pharmaciesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPharmacies(pharmaciesData);
    };
    fetchPharmacies();
  }, []);

  const handleAddPharmacy = (newPharmacy) => {
    setPharmacies([...pharmacies, newPharmacy]);
    setShowCreateModal(false);
  };

  const handleUpdatePharmacy = (updatedPharmacy) => {
    setPharmacies(
      pharmacies.map((pharmacy) =>
        pharmacy.id === selectedPharmacy.id ? { ...pharmacy, ...updatedPharmacy } : pharmacy
      )
    );
    setSelectedPharmacy(null);
    setShowUpdateModal(false);
  };

  const handleDeletePharmacy = (pharmacyId) => {
    setPharmacies(pharmacies.filter((pharmacy) => pharmacy.id !== pharmacyId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Dashboard</h2>
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/pharmacy/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Pharmacy
          </button>
          <button
            onClick={() => navigate("/uploadJSON")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Update Database
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Pharmacies</h3>
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">{pharmacy.NAME_OF_INSTITUTION}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedPharmacy(pharmacy);
                    setShowUpdateModal(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <DeletePharmacyButton pharmacyId={pharmacy.id} onDelete={handleDeletePharmacy} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create Pharmacy</h3>
            <CreatePharmacyForm onAdd={handleAddPharmacy} />
          </div>
        </div>
      )}
      {showUpdateModal && selectedPharmacy && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Update Pharmacy</h3>
            <UpdatePharmacyForm pharmacy={selectedPharmacy} onUpdate={handleUpdatePharmacy} />
            <button
              onClick={() => setShowUpdateModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
