import { FiFacebook, FiTwitter, FiInstagram, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold">About Us</h2>
            <p className="mt-4 text-gray-300">
              We help you find trusted pharmacies across Rwanda, ensuring easy access to licensed medicines near you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <div className="mt-4 space-y-3">
              <p className="flex items-center space-x-2">
                <FiPhone className="text-gray-300" />
                <span>+250 788 888 888</span>
              </p>
              <p className="flex items-center space-x-2">
                <FiMail className="text-gray-300" />
                <span>support@pharmacyfinder.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <FiMapPin className="text-gray-300" />
                <span>Kigali, Rwanda</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition">
            <FiFacebook size={24} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <FiTwitter size={24} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <FiInstagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6">
          &copy; {new Date().getFullYear()} Pharmacy Finder. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
