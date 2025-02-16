import { useNavigate } from "react-router-dom";

const StatisticsSection = ({ stats }) => {
 

  return (
    <div className="container mx-auto px-6 mt-16 text-center">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Insights at a Glance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
          >
            <stat.icon className={`${stat.iconColor} mb-2`} size={36} />
            <h2 className="text-2xl font-medium text-gray-800">{stat.value}</h2>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default StatisticsSection;