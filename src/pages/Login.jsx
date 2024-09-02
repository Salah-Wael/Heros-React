import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGoogle, FaLock, FaTwitter } from "react-icons/fa";
import ResetPasswordModal from "../components/ResetPasswordModal"; // Import the modal component
import { useFormik } from "formik";
import axios from "axios";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  const HandleLogin = async (values) => {
    await axios.post("http://127.0.0.1:8000/api/auth/login", {
      email: values.email,
      password: values.password
    }).then((res) => {
      reactLocalStorage.setObject("User", res.data.data);
      navigate("/")
    }).catch((err) => console.log(err));
  }

  const Formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: HandleLogin
  })

  const handleToggleForm = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lg:m-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {!isForgotPassword ? (
          <motion.form
            className="relative max-w-screen-md p-6 mx-auto space-y-3 bg-gray-800 rounded-md shadow-xl lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            onSubmit={Formik.handleSubmit}
          >
            <h1 className="mb-6 text-xl font-semibold text-white lg:text-2xl">
              Login
            </h1>

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
            <div className="relative flex items-center">
              <FaLock className="absolute text-gray-400 left-3" />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                name="password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 mt-5 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
              >
                Log In
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  placeholder="Remember Me"
                />
                <label
                  htmlFor=""
                  className="text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text"
                >
                  Remember me
                </label>
              </div>

              <a
                onClick={handleToggleForm}
                className="text-sm text-transparent cursor-pointer bg-gradient-to-r from-cyan to-light-violet bg-clip-text"
              >
                Forgot Password?
              </a>
            </div>
            {/* Button for login with Google */}
            <div>
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 mt-2 font-semibold text-center bg-red-600 rounded-md"
              >
                <FaGoogle className="mr-2" />
                <p className="text-white">Log In with Google</p>
              </button>
            </div>

            {/* Button for login with Twitter */}
            <div>
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 mt-2 font-semibold text-center text-gray-800 bg-blue-400 rounded-md"
              >
                <FaTwitter className="mr-2" color="white" />
                Log In with Twitter
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            className="relative max-w-screen-md p-6 mx-auto space-y-3 bg-gray-800 rounded-md shadow-xl lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="mb-6 text-xl font-semibold text-white lg:text-2xl">
              Forget Password
            </h1>
            <p className="text-white">
              Forgot your passowrd? No Problem, Just let us know your email
              address and we will email you a password reset link that will
              allow you to choose a new one!
            </p>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
              />
            </div>
            <button
              type="button"
              className="w-full p-2 mt-5 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
              onClick={handleOpenModal} // Open the modal on click
            >
              Email Password-Reset Link
            </button>
            <div className="flex justify-between mt-4">
              <a
                onClick={handleToggleForm}
                className="text-sm text-transparent cursor-pointer bg-gradient-to-r from-cyan to-light-violet bg-clip-text"
              >
                Back to Login
              </a>
            </div>
          </motion.form>
        )}
      </motion.div>
      <ResetPasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Login;
