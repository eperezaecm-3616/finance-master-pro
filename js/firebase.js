// Importar SDKs desde Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2nO5sFxNy_-Usg29Xvk1A676Nt-lhw",
    authDomain: "financemaster-pr0.firebaseapp.com",
    projectId: "financemaster-pr0",
    storageBucket: "financemaster-pr0.firebasestorage.app",
    messagingSenderId: "535862107904",
    appId: "1:535862107904:web:5cc701b94d1084091ddde5",
    measurementId: "G-8MFS6YS282"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Verificar usuario logueado
onAuthStateChanged(auth, user => {
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
    }
});