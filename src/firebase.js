import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBCNo1yl-kxhWLpfwbXzh1dOWULKzsg9Zc",
  authDomain: "react-authentication-f2dd4.firebaseapp.com",
  projectId: "react-authentication-f2dd4",
  storageBucket: "react-authentication-f2dd4.appspot.com",
  messagingSenderId: "187135265840",
  appId: "1:187135265840:web:6c9f4a55c2b27080e071f5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)


export  {
    db,
    auth
}