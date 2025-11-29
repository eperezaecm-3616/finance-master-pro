// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2nO5sFxNy_-Usg29WcXvk1A676Nt-lhw",
  authDomain: "financemaster-pr0.firebaseapp.com",
  projectId: "financemaster-pr0",
  storageBucket: "financemaster-pr0.firebasestorage.app",
  messagingSenderId: "535862107904",
  appId: "1:535862107904:web:5cc701b94d1084091ddde5",
  measurementId: "G-8MFS6YS282"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db };
