import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const UploadPharmacies = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const loadAndUploadData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/pharmaciesData.json');
      const pharmaciesData = await response.json();
      const pharmaciesRef = collection(db, 'pharmacies');
      
      for (let pharmacy of pharmaciesData) {
        const q = query(pharmaciesRef, where('SN', '==', pharmacy['SN']));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // If the pharmacy doesn't exist, add a new one
          await addDoc(pharmaciesRef, pharmacy);
          console.log(`Pharmacy ${pharmacy['SN']} uploaded successfully.`);
        } else {
          // If the pharmacy exists, update it
          const docSnap = querySnapshot.docs[0]; // Assuming first match is the correct one
          await setDoc(doc(db, 'pharmacies', docSnap.id), pharmacy);
          console.log(`Pharmacy ${pharmacy['SN']} updated successfully.`);
        }
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error uploading pharmacies: ", error);
      setError("Error uploading pharmacies. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Upload Pharmacies Data</h1>
        <p className="text-gray-600 mb-4">Click the button below to upload or update pharmacy records to the database.</p>
        
        <button 
          onClick={loadAndUploadData}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" stroke="none" />
                <path d="M4 12a8 8 0 0 1 8-8M4 12a8 8 0 0 0 8 8M4 12h16" fill="none" />
              </svg>
              Uploading...
            </span>
          ) : (
            'Upload Data'
          )}
        </button>

        {success && <p className="mt-4 text-green-600 font-semibold">All pharmacies uploaded or updated successfully!</p>}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        {loading && !error && <p className="mt-4 text-gray-700">Uploading data... Please wait.</p>}

        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
};

export default UploadPharmacies;
