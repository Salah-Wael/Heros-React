import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { BsFillBalloonHeartFill } from "react-icons/bs";

const Footer = () => {
  const iconStyles = { color: "red", fontSize: "20", display: "inline" };
  return (
    <div className="max-container padding-container">
      <div className="grid gap-8 px-4 pt-16 mx-auto text-gray-300 mt-28 lg:grid-cols-3">
        <div>
          <h1 className="w-full text-sm font-bold text-black">About Heros</h1>
          <p className="py-4 text-sm text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            adipisci quo asperiores. Quam dolorum in exercitationem animi qui
            repellendus excepturi
          </p>
          <div className="flex gap-4 md:[75%] my-6">
            <FaTwitterSquare size={30} color="#00b9ff" />
            <FaInstagram size={30} color="black" />
            <FaFacebookSquare size={30} color="#3b5998" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 ml-5 sm:flex-row lg:col-span-2">
          <div>
            <h6 className="text-sm font-bold text-black">Pages</h6>
            <ul>
              <li className="py-2 text-sm text-gray-800">News</li>
              <li className="py-2 text-sm text-gray-800">About</li>
              <li className="py-2 text-sm text-gray-800">Support</li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-bold text-black">Resources</h6>
            <ul>
              <li className="py-2 text-sm text-gray-800">Home</li>
              <li className="py-2 text-sm text-gray-800">Register</li>
              <li className="py-2 text-sm text-gray-800">Login</li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-bold text-black">Contact</h6>
            <ul>
              <span></span>
              <li className="py-2 text-sm text-gray-800">
                heroswearehere@gmail.com
              </li>
              <span></span>
              <li className="py-2 text-sm text-gray-800">+1 222 212 3819</li>
              <span></span>
              <li className="py-2 text-sm text-gray-800">
                43 Raymouth Rd. Baltemoer, London 3910
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
