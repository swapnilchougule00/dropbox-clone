import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo1cmY51SI-KpgxAzHNXsVSLUmtHigP9I",
  authDomain: "dropbox-clone-f6f03.firebaseapp.com",
  projectId: "dropbox-clone-f6f03",
  storageBucket: "dropbox-clone-f6f03.appspot.com",
  messagingSenderId: "289759111496",
  appId: "1:289759111496:web:9d2b3124855e3a64a4ab7d",
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage};
