// auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Registro
export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registro exitoso!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Error al cerrar sesión");
  }
};
