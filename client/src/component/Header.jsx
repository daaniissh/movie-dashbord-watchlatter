import React, { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState({})
  const handleLogout = () => {
    localStorage.removeItem("movieDb")
    navigate("/login")
  };
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("movieDb")));
  }, []);
  return (
    <header className="bg-gray-800 fixed top-0 w-full text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className='flex items-center' >
          <img
            src="logo.png"
            alt="Logo"
            className="w-12 h-12"
          />
          <h1 className='font-bold text-violet-500' >Cinema</h1>
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/movieWatchLater" className="btn btn-neutral">Watch latter        <FaRegClock /></Link>

          <button onClick={handleLogout} className="flex justify-center items-center gap-2 rounded-lg px-5  btn-ghost bg-black/20 hover:bg-red-400 btn-lg py-2">

            {token?.email || "login"}
            <HiOutlineLogout />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
