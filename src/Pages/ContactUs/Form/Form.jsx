import React from "react";
import { FaFacebook, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Form = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left – Contact Details */}
      <div>
        <h2 className="title">Get in Touch</h2>
        <p className="mt-3 text-sm mb-6">
          You can contact us through Email, Phone or Social Media.
        </p>

        <ul className="space-y-4 text-sm">
          <li className="flex items-center gap-3 hover:text-gray-500">
            <MdEmail className="text-lg" /> support@ticketbari.com
          </li>
          <li className="flex items-center gap-3 hover:text-gray-500">
            <FaPhoneAlt className="text-lg" /> +880 1234-567890
          </li>
          <li className="flex items-center gap-3 hover:text-gray-500">
            <FaFacebook className="text-lg" /> Facebook Page
          </li>
          <li className="flex items-center gap-3 hover:text-gray-500">
            <FaLocationArrow className="text-lg" /> Dhaka, Bangladesh
          </li>
        </ul>
      </div>

      {/* Right – Contact Form */}
      <div>
        <h2 className="title">Send a Message</h2>
        <p className="mt-3 text-sm mb-6">We’ll reply as soon as possible.</p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input w-full border border-gray-400 bg-base-50"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input w-full border border-gray-400 bg-base-50"
            required
          />
          <textarea
            placeholder="Your Message"
            className="textarea w-full h-32 border border-gray-400 bg-base-50"
            required
          ></textarea>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
