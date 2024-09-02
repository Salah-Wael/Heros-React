import { CARDS } from "../../constants/index";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const NewsCard = ({ setWarning, Data, SetData }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [Id, setId] = useState(null); // Initialize Id with null

  const User = JSON.parse(localStorage.getItem("User"));

  const [UserId, setUserId] = useState(null)

  const GetAllNews = () => {
    return axios.get("http://127.0.0.1:8000/api/news", {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    });
  };

  const { isLoading, refetch } = useQuery("Get All News", GetAllNews, {
    cacheTime: 3000000,
    onSuccess: (data) => {
      SetData(data?.data?.news);
    }
  });

  const DeleteNew = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/news/${id}/delete`, {
        headers: {
          Authorization: `Bearer Bearer ${User?.token}`
        }
      })
      .then((res) => {
        console.log(res);
        refetch()
      });
  };

  const openEditModal = (id, User_Id) => {
    console.log(User_Id);
    setId(id); // Set the Id state
    setUserId(User_Id)
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };


  const HandleDeleteNew = async (Id) => {
    if (User?.id === UserId) {
      await DeleteNew(Id);
      closeDeleteModal();
      setWarning(false)
    } else {
      closeDeleteModal();
      setWarning("Sorry You can't update of delete any another hero new")
    }

  };

  const OpenDeleteModal = (id, User_Id) => {
    setId(id); // Set the Id state
    setUserId(User_Id)
    setIsDeleteOpen(true); // Open the delete modal
  };

  const UpdateNew = async (id, title, content) => {
    console.log(title, content);
    await axios.put(`http://127.0.0.1:8000/api/news/${id}`, {
      title: title,
      content: content
    }, {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    })
      .then((res) => {
        console.log(res);
        refetch();
      });
  }

  const HandleUpdateNew = async (Id, title, content) => {
    if (User?.id === UserId) {
      await UpdateNew(Id, title, content);
      closeEditModal();
      setWarning(false)
    } else {
      closeEditModal();
      setWarning("Sorry You can't update of delete any another hero new")
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const Formik = useFormik({
    initialValues: {
      Title: "",
      Content: "",
      Img: "",
    }, onSubmit: async (values) => {
      console.log(values);
      await HandleUpdateNew(Id, values.Title, values.Content);
    }
  })

  return (
    <>
      <div className="grid gap-3 px-3 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading || !Data ? (
          'Loading...'
        ) : (
          Data?.map((card, index) => (
            <div
              className="flex flex-col p-4 mb-4 bg-gray-800 rounded-lg shadow-xl"
              key={index}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text">
                    By:{" "}
                    <span className="text-xl font-semibold text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text">
                      {card.firstName} {card.lastName}
                    </span>
                  </p>
                  <p className="gradiant">
                    Created at:
                    <span className="text-xl font-semibold">
                      {card.created_at?.slice(0, 10)}
                    </span>
                  </p>
                  <p className="gradiant">Tags:</p>
                  <div className="flex gap-2 text-sm" style={{ marginTop: '10px' }}>
                    {card.tags.map((tag, index) => (
                      <p key={index} className="px-2 text-gray-800 rounded-md bg-cyan">
                        {tag.tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <h2 className="mb-2 text-xl font-bold gradiant">{card.title}</h2>
              <img
                style={{ width: '100%', height: "400px", objectFit: "cover" }}
                src={`http://127.0.0.1:8000/assets/images/news/${card.image}`}
                alt="News Image"
                className="mb-2"
              />
              <p className="text-white">{card.content.length > 20 ? card.content.slice(0, 19) + "..." : card.content}</p>
              <div className="flex space-x-2">
                <Link to={`/hero_news/${card.id}`} className="px-3 py-1 font-semibold text-black rounded-md bg-gradient-to-r from-cyan to-light-violet">
                  Read
                </Link>
                <button
                  className="px-3 py-1 text-white duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none"
                  onClick={() => openEditModal(card.id, card.user_id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-white duration-200 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={() => OpenDeleteModal(card.id, card.user_id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

        <AnimatePresence>
          {isEditOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
              onClick={closeEditModal}
              onSubmit={Formik.handleSubmit}
            >
              <motion.form
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg p-8 bg-white rounded-lg md:max-w-xl md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute text-gray-500 duration-200 bg-transparent border-none cursor-pointer top-2 right-2 hover:text-gray-700"
                  onClick={closeEditModal}
                >
                  <FaTimes size={24} />
                </button>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="Title"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-800 border border-#DF63FF"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="content"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Content:
                  </label>
                  <textarea
                    id="content"
                    rows={4}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="Content"
                    className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-800 border border-#DF63FF"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-lg font-semibold">
                    Image:
                  </label>
                  <label
                    htmlFor="image"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-800 rounded-md cursor-pointer focus:outline-none"
                  >
                    Choose file
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-semibold">
                    Tags:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Bronze",
                      "Silver",
                      "Gold",
                      "Football",
                      "Volleyball",
                      "First",
                      "Second",
                      "Third",
                    ].map((tag) => (
                      <label key={tag} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border border-gray-300 rounded-md appearance-none checked:bg-gray-800 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800"
                          name="tags"
                          value={tag}
                        />
                        <span className="ml-2 text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2 text-white bg-gray-800 rounded-md focus:outline-none">
                    Edit
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDeleteOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
              onClick={closeDeleteModal}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg p-8 bg-white rounded-lg md:max-w-xl md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute text-gray-500 duration-200 bg-transparent border-none cursor-pointer top-2 right-2 hover:text-gray-700"
                  onClick={closeDeleteModal}
                >
                  <FaTimes size={24} />
                </button>
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                  Are you sure you want to delete this News?
                </h2>
                <div className="flex justify-end">
                  <button onClick={() => HandleDeleteNew(Id)} className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NewsCard;
