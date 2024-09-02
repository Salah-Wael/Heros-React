import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate()

  const LogOut = async () => {
    await axios.post("http://127.0.0.1:8000/api/logout").then((res) => {
      navigate("/login");
      reactLocalStorage.remove("User")
    }).catch((err) => console.log(err))
  }

  useEffect(() => {

  }, [user])

  return (
    <motion.header
      className="mb-2 bg-gray-800 shadow-xl 2xl:rounded-md 2xl:mt-2 max-container padding-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative flex flex-col max-w-screen-xl px-4 py-4 overflow-hidden md:mx-auto md:flex-row md:items-center">
        <a href="#" className="flex text-2xl md:items-center whitespace-nowrap">
          <span className="mr-2 text-4xl text-blue-600 md:pl-0">
            <img
              src="/logox.png"
              alt=""
              className="w-[50px] md:w-full logo-animation"
            />
          </span>
          <div className="flex flex-col pt-3 leading-4 md:items-center">
            <span className="font-extrabold tracking-widest text-cyan">
              HEROS
            </span>
            <span className="font-mono text-xs md:pr-1 text-light-violet">
              We are here
            </span>
          </div>
        </a>
        <input type="checkbox" className="hidden peer" id="navbar-open" />
        <label
          className="absolute cursor-pointer top-8 right-7 md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-light-violet"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <Link to="/profile" className="absolute top-0 cursor-pointer right-7">
            <CgProfile size={24} color="#DF63FF" />
          </Link>
        </label>
        <nav
          aria-label="Header Navigation"
          className="flex flex-col items-center justify-between w-full overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 max-h-0 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.href}
                  className="px-4 text-lg font-medium text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text link-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              {!user ? <>
                <li>
                  <Link
                    to="signup"
                    className="relative px-3 py-1 overflow-hidden text-xl font-semibold text-midnight rounded-xl bg-gradient-to-r from-cyan to-light-violet"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="login"
                    className="relative px-3 py-1 overflow-hidden text-xl font-semibold text-midnight rounded-xl bg-gradient-to-r from-cyan to-light-violet"
                  >
                    Login
                  </Link>
                </li>
              </> : <>
                <li>
                  <button
                    onClick={LogOut}
                    className="relative px-3 py-1 overflow-hidden text-xl font-semibold text-midnight rounded-xl bg-gradient-to-r from-cyan to-light-violet"
                  >
                    Logout
                  </button>
                </li>
                <Link to="/profile" className="hidden md:block">
                  <CgProfile size={24} color="#DF63FF" />
                </Link>
              </>}


            </div>
          </ul>
          <div className="relative mt-2 md:mt-0 md:ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-12 h-10 pl-10 pr-3 text-sm text-gray-900 duration-300 ease-in-out bg-gray-100 rounded-md focus:outline-none transition-width hover:w-40"
            />
            <motion.div
              className="absolute top-0 left-0 flex items-center justify-center w-10 h-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaSearch className="text-gray-500" />
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
