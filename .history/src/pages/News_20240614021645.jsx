import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import { motion } from "framer-motion";
import axios from "axios";
import { useFormik } from "formik";

const News = () => {
  const [Warning, setWarning] = useState(false);
  const User = JSON.parse(localStorage.getItem("User"));
  const [Data, setData] = useState();

  const Search = async (values) => {
    console.log(values);
    await axios.get(`http://127.0.0.1:8000/api/news/search`,
      {
        params: {
          search: values.Search
        },
        headers: {
          Authorization: `Bearer Bearer ${User?.token}`
        }
      }
    ).then((res) => {
      setData(res.data.news)
      console.log(res);
    })
  }

  const Formik = useFormik({
    initialValues: {
      Search: ''
    }, onSubmit: Search
  })


  return (
    <motion.div
      className="mt-[96px] max-container padding-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <form className="flex justify-center mb-8" onSubmit={Formik.handleSubmit}>
        <input
          type="text"
          placeholder="Search news..."
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          name="Search"
          className="w-full max-w-md px-4 py-2 text-gray-700 bg-[#F0FFFF] border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-gray-300"
        />
        <button
          type="submit"
          placeholder="Search news..."
          style={{ width: "100px", marginLeft: "20px", cursor: 'pointer' }}
          className="w-full max-w-md px-4 py-2 text-gray-700 bg-[#F0FFFF] border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-gray-300"
        >Search</button>
      </form>
      {Warning &&
        <p style={{ width: "100%", display: "flex", justifyContent: 'center', margin: "20px 0", color: 'white', fontSize: "30px" }}>
          {Warning}</p>}
      <NewsCard setWarning={setWarning} SetData={setData} Data={Data} />
    </motion.div>
  );
};

export default News;
