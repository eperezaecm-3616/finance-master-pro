// auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Registro exitoso");
      window.location.reload();
    })
    .catch(error => alert(error.message));
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      window.location.reload();
    })
    .catch(error => alert(error.message));
};

export const logoutUser = () => {
  signOut(auth)
    .then(() => window.location.reload())
    .catch(error => alert(error.message));
};
