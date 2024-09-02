import React, { useState } from "react";
import { motion } from "framer-motion";

const ImageModal = ({ images, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="p-4 bg-white rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`request-img-${idx}`}
            className="w-full h-auto"
          />
        ))}
      </div>
      <button
        onClick={onClose}
        className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
);

const HeroRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      shortName: "JD",
      height: "180 cm",
      weight: "75 kg",
      sport: "Football",
      originCountry: "USA",
      playCountry: "UK",
      birthDate: "1990-01-01",
      gender: "Male",
      auth_id: "12345",
      images: [
        "https://dummyimage.com/100x100",
        "https://dummyimage.com/100x100",
        "https://dummyimage.com/100x100",
        "https://dummyimage.com/100x100",
      ],
    },
    // Add more fake data here...
  ]);

  const [archivedRequests, setArchivedRequests] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [modalImages, setModalImages] = useState(null);

  const handleAccept = (id) => {
    console.log("Accepted request ID:", id);
  };

  const handleRefuse = (id) => {
    console.log("Refused request ID:", id);
  };

  const handleArchive = (id) => {
    const requestToArchive = requests.find((req) => req.id === id);
    setArchivedRequests([...archivedRequests, requestToArchive]);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleUnarchive = (id) => {
    const requestToUnarchive = archivedRequests.find((req) => req.id === id);
    setRequests([...requests, requestToUnarchive]);
    setArchivedRequests(archivedRequests.filter((req) => req.id !== id));
  };

  const toggleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  const showModal = (images) => {
    setModalImages(images);
  };

  const closeModal = () => {
    setModalImages(null);
  };

  const columns = [
    "ID",
    "FIRST NAME",
    "LAST NAME",
    "FULL NAME",
    "SHORT NAME",
    "HEIGHT",
    "WEIGHT",
    "SPORT",
    "ORIGIN COUNTRY",
    "PLAY COUNTRY",
    "BIRTH DATE",
    "GENDER",
    "AUTH ID",
    "IMAGES",
    "ACTIONS",
  ];

  const tableData = showArchived ? archivedRequests : requests;

  return (
    <div className="p-6 max-container padding-container">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleShowArchived}
          className="px-4 py-2 font-semibold text-black rounded-md bg-gradient-to-r from-cyan to-light-violet"
        >
          {showArchived ? "Show Active Requests" : "Show Archived Requests"}
        </button>
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
            {tableData.map((request) => (
              <tr key={request.id} className="text-gray-400">
                <td className="px-4 py-2">{request.id}</td>
                <td className="px-4 py-2">{request.firstName}</td>
                <td className="px-4 py-2">{request.lastName}</td>
                <td className="px-4 py-2">{request.fullName}</td>
                <td className="px-4 py-2">{request.shortName}</td>
                <td className="px-4 py-2">{request.height}</td>
                <td className="px-4 py-2">{request.weight}</td>
                <td className="px-4 py-2">{request.sport}</td>
                <td className="px-4 py-2">{request.originCountry}</td>
                <td className="px-4 py-2">{request.playCountry}</td>
                <td className="px-4 py-2">{request.birthDate}</td>
                <td className="px-4 py-2">{request.gender}</td>
                <td className="px-4 py-2">{request.auth_id}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => showModal(request.images)}
                    className="px-2 py-1 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Show
                  </button>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-around space-x-2">
                    {showArchived ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRefuse(request.id)}
                          className="px-2 py-1 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          Refuse
                        </button>
                        <button
                          onClick={() => handleUnarchive(request.id)}
                          className="px-2 py-1 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                          Unarchive
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="px-2 py-1 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRefuse(request.id)}
                          className="px-2 py-1 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          Refuse
                        </button>
                        <button
                          onClick={() => handleArchive(request.id)}
                          className="px-2 py-1 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                          Archive
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {modalImages && <ImageModal images={modalImages} onClose={closeModal} />}
    </div>
  );
};

export default HeroRequests;
