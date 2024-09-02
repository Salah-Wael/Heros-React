import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

const AddNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const User = JSON.parse(localStorage.getItem("User"));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async () => {
    console.log(selectedTags);
    // Handle form submission
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image:", image);
    console.log("Selected tags:", selectedTags);
    // Reset form fields
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedTags([]);

    const SubmitNew = new FormData();
    SubmitNew.append("title", title);
    SubmitNew.append("content", content);
    SubmitNew.append("image", image);

    for (let i = 0; i < selectedTags.length; i++) {
      SubmitNew.append(`tags[${i}]`, selectedTags[i]);
    }
    // Close modal
    await axios.post(`http://127.0.0.1:8000/api/news/store`, SubmitNew, {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }

    }).then((res) => console.log(res)).catch((err) => console.log(err))
    closeModal();
  };

  const handleReset = () => {
    // Reset form fields
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedTags([]);
  };


  return (
    <div className="fixed bottom-0 z-10 md:bottom-8 right-8 md:right-8">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          className="px-2 py-2 text-white duration-200 rounded-full shadow bg-gradient-to-r from-teal-300 to-purple-600 hover:opacity-80"
          onClick={openModal}
        >
          <FaPlus size={24} />
        </button>
        <AnimatePresence>
          {showTooltip && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 w-40 px-4 py-2 text-sm text-white transform -translate-x-full bg-gray-800 rounded-lg pointer-events-none -top-3 right-5"
            >
              Add your news here
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={closeModal}
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
                onClick={closeModal}
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
                  value={title}
                  onChange={handleTitleChange}
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
                  value={content}
                  onChange={handleContentChange}
                  rows={4}
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
                  onChange={handleImageChange}
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
                    "First",
                    "Second",
                    "Third",
                  ].map((tag) => (
                    <label key={tag} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="w-5 h-5 border border-gray-300 rounded-md appearance-none checked:bg-gray-800 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800"
                      />
                      <span className="ml-2 text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
                >
                  Create
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 ml-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNews;
