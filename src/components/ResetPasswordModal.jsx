import React from "react";
import { motion } from "framer-motion";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="relative max-w-md p-6 mx-auto bg-gray-800 rounded-md shadow-xl lg:p-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-6 text-xl font-semibold text-white lg:text-2xl">
          Reset Password
        </h1>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="New Password"
            className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
          />
        </div>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full h-12 pl-10 pr-3 mt-2 bg-gray-100 rounded-md"
          />
        </div>
        <button
          type="button"
          className="w-full p-2 mt-5 font-semibold text-center text-gray-800 rounded-md bg-gradient-to-r from-cyan to-light-violet"
        >
          Reset Password
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-white top-2 right-2"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ResetPasswordModal;
