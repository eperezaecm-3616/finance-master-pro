import { registerUser, loginUser, logoutUser } from "./auth.js";
import { saveIncome, getUserIncomes, saveExpense, getUserExpenses, saveGoal, getUserGoals } from "./firestore.js";
import { auth } from "./firebase.js";

// Auth - index.html
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    loginUser(emailInput.value, passwordInput.value);
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    registerUser(emailInput.value, passwordInput.value);
  });
}

// Logout - dashboard.html
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

// Dashboard funcionalidad
const agregarIngresoBtn = document.getElementById("agregar-ingreso-btn");
const agregarGastoBtn = document.getElementById("agregar-gasto-btn");
const agregarMetaBtn = document.getElementById("agregar-meta-btn");

if (agregarIngresoBtn) {
  agregarIngresoBtn.addEventListener("click", async () => {
    const fuente = document.getElementById("fuente-ingreso").value;
    const cantidad = document.getElementById("cantidad-ingreso").value;
    await saveIncome(fuente, cantidad);
    alert("Ingreso agregado");
    location.reload();
  });
}

if (agregarGastoBtn) {
  agregarGastoBtn.addEventListener("click", async () => {
    const categoria = document.getElementById("categoria-gasto").value;
    const cantidad = document.getElementById("cantidad-gasto").value;
    await saveExpense(categoria, cantidad);
    alert("Gasto agregado");
    location.reload();
  });
}

if (agregarMetaBtn) {
  agregarMetaBtn.addEventListener("click", async () => {
    const nombre = document.getElementById("nombre-meta").value;
    const monto = document.getElementById("monto-meta").value;
    await saveGoal(nombre, monto);
    alert("Meta agregada");
    location.reload();
  });
}
