import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ----------------------------
// Registro
// ----------------------------
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user.email);
    alert("Registro exitoso. Inicia sesión.");
    registerForm.reset();
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
});

// ----------------------------
// Login
// ----------------------------
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario logueado:", userCredential.user.email);
    window.location.href = "dashboard.html"; // Redirige al dashboard
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
});

// ----------------------------
// Cerrar sesión
// ----------------------------
export const logoutUser = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
