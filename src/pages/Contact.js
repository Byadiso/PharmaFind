import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-[#1E3A8A] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-3">We'd love to hear from you. Reach out to us with any questions or feedback.</p>
      </div>

      {/* Contact Details */}
      <div className="container mx-auto px-6 lg:px-12 mt-12 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FiMail className="text-blue-600" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Email Us</h3>
            <p className="text-gray-600 mt-2">info@pharmacyfinder.com</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FiPhone className="text-green-600" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Call Us</h3>
            <p className="text-gray-600 mt-2">+250 123 456 789</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <FiMapPin className="text-purple-600" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">Visit Us</h3>
            <p className="text-gray-600 mt-2">Kigali, Rwanda</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-6 lg:px-12 mt-12 max-w-3xl">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Send Us a Message</h2>
          {submitted && <p className="text-green-600 text-center mt-2">Thank you! We will get back to you soon.</p>}
          <form className="mt-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2 h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-gray-200 hover:text-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
