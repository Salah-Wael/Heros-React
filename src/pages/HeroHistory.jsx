import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";

const HeroHistory = () => {
  const [history, setHistory] = useState([
    {
      id: "22",
      name: "John Doe",
      gender: "Male",
      age: 23,
      height: "170.00",
      weight: "60.00",
      team: "China",
      noc: "CHN",
      games: "2012 Summer",
      year: 2012,
      games_type: "Summer",
      host_city: "London",
      sport: "Judo",
      event: "Judo Men's Extra-Lightweight",
      medal: "NA",
    },
    // Add more fake data here...
  ]);
  const User = JSON.parse(localStorage.getItem("User"));

  const [filters, setFilters] = useState({
    name: "",
    sport: "",
    gender: "",
    team: "",
  });

  const columns = [
    "ID",
    "NAME",
    "GENDER",
    "AGE",
    "HEIGHT",
    "WEIGHT",
    "TEAM",
    "NOC",
    "GAMES",
    "YEAR",
    "GAMES TYPE",
    "HOST CITY",
    "SPORT",
    "EVENT",
    "MEDAL",
  ];

  const filteredHistory = history.filter((record) => {
    return (
      record?.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      record?.sport?.toLowerCase().includes(filters.sport.toLowerCase()) &&
      record?.gender?.toLowerCase().includes(filters.gender.toLowerCase()) &&
      record?.team?.toLowerCase().includes(filters.team.toLowerCase())
    );
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const GetHeros = () => {
    return axios.get("http://127.0.0.1:8000/api/olympics-history", {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    })
  }
  const { data } = useQuery("Get Heros", GetHeros, {
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
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="sport"
          placeholder="Filter by Sport"
          value={filters.sport}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="gender"
          placeholder="Filter by Gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="team"
          placeholder="Filter by Team"
          value={filters.team}
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
            {data?.data.olympics.map((record, index) => (
              <tr key={index} className="text-gray-400">
                <td className="px-4 py-2">{record.teams}</td>
                <td className="px-4 py-2">{record.athletes}</td>
                <td className="px-4 py-2">{record.games}</td>
                <td className="px-4 py-2">{record.year}</td>
                <td className="px-4 py-2">{record.games_type}</td>
                <td className="px-4 py-2">{record.host_city}</td>
                <td className="px-4 py-2">{record.host_country}</td>
                <td className="px-4 py-2">{record.sport}</td>
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

export default HeroHistory;
