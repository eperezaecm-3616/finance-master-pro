import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "./firebase.js";


// =============================================
//  REGISTRO
// =============================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registro exitoso");
      window.location.href = "dashboard.html";   // Redirigir al dashboard
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  });
}


// =============================================
//  LOGIN
// =============================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}


// =============================================
//  LOGOUT
// =============================================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}


// =============================================
//  VERIFICAR SI EL USUARIO ESTÁ LOGEADO
// =============================================
auth.onAuthStateChanged((user) => {
  if (window.location.pathname.includes("dashboard.html")) {
    if (!user) {
      window.location.href = "index.html"; // si no está logeado, regresarlo
    } else {
      document.getElementById("userEmail").textContent = user.email;
    }
  }
});