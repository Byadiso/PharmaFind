import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const faqs = [
  {
    question: "How do I find a pharmacy near me?",
    answer: "Simply enter your location in the search bar, and we'll show you the nearest pharmacies with their details."
  },
  {
    question: "Are all listed pharmacies verified?",
    answer: "Yes, we ensure that only licensed and verified pharmacies are listed to guarantee your safety."
  },
  {
    question: "Is the service free to use?",
    answer: "Yes, our platform is completely free for users looking for pharmacies."
  },
  {
    question: "How can I list my pharmacy?",
    answer: "You can register your pharmacy by filling out our registration form and providing the required details."
  },
  {
    question: "Do you provide home delivery services?",
    answer: "We do not provide delivery services, but some pharmacies listed may offer home delivery options."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[#1E3A8A] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-lg mt-3">Find answers to the most common questions about our platform.</p>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg mb-4">
              <button
                className="w-full flex justify-between items-center p-5 text-left text-gray-800 font-semibold focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <FiChevronDown
                  className={`text-xl transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="p-5 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative mt-16">
        <div className="text-black py-16 px-6 text-center">
          <h2 className="text-3xl font-semibold">Still Have Questions?</h2>
          <p className="text-gray-600 mt-2">Feel free to reach out to us for more information or assistance.</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:text-blue-600 transition">
            Contact Us
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
