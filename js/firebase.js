// =======================================
//  Configuración Firebase (tu proyecto)
// =======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// === TU CONFIGURACIÓN (copiada correctamente) ===
const firebaseConfig = {
  apiKey: "AIzaSyB2nO5sFxNy_-Usg29WcXvk1A676Nt-lhw",
  authDomain: "financemaster-pr0.firebaseapp.com",
  projectId: "financemaster-pr0",
  storageBucket: "financemaster-pr0.firebasestorage.app",
  messagingSenderId: "535862107904",
  appId: "1:535862107904:web:5cc701b94d1084091ddde5",
  measurementId: "G-8MFS6YS282"
};


// === Inicializar Firebase ===
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Exportar funciones Firebase para usarlas en otros archivos
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  getDocs,
  query,
  where
};