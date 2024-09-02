import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";

const OlympicHistory = () => {
  const [history, setHistory] = useState([
    {
      year: "2020",
      gamesType: "Summer",
      hostCountry: "Japan",
      hostCity: "Tokyo",
      athletes: 11325,
      teams: 206,
      competitions: 339,
      country: "USA",
      gold: 39,
      silver: 41,
      bronze: 33,
    },
    // Add more fake data here...
  ]);
  const User = JSON.parse(localStorage.getItem("User"));

  const [filters, setFilters] = useState({
    year: "",
    gamesType: "",
    hostCountry: "",
    hostCity: "",
  });

  const columns = [
    "YEAR",
    "GAMES TYPE",
    "HOST COUNTRY",
    "HOST CITY",
    "ATHLETES",
    "TEAMS",
    "COMPETITIONS",
    "COUNTRY",
    "GOLD",
    "SILVER",
    "BRONZE",
  ];

  // const filteredHistory = history.filter((record) => {
  //   return (
  //     record?.year.includes(filters.year) &&
  //     record?.gamesType
  //       .toLowerCase()
  //       .includes(filters.gamesType.toLowerCase()) &&
  //     record?.hostCountry
  //       .toLowerCase()
  //       .includes(filters.hostCountry.toLowerCase()) &&
  //     record?.hostCity.toLowerCase().includes(filters.hostCity.toLowerCase())
  //   );
  // });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };


  const GetAllOlympics = () => {
    return axios.get("http://127.0.0.1:8000/api/olympics-history", {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    })
  }
  const { data, isLoading } = useQuery("Get Olympics", GetAllOlympics, {
    cacheTime: 3000000,
    onSuccess: (data) => {
      setHistory(data?.data?.olympics)
    }
  })

  return (
    <div className="p-6 max-container padding-container">
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          name="year"
          placeholder="Filter by Year"
          value={filters.year}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="gamesType"
          placeholder="Filter by Games Type"
          value={filters.gamesType}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="hostCountry"
          placeholder="Filter by Host Country"
          value={filters.hostCountry}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="hostCity"
          placeholder="Filter by Host City"
          value={filters.hostCity}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <motion.div
        className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-white">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 bg-gray-900">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.olympics.map((record, index) => (
              <tr key={index} className="text-gray-400">
                <td className="px-4 py-2">{record.year}</td>
                <td className="px-4 py-2">{record.games_type}</td>
                <td className="px-4 py-2">{record.host_country}</td>
                <td className="px-4 py-2">{record.host_city}</td>
                <td className="px-4 py-2">{record.athletes}</td>
                <td className="px-4 py-2">{record.teams}</td>
                <td className="px-4 py-2">{record.competitions}</td>
                <td className="px-4 py-2">{record.country}</td>
                <td className="px-4 py-2">{record.gold}</td>
                <td className="px-4 py-2">{record.silver}</td>
                <td className="px-4 py-2">{record.bronze}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default OlympicHistory;
