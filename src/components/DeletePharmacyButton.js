import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function DeletePharmacyButton({ pharmacyId, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this pharmacy?")) {
      try {
        // Delete the pharmacy from Firestore
        await deleteDoc(doc(db, "pharmacies", pharmacyId));
        console.log("Pharmacy deleted successfully");

        // Notify the parent component (e.g., to update the list)
        onDelete(pharmacyId);
      } catch (error) {
        console.error("Error deleting pharmacy: ", error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white p-2 rounded-lg"
    >
      Delete Pharmacy
    </button>
  );
}