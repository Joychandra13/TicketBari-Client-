import React from 'react';
import { FaBus } from 'react-icons/fa';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="text-xl font-extrabold flex items-center hover:text-gray-500 gap-2">
            <FaBus />
            <span>TicketBari</span>
          </Link>
    );
};

export default Logo;