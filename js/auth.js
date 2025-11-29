// =========================
// AUTH.JS - Registro y Login
// =========================

// Importar funciones de Firebase
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

import { app } from "./firebase.js";

// Inicializar Auth
const auth = getAuth(app);

// ================================
// REGISTRO DE USUARIO
// ================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Cuenta creada exitosamente.");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
                console.log(error);
            });
    });
}

// ================================
// LOGIN DE USUARIO
// ================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
                console.error(error);
            });
    });
}

// ================================
// VERIFICAR SI EL USUARIO ESTÁ LOGEADO
// ================================
if (window.location.pathname.includes("dashboard.html")) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "index.html";
        }
    });
}

// ================================
// CERRAR SESIÓN
// ================================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });
}

export { auth };