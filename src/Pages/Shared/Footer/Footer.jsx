import React from "react";
import Logo from "../../../components/Logo";
import { FaFacebook, FaPhoneAlt, FaStripe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-50 text-gray-400 shadow-sm shadow-gray-400 border-t border-gray-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-4">
        {/* Column 1: Logo + description */}
        <div>
          <Link to="/">
            <Logo />
          </Link>
          <p className="text-sm">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-gray-500">Home</a>
            </li>
            <li>
              <a className="hover:text-gray-500">All Tickets</a>
            </li>
            <li>
              <a className="hover:text-gray-500">Contact Us</a>
            </li>
            <li>
              <a className="hover:text-gray-500">About</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-500 flex items-center gap-2">
              <MdEmail /> Email: support@ticketbari.com
            </li>
            <li className="hover:text-gray-500 flex items-center gap-2">
              <FaPhoneAlt /> Phone: +880 1234-567890
            </li>
            <li>
              <a
                href="https://facebook.com"
                className="hover:text-gray-500 flex items-center gap-2"
              >
                <FaFacebook /> Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment */}
        <div>
          <h3 className="font-semibold mb-3">Payment Methods</h3>
          <div>
            <FaStripe className="text-6xl hover:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 text-center py-3 text-xs">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
