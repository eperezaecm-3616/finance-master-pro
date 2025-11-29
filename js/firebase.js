// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

// Configuración de tu Firebase (usa tu API Key y datos reales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "financemaster-pr0.firebaseapp.com",
  projectId: "financemaster-pr0",
  storageBucket: "financemaster-pr0.appspot.com",
  messagingSenderId: "535862107904",
  appId: "1:535862107904:web:5cc701b94d1084091ddde5",
  measurementId: "G-8MFS6YS282"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
