/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BreathingAnimation from "./BreathingAnimation";
import CircularTimer from "./CircularTimer";
import { storage } from "../utils/storage";

function MeditationPlayer({ meditation, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const totalTime = meditation.duration * 60;

  useEffect(() => {
    if (meditation && audioRef.current) {
      audioRef.current.src = `/meditations/${meditation.audioFileName}`;
    }
  }, [meditation]);

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
    if (!isPlaying) audioRef.current.play();
    else audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    storage.setLastMeditation(meditation);
    onBack();
  };

  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    size: Math.random() * 50 + 20,
    left: Math.random() * 100 + "%",
    delay: Math.random() * 20,
    duration: Math.random() * 20 + 15,
    color: ["#c3f0d9", "#a8c5e4", "#f0d8b4", "#d8b4ff"][
      Math.floor(Math.random() * 4)
    ],
    xMove: Math.random() * 40 - 20, // movimiento horizontal
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      <div className="meditation-bg-zen" />

      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          className="bubble-zen"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            backgroundColor: bubble.color,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            transform: `translateX(0px)`,
          }}
        />
      ))}

      <BreathingAnimation isPlaying={isPlaying} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <audio ref={audioRef} />

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-light text-gray-800 mb-12 text-center"
        >
          {meditation.name}
        </motion.h2>

        <CircularTimer currentTime={currentTime} totalTime={totalTime} />

        <div className="flex gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="px-8 py-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStop}
            className="px-8 py-3 bg-white/60 backdrop-blur-sm rounded-full text-gray-600 font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            ■ Detener
          </motion.button>
        </div>

        <motion.button
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
