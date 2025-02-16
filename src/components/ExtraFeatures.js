import React from "react";
import { Link } from "react-router-dom";
import { FiBook, FiGlobe, FiDownload } from "react-icons/fi";

const ExtraFeatureLinks = () => {
  return (
    <div className="container mx-auto px-6 mt-24">
      {/* Title/Introduction */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Explore Additional Features
        </h2>
        <p className="text-md text-gray-500 mt-4 max-w-xl mx-auto">
          Access educational resources, open data, and downloadable files to get
          more from our platform.
        </p>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Educational Resources Link */}
        <Link
          to="/educational-resources"
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group hover:bg-blue-50"
        >
          <div className="flex items-center space-x-4">
            <FiBook className="text-3xl text-blue-600 group-hover:text-blue-800 transition-all" />
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-all">
              Educational Resources
            </span>
          </div>
        </Link>

        {/* Open Data Transparency Link */}
        <Link
          to="/open-data"
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group hover:bg-blue-50"
        >
          <div className="flex items-center space-x-4">
            <FiGlobe className="text-3xl text-blue-600 group-hover:text-blue-800 transition-all" />
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-all">
              Open Data Transparency
            </span>
          </div>
        </Link>

        {/* Download Data Link */}
        <Link
          to="/download-data"
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group hover:bg-blue-50"
        >
          <div className="flex items-center space-x-4">
            <FiDownload className="text-3xl text-blue-600 group-hover:text-blue-800 transition-all"  />
            <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-all">
              Download Data
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExtraFeatureLinks;
