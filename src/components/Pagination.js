import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage, filteredPharmacies }) => {
  return (
    filteredPharmacies.length > 0 && (
      <div className="flex justify-center items-center space-x-4 mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-700"
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
