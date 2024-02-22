import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBf4kMvENB5VvD1l5DaJ6gVtesrZewhr64",
    authDomain: "deal-stamps.firebaseapp.com",
    projectId: "deal-stamps",
    storageBucket: "deal-stamps.appspot.com",
    messagingSenderId: "928243830570",
    appId: "1:928243830570:web:40630495e7d7549fc19853",
    measurementId: "G-MKFW91R1NM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
