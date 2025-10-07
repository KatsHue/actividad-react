import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Meditation from "./components/Meditation";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("login");
  const [meditationDuration, setMeditationDuration] = useState(10);

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setView(currentUser ? "dashboard" : "login");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setView("dashboard");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setView("login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleStartMeditation = (duration) => {
    setMeditationDuration(duration);
    setView("meditation");
  };

  const handleCompleteMeditation = () => {
    setView("dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === "login" && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Login onLogin={handleLogin} />
        </motion.div>
      )}

      {view === "dashboard" && user && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dashboard
            user={user}
            onLogout={handleLogout}
            onStartMeditation={handleStartMeditation}
          />
        </motion.div>
      )}

      {view === "meditation" && user && (
        <motion.div
          key="meditation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Meditation
            duration={meditationDuration}
            user={user}
            onComplete={handleCompleteMeditation}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
