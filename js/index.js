import {
  auth,
  loginUser,
  registerUser,
  logoutUser,
  onAuthStateChanged
} from "./firebase.js";


// ======================================================
//  MANEJO DE SESIÓN AUTOMÁTICO
// ======================================================

// Si el usuario ya está logueado y visita index.html → enviar a dashboard
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;

  if (user) {
    console.log("Usuario activo:", user.email);

    if (currentPage.includes("index.html") || currentPage === "/") {
      window.location.href = "./dashboard.html";
    }
  } else {
    console.log("Ningún usuario activo");

    if (currentPage.includes("dashboard.html")) {
      window.location.href = "./index.html";
    }
  }
});


// ======================================================
//  INICIO DE SESIÓN
// ======================================================

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      await loginUser(email, password);
      window.location.href = "./dashboard.html";
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}


// ======================================================
//  REGISTRO DE USUARIO
// ======================================================

const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    try {
      await registerUser(email, password);
      alert("Registro exitoso. Ahora inicia sesión.");

      window.location.href = "./index.html";
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  });
}


// ======================================================
//  LOGOUT
// ======================================================

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = "./index.html";
  });
}