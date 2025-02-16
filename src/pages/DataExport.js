import React, { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom"; // Import Link for navigation
import Footer from "../components/Footer";

const DataExport = () => {
  const [pharmacyData, setPharmacyData] = useState([]);
  const db = getFirestore(); // Firebase Firestore

  // Fetch pharmacy data from Firebase
  const fetchPharmacyData = async () => {
    const querySnapshot = await getDocs(collection(db, "pharmacies"));
    const data = querySnapshot.docs.map(doc => doc.data());
    setPharmacyData(data);
  };

  // On component mount, fetch pharmacy data
  React.useEffect(() => {
    fetchPharmacyData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Download Pharmacy Data
      </h2>
      <p className="text-lg text-gray-600 text-center mt-4 mb-8">
        Download the dataset of pharmacies in Rwanda in CSV or JSON format.
      </p>

      <div className="flex justify-center space-x-4 mb-8">
        {/* CSV Export */}
        <CSVLink data={pharmacyData} filename={"pharmacies_rwanda.csv"}>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
            Download CSV
          </button>
        </CSVLink>

        {/* JSON Export */}
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(pharmacyData, null, 2)
          )}`}
          download="pharmacies_rwanda.json"
        >
          <button className="bg-green-600 text-white py-2 px-4 rounded-md">
            Download JSON
          </button>
        </a>
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="text-blue-600 hover:underline text-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <>
       <Footer />
      </>
    </div>
  );
};

export default DataExport;
