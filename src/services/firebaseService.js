import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const getMeditationAudioUrl = async (audioFileName) => {
  try {
    const audioRef = ref(storage, `meditations/${audioFileName}`);
    const url = await getDownloadURL(audioRef);
    return url;
  } catch (error) {
    console.error("Error obteniendo audio:", error);
    return null;
  }
};
