export const storage = {
  getLastMeditation: () => {
    try {
      const data = localStorage.getItem("lastMeditation");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setLastMeditation: (meditation) => {
    try {
      localStorage.setItem("lastMeditation", JSON.stringify(meditation));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  },
};
