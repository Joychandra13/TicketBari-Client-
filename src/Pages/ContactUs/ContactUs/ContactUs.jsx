import React from "react";
import { FaPhoneAlt, FaFacebook, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Hero from "../Hero/Hero";
import Form from "../Form/Form";

const ContactUs = () => {
  return (
    <div className="text-gray-400">
      <Hero/>
      <Form/>
      <div className="bg-gray-100 dark:bg-neutral-950 py-6 text-center text-xs">
        We respond within 24-48 hours. Thank you for contacting TicketBari!
      </div>

    </div>
  );
};

export default ContactUs;
