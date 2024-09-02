import React from "react";
import { motion } from "framer-motion";
import { FaPaypal, FaStripe, FaWallet } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";

const Support = () => {
  const supportMethods = [
    {
      name: "Paypal",
      icon: <FaPaypal size={48} className="text-blue-500" />,
    },
    {
      name: "Fawaterak",
      icon: <FaWallet size={48} className="text-green-500" />,
    },
    {
      name: "Stripe",
      icon: <FaStripe size={48} className="text-indigo-500" />,
    },
  ];
  const User = JSON.parse(localStorage.getItem("User"));

  const Support = async (values) => {
    await axios.post("http://127.0.0.1:8000/api/support", {
      currency: values.currency,
      support: values.support
    }, {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    }).then((res) => console.log(res))
  }

  const Formik = useFormik({
    initialValues: {
      currency: "",
      support: ""
    }, onSubmit: Support
  })



  return (
    <motion.div
      className="flex flex-col items-center mt-[96px] max-container padding-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="mb-8 text-3xl font-bold text-center gradiant"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Support your favourite Hero!
      </motion.h1>
      <input
        type="text"
        placeholder="Search for your hero that you want to support"
        className="w-full max-w-md px-4 py-2 text-gray-700 bg-[#F0FFFF] border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-gray-300 my-5"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {supportMethods.map((method, index) => (
          <motion.form
            key={method.name}
            className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onSubmit={Formik.handleSubmit}
          >
            {method.icon}
            {method.name === "Stripe" && (
              <div className="flex w-full mt-4 space-x-4">
                <select name='currency' onChange={Formik.handleChange} onBlur={Formik.handleBlur} className="w-1/3 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="USD" defaultChecked>USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  name='support' onChange={Formik.handleChange} onBlur={Formik.handleBlur}
                  className="w-2/3 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <button type="submit" className="px-4 py-2 mt-4 font-semibold text-gray-800 rounded-lg bg-gradient-to-r from-cyan to-light-violet">
              Support with {method.name}
            </button>
          </motion.form>
        ))}
      </div>
    </motion.div>
  );
};

export default Support;
