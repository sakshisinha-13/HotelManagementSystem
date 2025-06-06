import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">StayEasy</h1>
      <div className="space-x-4">
        <Link to="/" className="text-blue-600 font-medium">Home</Link>
        <Link to="/visited" className="text-blue-600 font-medium">Visited</Link>
        <Link to="/drafts" className="text-blue-600 font-medium">Drafts</Link>
        <Link to="/completed" className="text-blue-600 font-medium">Completed</Link>
      </div>
    </nav>
  );
};

export default Navbar;
