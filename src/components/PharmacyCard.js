import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom"; 

const PharmacyCard = ({ pharmacy }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gray-50">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{pharmacy.NAME_OF_INSTITUTION}</h3>
          {/* <div className="flex items-center space-x-1">
            <FiHeart className="text-red-500" size={20} />
            <span className="text-sm text-gray-500">Favorites</span>
          </div> */}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiMapPin className="text-blue-600" size={18} />
          <span>{pharmacy.PROVINCE}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiClock className="text-green-600" size={18} />
          <span>Open 24/7</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiPhone className="text-blue-600" size={18} />
          <span>{pharmacy.PHONE_NUMBER || "N/A"}</span>
        </div>

       
        {/* View Details Button - Wrapped in Link for navigation */}
        <div className="text-center">
          <Link to={`/pharmacy/${pharmacy.id}`}>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
