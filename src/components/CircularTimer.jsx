/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function CircularTimer({ currentTime, totalTime }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentTime / totalTime) * 100;
  const offset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="rgba(168, 197, 228, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="rgba(247, 238, 238, 0.86)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-light text-gray-700">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {Math.floor(totalTime / 60)} min
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTimer;
