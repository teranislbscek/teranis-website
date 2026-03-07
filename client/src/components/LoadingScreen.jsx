import React from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black text-white">
      {/* Animated Text */}
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-cyan-400 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Teranis 2K25
      </motion.h1>

      {/* Slowed-down Loader */}
      {/* <ClipLoader size={50} color={"#00bcd4"} loading={true} speedMultiplier={0.5} /> */}
    </div>
  );
};

export default LoadingScreen;
