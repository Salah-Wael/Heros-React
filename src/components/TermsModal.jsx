import React from "react";
import { motion } from "framer-motion";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="relative w-11/12 max-w-lg p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-xl font-bold">Terms and Conditions</h2>
        <p className="mb-4">
          Your terms and conditions content goes here. It can be as detailed as
          needed. You can add more paragraphs, links, or other relevant
          information.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default TermsModal;
