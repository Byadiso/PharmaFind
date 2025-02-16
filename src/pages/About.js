import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiTarget, FiHeart, FiTrendingUp, FiUsers, FiShield } from "react-icons/fi";
import aboutImage from "../assets/pharmacy.jpeg";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[#1E3A8A] text-white py-20 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${aboutImage})` }}
        ></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-lg mt-3">
            Empowering communities with easy access to licensed pharmacies and reliable healthcare solutions.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-l-4 border-blue-600">
            <FiTarget className="text-blue-600" size={40} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mt-2">
                To make finding trusted pharmacies effortless while promoting safe and reliable healthcare access.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-l-4 border-green-600">
            <FiTrendingUp className="text-green-600" size={40} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
              <p className="text-gray-600 mt-2">
                To be the most reliable digital health platform, bridging the gap between communities and pharmacies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-6 lg:px-12 mt-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Our Core Values</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          We are driven by trust, accessibility, and innovation to improve healthcare experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <FiShield className="text-blue-600" size={50} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Trust</h3>
            <p className="text-gray-600 mt-2">
              Ensuring only licensed pharmacies are listed for safe and reliable healthcare.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <FiUsers className="text-green-600" size={50} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Accessibility</h3>
            <p className="text-gray-600 mt-2">
              Making it easier for users to locate pharmacies with accurate details.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <FiHeart className="text-purple-600" size={50} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Innovation</h3>
            <p className="text-gray-600 mt-2">
              Using technology to connect people with trusted pharmacies quickly and efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Improved Call to Action (CTA) Section */}
      <div className="relative mt-16">
        <div className=" text-black py-16 px-6 text-center">
          <h2 className="text-3xl font-semibold">Join Us in Transforming Healthcare</h2>
          <p className="text-gray-600 mt-2">
            Whether you're a pharmacy owner or someone in need of a trusted pharmacy, we’re here to help.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:text-blue-600 transition">
            Get Started
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
