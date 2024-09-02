import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowsAltV,
  FaWeight,
  FaFlag,
  FaGenderless,
  FaFutbol,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";
import axios from "axios";
import { useQuery } from "react-query";
import Empty from '../../public/9264828.png'

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [birthCountry, setBirthCountry] = useState("");
  const [countryPlay, setCountryPlay] = useState("");
  const [gender, setGender] = useState("");
  const { id, token, email } = JSON.parse(localStorage.getItem("User"))

  const GetProfile = () => {
    return axios.get(`http://127.0.0.1:8000/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer Bearer ${token}`
      }
    })
  }

  const { data } = useQuery("Get Profile", GetProfile, {
    cacheTime: 3000000
  })

  const handleBirthCountry = (country) => setBirthCountry(country);
  const handleCountryPlay = (country) => setCountryPlay(country);
  const handleGenderSelect = (gender) => setGender(gender);

  const renderContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <textarea
              className="w-full p-3 mb-4 bg-gray-100 rounded-md"
              placeholder="What's on your mind?"
            />
            <button className="px-4 py-2 mb-8 font-semibold text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet">
              Post
            </button>
          </motion.div>
        );
      case "About":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaUser className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data.hero.firstName}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
              <div className="relative flex items-center">
                <FaUser className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data.hero.lastName}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
            </div>
            <div className="relative flex items-center">
              <FaUser className="absolute text-gray-400 left-3" />
              <input
                type="text"
                placeholder={data?.data.hero.shortName}
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
              />
            </div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute text-gray-400 left-3" />
              <input
                type="email"
                placeholder={email}
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaArrowsAltV className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data?.hero?.height}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
              <div className="relative flex items-center">
                <FaWeight className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data?.hero?.weight}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaFlag className="absolute text-gray-400 left-3" />
                <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
                  <input
                    className="hidden peer"
                    type="checkbox"
                    name="select-2"
                    id="select-2"
                  />
                  <label
                    htmlFor="select-2"
                    className="flex items-center w-full h-12 py-3 pl-10 pr-3 text-sm text-gray-700 border rounded-lg cursor-pointer select-none ring-blue-400 peer-checked:ring"
                  >
                    {data?.data.hero?.origin_country}
                  </label>
                </div>
              </div>
              <div className="relative flex items-center">
                <FaFlag className="absolute text-gray-400 left-3" />
                <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
                  <input
                    className="hidden peer"
                    type="checkbox"
                    name="select-3"
                    id="select-3"
                  />
                  <label
                    htmlFor="select-3"
                    className="flex items-center w-full h-12 py-3 pl-10 pr-3 text-sm text-gray-700 border rounded-lg cursor-pointer select-none ring-blue-400 peer-checked:ring"
                  >
                    {data?.data.hero?.play_country}
                  </label>
                </div>
              </div>
            </div>
            <div className="relative flex items-center">
              <FaGenderless className="absolute text-gray-400 left-3" />
              <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
                <input
                  className="hidden peer"
                  type="checkbox"
                  name="select-1"
                  id="select-1"
                />
                <label
                  htmlFor="select-1"
                  className="flex items-center w-full h-12 py-3 pl-10 pr-3 text-sm text-gray-700 border rounded-lg cursor-pointer select-none ring-blue-400 peer-checked:ring"
                >
                  {data?.data?.hero?.gender}
                </label>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaFutbol className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data?.hero.sport}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder={data?.data?.hero.birthDate?.slice(0, 10)}
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="w-full p-2 mt-5 mb-8 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
              >
                Edit
              </button>
            </div>
          </motion.div>
        );
      case "Photos":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-2 pb-8 lg:grid-cols-4 md:grid-cols-2">
              {data?.data.images?.length ? data?.data.images?.map((img, index) => {
                <img
                  key={index}
                  src="https://via.placeholder.com/150"
                  alt="Dummy"
                  className="object-cover w-full h-full rounded-xl"
                />
              }) : <img
                src={Empty}
                alt="Dummy"
                className="object-cover w-full h-full rounded-xl"
                style={{ margin: "auto" }}
              />}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-md max-container padding-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* http://127.0.0.1:8000/assets/images/HerosImages/$ */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 mt-8 mb-4 rounded-full"
        />
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text">
          {data?.data?.hero?.fullName}
        </h1>
      </div>
      <div className="flex justify-around mb-4">
        {["Posts", "About", "Photos"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold rounded-md ${activeTab === tab
              ? "bg-gradient-to-r from-cyan to-light-violet text-gray-800"
              : "bg-gray-200"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderContent()}
    </motion.div>
  );
};

export default Profile;
