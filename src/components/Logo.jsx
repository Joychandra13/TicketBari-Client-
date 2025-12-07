import React from 'react';
import { FaBus } from 'react-icons/fa';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-xl font-extrabold flex items-center gap-2 hover:text-gray-500"
      >
        <FaBus />
        <span>TicketBari</span>
      </Link>
    </div>
  );
};

export default Logo;
