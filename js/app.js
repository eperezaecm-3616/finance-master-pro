import { auth } from "./firebase.js";
import { saveExpense, loadExpenses } from "./firestore.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "dashboard.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// REGISTRO
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = regEmail.value;
    const password = regPassword.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cuenta creada. Ahora inicia sesión.");
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// CERRAR SESIÓN
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

// AGREGAR GASTO
document.getElementById("addExpenseForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = expCategory.value;
    const amount = Number(expAmount.value);

    await saveExpense(category, amount);
    alert("Gasto guardado");

    loadDashboard();
});

// CARGAR GASTOS
async function loadDashboard() {
    const data = await loadExpenses();
    const list = document.getElementById("expenseList");

    if (!list) return;
    list.innerHTML = "";

    data.forEach((g) => {
        const item = document.createElement("li");
        item.textContent = `${g.category}: $${g.amount}`;
        list.appendChild(item);
    });
}

if (window.location.pathname.includes("dashboard.html")) {
    setTimeout(loadDashboard, 800);
}