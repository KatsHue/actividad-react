/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function BreathingAnimation({ isPlaying }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-br from-satori-lavender/30 to-satori-blue/30 blur-3xl"
        animate={
          isPlaying
            ? {
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }
            : {
                scale: 1,
                opacity: 0.2,
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-satori-green/20 to-satori-blue/20 blur-2xl"
        animate={
          isPlaying
            ? {
                scale: [1.2, 0.8, 1.2],
                opacity: [0.2, 0.5, 0.2],
              }
            : {
                scale: 1,
                opacity: 0.1,
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

export default BreathingAnimation;
