import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function SearchBar({ onSearch, message }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State for errors

  // Debounce the search function (initialized once using useCallback)
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      try {
        setError(null); // Clear previous errors
        await onSearch(query); // Perform search
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      }
    }, 1000), // Reduced debounce delay to 1s for better UX
    [onSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Ensure immediate state update for UI feedback
    debouncedSearch(value); // Trigger debounced search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.flush(); // Immediately trigger search
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search for pharmacies or drugs..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500 text-gray-900" // Added text color and placeholder color
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Show error if it exists */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show message passed from parent component */}
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
