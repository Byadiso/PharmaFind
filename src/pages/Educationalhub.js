import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import Footer from "../components/Footer";

const EducationalHub = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Pharmacy Information Hub
      </h2>
      <p className="text-lg text-gray-600 text-center mt-4">
        Learn more about pharmaceutical regulations, licenses, and services.
      </p>

      {/* Resources List */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Pharmacy Regulations</h3>
          <p className="text-gray-600 mt-2">
            Understand the laws and regulations that govern pharmacies in Rwanda.
          </p>
          <a href="/" className="text-blue-600 mt-4 inline-block">Learn More</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Licensing Process</h3>
          <p className="text-gray-600 mt-2">
            Learn about the licensing process for starting or operating a pharmacy in Rwanda.
          </p>
          <a href="/" className="text-blue-600 mt-4 inline-block">Learn More</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Pharmacy Services</h3>
          <p className="text-gray-600 mt-2">
            Explore the various services provided by pharmacies in Rwanda, such as healthcare consultations and medication delivery.
          </p>
          <a href="/" className="text-blue-600 mt-4 inline-block">Learn More</a>
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

export default EducationalHub;
