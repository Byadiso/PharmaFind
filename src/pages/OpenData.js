import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import { HiArrowLeft } from "react-icons/hi"; // Back arrow icon
import { IoInformationCircleOutline } from "react-icons/io5"; // Information icon
import Footer from "../components/Footer";

const OpenDataTransparency = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 font-sans">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">
        Open Data Transparency
      </h2>
      
      {/* Description */}
      <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto leading-relaxed">
        We ensure the accuracy of the data by sourcing from trusted open data repositories and keeping it regularly updated.
      </p>
      
      {/* Content Section */}
      <div className="mt-12 flex flex-wrap justify-between gap-12 max-w-6xl mx-auto">
        {/* Where We Source Our Data */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <IoInformationCircleOutline className="text-blue-600 mr-3" size={22} />
            Where We Source Our Data
          </h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Our pharmacy data is sourced from publicly available government and health regulatory databases. This data is updated regularly to ensure its accuracy.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600 list-inside">
            <li className="flex items-center text-lg">
              <HiArrowLeft className="text-blue-600 mr-3" size={18} />
              Rwanda Ministry of Health
            </li>
            <li className="flex items-center text-lg">
              <HiArrowLeft className="text-blue-600 mr-3" size={18} />
              Open Government Data Platform
            </li>
            <li className="flex items-center text-lg">
              <HiArrowLeft className="text-blue-600 mr-3" size={18} />
              Pharmacy Regulatory Authority
            </li>
          </ul>
        </div>

        {/* How We Update the Data */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <IoInformationCircleOutline className="text-blue-600 mr-3" size={22} />
            How We Update the Data
          </h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Our platform regularly synchronizes with public databases to keep the pharmacy information up to date. We also provide a way for users to report incorrect data to improve the platform.
          </p>
        </div>
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

export default OpenDataTransparency;
