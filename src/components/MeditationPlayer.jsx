/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BreathingAnimation from "./BreathingAnimation";
import CircularTimer from "./CircularTimer";
import { storage } from "../utils/storage";
/* eslint-disable no-unused-vars */

function MeditationPlayer({ meditation, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const totalTime = meditation.duration * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < totalTime) {
        setCurrentTime((prev) => prev + 1);
      } else if (currentTime >= totalTime) {
        handleStop();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    storage.setLastMeditation(meditation);
    onBack();
  };

  return (
    <motion.div /* ← AQUÍ USA motion */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative bg-gradient-to-br from-satori-beige via-satori-lavender/20 to-satori-blue/30"
    >
      <BreathingAnimation isPlaying={isPlaying} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.h2 /* ← AQUÍ USA motion */
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-light text-gray-800 mb-12 text-center"
        >
          {meditation.name}
        </motion.h2>

        <CircularTimer currentTime={currentTime} totalTime={totalTime} />

        <div className="flex gap-4 mt-12">
          <motion.button /* ← AQUÍ USA motion */
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="px-8 py-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
          </motion.button>

          <motion.button /* ← AQUÍ USA motion */
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStop}
            className="px-8 py-3 bg-white/60 backdrop-blur-sm rounded-full text-gray-600 font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            ■ Detener
          </motion.button>
        </div>

        <motion.button /* ← AQUÍ USA motion */
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mt-8 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Volver al inicio
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MeditationPlayer;
