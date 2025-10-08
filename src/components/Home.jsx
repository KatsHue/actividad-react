/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMeditationsList } from "../services/apiService";

function Home({ onSelectMeditation, lastMeditation }) {
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    const fetchMeditations = async () => {
      const list = await getMeditationsList();
      setMeditations(list);
    };
    fetchMeditations();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-satori-beige to-satori-green/20 p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-light text-gray-800 mb-2 tracking-wide">
            Satori
          </h1>
          <p className="text-xl text-gray-600 font-light">悟り</p>
          <p className="text-sm text-gray-500 mt-2">
            Encuentra tu paz interior - App de Meditación
          </p>
        </motion.div>

        {lastMeditation && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg"
          >
            <p className="text-sm text-gray-600 mb-1">Última meditación</p>
            <p className="text-lg font-medium text-gray-800">
              {lastMeditation.name} • {lastMeditation.duration} min
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          {meditations.map((meditation, index) => (
            <motion.div
              key={meditation.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => onSelectMeditation(meditation)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-1">
                    {meditation.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Duración: {meditation.duration} minutos
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-satori-blue/80 text-white rounded-full font-medium hover:bg-satori-blue transition-colors"
                >
                  Reproducir
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>Respira • Relájate • Descubre</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
