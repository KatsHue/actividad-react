export const getMeditationsList = async () => {
  try {
    const res = await fetch("http://localhost:5000/meditations");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error fetching meditations:", e);
    return [];
  }
};
