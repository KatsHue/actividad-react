import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3dIz3v-_RtjHpo7XfHoShKTEXMt08aVw",
  authDomain: "satori-app-dce6f.firebaseapp.com",
  projectId: "satori-app-dce6f",
  storageBucket: "satori-app-dce6f.firebasestorage.app",
  messagingSenderId: "368237897381",
  appId: "1:368237897381:web:fab740db88088dabffcf4c",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
