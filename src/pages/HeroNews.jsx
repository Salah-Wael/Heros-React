import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const HeroNews = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [title, setTitle] = useState("Breaking News: Hero Saves the Day!");
  const [content, setContent] = useState("Lorem ipsum dolor sit amet...");
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [selectedTags, setSelectedTags] = useState([
    "First",
    "Football",
    "Silver",
  ]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams()

  const news = {
    title,
    heroName: "Heroic Person",
    tags: selectedTags,
    img: image,
  };

  const User = JSON.parse(localStorage.getItem("User"));

  const relatedArticles = [
    "Heroism in Modern Times",
    "Top 10 Heroic Acts",
    "Adventures of a Lifetime",
  ];

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleEditSubmit = () => {
    // Handle form submission
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image:", image);
    console.log("Selected tags:", selectedTags);
    // Close modal
    closeEditModal();
  };

  const handleDeleteConfirm = () => {
    // Handle delete confirmation
    console.log("News deleted");
    closeDeleteModal();
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const GetNew = () => {
    return axios.get(`http://127.0.0.1:8000/api/news/${id}`, {
      headers: {
        Authorization: `Bearer Bearer ${User?.token}`
      }
    })
  }

  const { data, isLoading } = useQuery("Get Spefic New", GetNew)

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3 max-container padding-container">
      <motion.div
        className="p-4 bg-gray-800 rounded-lg shadow-xl lg:col-span-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="mb-4 text-2xl font-bold text-transparent bg-gradient-to-r from-cyan to-light-violet bg-clip-text">
          {data?.data.news.title}
        </h1>
        <p className="mb-2 text-gray-400">
          By: <span className="font-semibold text-white">{data?.data.news.firstName} {data?.data.news.lastName}</span>
        </p>
        <div className="mb-4">
          {data?.data.news.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 mr-2 text-sm text-gray-800 rounded-md bg-cyan"
            >
              {tag.tag}
            </span>
          ))}
        </div>
        <img src={`http://127.0.0.1:8000/assets/images/news/${data?.data.news.image}`} alt="News" className="w-full mb-4 rounded-lg" />
      </motion.div>
      <motion.div
        className="p-4 bg-gray-800 rounded-lg shadow-xl lg:col-span-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="mb-4 text-xl font-bold text-white">Related Articles</h2>
        <div className="mb-4">
          {data?.data?.relatedNews.length ? data?.data.relatedNews?.map((article, index) => (
            <p key={index} className="mb-2 text-gray-400 border-b">
              {article}
            </p>
          )) : <p className="mb-2 text-gray-400 border-b">
            No related articles
          </p>}
        </div>
        <h2 className="mt-6 mb-4 text-xl font-bold text-white">Content</h2>
        <p className="text-gray-400">
          {data?.data.news.content}
        </p>
        <h2 className="mt-6 mb-4 text-xl font-bold text-white">Comments</h2>
        <div className="mb-4">
          {comments.map((comment, index) => (
            <p key={index} className="mb-2 text-gray-400 border-b">
              {comment}
            </p>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            rows={4}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 font-semibold text-black rounded-md bg-gradient-to-r from-cyan to-light-violet"
          >
            Add Comment
          </button>
        </div>
      </motion.div>
      <div className="flex justify-center col-span-1 mt-6 space-x-4 lg:col-span-3">
        <button
          onClick={openEditModal}
          className="px-4 py-2 font-semibold text-black rounded-md bg-gradient-to-r from-cyan to-light-violet"
        >
          Edit
        </button>
        <button
          onClick={openDeleteModal}
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={closeEditModal}
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
                  {data?.data.news.tags.map((tag, index) => (
                    <label key={index} className="inline-flex items-center">
                      <span className="ml-2 text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleEditSubmit}
                  className="px-6 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
                >
                  Edit
                </button>
              </div>
            </motion.div>
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
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroNews;
