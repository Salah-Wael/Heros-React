import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowsAltV,
  FaWeight,
  FaFlag,
  FaFutbol,
  FaCalendarAlt,
  FaIdBadge,
  FaImages,
  FaGenderless,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import TermsModal from "../components/TermsModal";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isSecondForm, setIsSecondForm] = useState(false);
  const [gender, setGender] = useState("Male");
  const [countryPlay, setCountryPlay] = useState("Country 1");
  const [birthCountry, setBirthCountry] = useState("Country 1");
  const [role, setRole] = useState("User");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();

  const Registaration = async (values) => {
    console.log(role);
    const RegisterForm = new FormData();
    RegisterForm.append("email", values.email);
    RegisterForm.append("password", values.password);
    RegisterForm.append("firstName", values.First_Name);
    RegisterForm.append("lastName", values.Last_Name);
    RegisterForm.append("fullName", values.Short_Name);
    RegisterForm.append("password_confirmation", values.Confirmpassword);
    RegisterForm.append("gender", gender);
    RegisterForm.append("image[0]", values.FirstImage);
    RegisterForm.append("checkbox", values.Accept);
    RegisterForm.append("height", values.Height);
    RegisterForm.append("weight", values.Weight);
    RegisterForm.append("origin_country", birthCountry);
    RegisterForm.append("play_country", countryPlay);
    RegisterForm.append("sport", values.Sport);
    RegisterForm.append("birthDate", values.Date);
    RegisterForm.append("shortName", values.Short_Name);

    if (role === "Hero") {
      await axios.post("http://127.0.0.1:8000/api/auth/hero/register", RegisterForm)
        .then(() => {
          setError(null)
          navigate("/login")
        })
        .catch((err) => {
          console.log(err)
          setError(err.response.data)
          handleGetStarted(false);
        })
    } else {
      await axios.post("http://127.0.0.1:8000/api/auth/register", RegisterForm)
        .then(() => {
          setError(null)
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data)
          handleGetStarted(false);
        })
    }
  }

  const Formik = useFormik({
    initialValues: {
      First_Name: "",
      Last_Name: "",
      Short_Name: "",
      gender: gender,
      role: role,
      email: "",
      password: "",
      Confirmpassword: "",
      Height: "",
      Weight: "",
      BirthCountry: birthCountry,
      countryPlay: countryPlay,
      Sport: "",
      Date: "",
      SportId: "",
      FirstImage: "",
      SecondImage: "",
      ThirdImage: "",
      FourthImage: "",
      Accept: false
    }, onSubmit: Registaration
  })


  const handleGetStarted = (Sign) => {
    setIsSecondForm(Sign ? true : false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleCountryPlay = (selectedCountryPlay) => {
    setCountryPlay(selectedCountryPlay);
  };

  const handleBirthCountry = (selectedBirthCountry) => {
    setBirthCountry(selectedBirthCountry);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const HandleFirstImage = (event) => {
    const FirstImage = event.target.files[0];
    Formik.setFieldValue("FirstImage", FirstImage)
  }

  const HandleSecondImage = (event) => {
    const Secondmage = event.target.files[0];
    Formik.setFieldValue("SecondImage", Secondmage)
  }

  const HandleThirdImage = (event) => {
    const ThirdImage = event.target.files[0];
    Formik.setFieldValue("ThirdImage", ThirdImage)
  }

  const HandleFourthImage = (event) => {
    const ThirdImage = event.target.files[0];
    Formik.setFieldValue("FourthImage", ThirdImage)
  }

  useEffect(() => {

  }, [gender,
    countryPlay,
    birthCountry,
    role,
    isTermsOpen])


  return (
    <div className="lg:m-10">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onSubmit={Formik.handleSubmit}
      >
        {!isSecondForm ? (
          <motion.div
            className="relative max-w-screen-md p-6 mx-auto space-y-3 bg-gray-800 rounded-md shadow-xl lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="mb-6 text-xl font-semibold text-white lg:text-2xl">
              Register
            </h1>
            {/* 
            {Error === null ? null : <label style={{ color: "red" }}
              className="mb-6 text-xl font-semibold text-white lg:text-2xl"
            >{Error} </label>} */}

            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaUser className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="First_Name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div className="relative flex items-center">
                <FaUser className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Last_Name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
            </div>
            <div className="relative flex items-center">
              <FaUser className="absolute text-gray-400 left-3" />
              <input
                type="text"
                placeholder="Short Name"
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                name="Short_Name"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
            </div>
            <div className="relative flex items-center">
              <FaUser className="absolute text-gray-400 left-3" />
              <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
                <input
                  className="hidden peer"
                  type="checkbox"
                  name="select-role"
                  id="select-role"
                />
                <label
                  htmlFor="select-role"
                  className="flex items-center w-full h-12 py-3 pl-10 pr-3 text-sm text-gray-700 border rounded-lg cursor-pointer select-none ring-blue-400 peer-checked:ring"
                >
                  {role || "Role"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-4 text-gray-600 transition pointer-events-none right-5 top-4 peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <ul className="flex-col overflow-hidden transition-all duration-300 rounded-b-lg shadow-md select-none max-h-0 peer-checked:max-h-56 peer-checked:py-3">
                  <li
                    onClick={() => handleRoleSelect("Hero")}
                    className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Hero
                  </li>
                  <li
                    onClick={() => handleRoleSelect("User")}
                    className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    User
                  </li>

                </ul>
              </div>
            </div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute text-gray-400 left-3" />
              <input
                type="email"
                placeholder="Info@example.com"
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                name="email"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaLock className="absolute text-gray-400 left-3" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="password"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div className="relative flex items-center">
                <FaLock className="absolute text-gray-400 left-3" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Confirmpassword"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaArrowsAltV className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder="Height"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Height"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div className="relative flex items-center">
                <FaWeight className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder="Weight"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Weight"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
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
                    {birthCountry || "Birth Country"}
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute h-4 text-gray-600 transition pointer-events-none right-5 top-4 peer-checked:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <ul className="flex-col overflow-hidden transition-all duration-300 rounded-b-lg shadow-md select-none max-h-0 peer-checked:max-h-56 peer-checked:py-3">
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleBirthCountry("Country 1")}
                    >
                      Country 1
                    </li>
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleBirthCountry("Country 2")}
                    >
                      Country 2
                    </li>
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleBirthCountry("Country 3")}
                    >
                      Country 3
                    </li>
                  </ul>
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
                    {countryPlay || "Country you play with"}
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute h-4 text-gray-600 transition pointer-events-none right-5 top-4 peer-checked:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <ul className="flex-col overflow-hidden transition-all duration-300 rounded-b-lg shadow-md select-none max-h-0 peer-checked:max-h-56 peer-checked:py-3">
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleCountryPlay("Country 1")}
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                    >
                      Country 1
                    </li>
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleCountryPlay("Country 2")}
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                    >
                      Country 2
                    </li>
                    <li
                      className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={() => handleCountryPlay("Country 3")}
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                    >
                      Country 3
                    </li>
                  </ul>
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
                  {gender || "Gender"}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-4 text-gray-600 transition pointer-events-none right-5 top-4 peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <ul className="flex-col overflow-hidden transition-all duration-300 rounded-b-lg shadow-md select-none max-h-0 peer-checked:max-h-56 peer-checked:py-3">
                  <li
                    onClick={() => handleGenderSelect("Male")}
                    className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Male
                  </li>
                  <li
                    onClick={() => handleGenderSelect("Female")}
                    className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Female
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative flex items-center">
                <FaFutbol className="absolute text-gray-400 left-3" />
                <input
                  type="text"
                  placeholder="Sport"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Sport"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute text-gray-400 left-3" />
                <input
                  type="date"
                  placeholder="Birth Date"
                  className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                  name="Date"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="checkbox1" name="Accept"
                checked={Formik.values.Accept} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              <label htmlFor="checkbox1" className="text-white">
                &nbsp;I agree to the{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTermsOpen(true);
                  }}
                  className="text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text"
                >
                  Terms and Conditions
                </a>
              </label>
              <TermsModal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
              />
            </div>
            <div>
              <button
                type="button"
                className="w-full p-2 mt-5 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
                onClick={() => handleGetStarted(true)}
              >
                Get Started
              </button>
            </div>
            {/* Button for login with Google */}
            <div>
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 mt-2 font-semibold text-center bg-red-600 rounded-md"
              >
                <FaGoogle className="mr-2" />
                <p className="text-white">Register with Google</p>
              </button>
            </div>

            {/* Button for login with Twitter */}
            <div>
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 mt-2 font-semibold text-center text-gray-800 bg-blue-400 rounded-md"
              >
                <FaTwitter className="mr-2" color="white" />
                Register with Twitter
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative max-w-screen-md p-6 mx-auto space-y-3 bg-gray-800 rounded-md shadow-xl lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="mb-6 text-xl font-semibold text-white lg:text-2xl">
              Continue Registration
            </h1>
            <div className="flex flex-col">
              <div className="relative flex items-center">
                <FaImages className="absolute text-gray-400 left-3" />
                <label
                  htmlFor="images-input"
                  className="flex items-center justify-between w-full h-12 pl-10 pr-3 mt-2 text-gray-400 bg-gray-100 rounded-md cursor-pointer"
                >
                  Provide 1st image of yourself
                  <input
                    id="images-input"
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    name="FirstImage"
                    onChange={HandleFirstImage}
                  />
                  <span className="px-3 py-1 text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet">
                    Choose Files
                  </span>
                </label>
              </div>
              <div className="relative flex items-center">
                <FaImages className="absolute text-gray-400 left-3" />
                <label
                  htmlFor="images-input"
                  className="flex items-center justify-between w-full h-12 pl-10 pr-3 mt-2 text-gray-400 bg-gray-100 rounded-md cursor-pointer"
                >
                  Provide 2nd image of yourself
                  <input
                    id="images-input"
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    name="SecondImage"
                    onChange={HandleSecondImage}

                  />
                  <span className="px-3 py-1 text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet">
                    Choose Files
                  </span>
                </label>
              </div>
              <div className="relative flex items-center">
                <FaImages className="absolute text-gray-400 left-3" />
                <label
                  htmlFor="images-input"
                  className="flex items-center justify-between w-full h-12 pl-10 pr-3 mt-2 text-gray-400 bg-gray-100 rounded-md cursor-pointer"
                >
                  Provide 3rd image of yourself
                  <input
                    id="images-input"
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    name="ThirdImage"
                    onChange={HandleThirdImage}

                  />
                  <span className="px-3 py-1 text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet">
                    Choose Files
                  </span>
                </label>
              </div>
              <div className="relative flex items-center">
                <FaImages className="absolute text-gray-400 left-3" />
                <label
                  htmlFor="images-input"
                  className="flex items-center justify-between w-full h-12 pl-10 pr-3 mt-2 text-gray-400 bg-gray-100 rounded-md cursor-pointer"
                >
                  Provide 4th image of yourself
                  <input
                    id="images-input"
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    name="FourthImage"
                    onChange={HandleFourthImage}
                  />
                  <span className="px-3 py-1 text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet">
                    Choose Files
                  </span>
                </label>
              </div>
            </div>
            <label className="block mb-2 font-semibold text-white">
              Label 1
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 text-white bg-gray-700 rounded-md"
              name="Label1"
            />
            <label className="block mb-2 font-semibold text-white">
              Label 2
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 text-white bg-gray-700 rounded-md"
              name="Label1"

            />
            <label className="block mb-2 font-semibold text-white">
              Label 3
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 text-white bg-gray-700 rounded-md"
              name="Label1"
            />
            <button
              type="submit"
              className="w-full p-2 mt-5 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
            >
              Register
            </button>
            <div onClick={() => handleGetStarted(false)} style={{
              width: "100%", color: "white", display: "flex",
              height: '20px', alignItems: "center", columnGap: '10px', justifyContent: "end",
              cursor: "pointer"
            }}>{<IoArrowBack />}<span>Back</span></div>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default Signup;
