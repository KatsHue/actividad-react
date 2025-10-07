import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home";
import MeditationPlayer from "./components/MeditationPlayer";
import { storage } from "./utils/storage";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [lastMeditation, setLastMeditation] = useState(null);

  useEffect(() => {
    const last = storage.getLastMeditation();
    setLastMeditation(last);
  }, []);

  const handleSelectMeditation = (meditation) => {
    setSelectedMeditation(meditation);
    setCurrentView("player");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedMeditation(null);
    const last = storage.getLastMeditation();
    setLastMeditation(last);
  };

  return (
    <div className="font-quicksand">
      <AnimatePresence mode="wait">
        {currentView === "home" ? (
          <Home
            key="home"
            onSelectMeditation={handleSelectMeditation}
            lastMeditation={lastMeditation}
          />
        ) : (
          <MeditationPlayer
            key="player"
            meditation={selectedMeditation}
            onBack={handleBackToHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
