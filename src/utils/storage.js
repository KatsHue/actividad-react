export const storage = {
  getLastMeditation: () => {
    const data = localStorage.getItem("lastMeditation");
    return data ? JSON.parse(data) : null;
  },

  setLastMeditation: (meditation) => {
    localStorage.setItem("lastMeditation", JSON.stringify(meditation));
  },
};
