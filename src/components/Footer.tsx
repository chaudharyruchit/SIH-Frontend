import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import alumglobeLogo from "@/assets/alumglobe-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={alumglobeLogo}
                alt="AlumGlobe"
                className="h-12 w-12 rounded-full border-2 border-gray-300"
              />
              <span className="text-xl font-bold text-black">AlumGlobe</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered Alumni Networking & Engagement platform connecting
              graduates worldwide for mentorship, career opportunities, and
              meaningful relationships.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-black" />
                <span>contact@alumglobe.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-black" />
                <span>+91-9318374443</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-black" />
                <span>Greater Noida, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-primary mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 AlumGlobe. All rights reserved. Connecting alumni worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
