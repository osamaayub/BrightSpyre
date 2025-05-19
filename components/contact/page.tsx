
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
      
      {/* Contact Details */}
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center gap-3">
          <FaPhone className="text-gray-600" />
          <span>+92 51 287 1173</span>
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-gray-600" />
          <span>support@brightspyre.com</span>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-gray-600" />
          <span>Office # 209-A, 2nd Floor, Evacuee Trust Complex, F 5/1, Islamabad</span>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex gap-4">
        <a href="https://facebook.com/BrightSpyre" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com/BrightSpyre" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
          <FaTwitter size={24} />
        </a>
        <a href="https://linkedin.com/company/brightspyre" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
          <FaLinkedin size={24} />
        </a>
        <a href="https://instagram.com/BrightSpyre" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
