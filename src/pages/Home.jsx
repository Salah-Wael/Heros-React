import React from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ReactPlayer
        url="https://cdn.pixabay.com/vimeo/764028514/Sunset%20Beach%20-%209739.mp4?width=1280&hash=44e54c3efc5a4849373eb4d43b1e776a16af4c9e" // Replace with your preferred video URL
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        style={{ objectFit: "cover", zIndex: 1 }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <motion.h1
          className="text-6xl font-extrabold text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          HEROS
        </motion.h1>
        <motion.h2
          className="mt-4 text-4xl font-semibold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 1,
            ease: "easeOut",
            staggerChildren: 0.1,
          }}
        >
          {"WE ARE HERE".split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </div>
  );
};

export default Home;
