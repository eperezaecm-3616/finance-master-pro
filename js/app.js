// app.js
import { logoutUser } from "./auth.js";
import { saveIncome, saveExpense, saveGoal } from "./firestore.js";

// ----------------------------
// Cerrar sesión
// ----------------------------
document.getElementById("logout-btn").addEventListener("click", logoutUser);

// ----------------------------
// Agregar Ingreso
// ----------------------------
document.getElementById("add-income-btn").addEventListener("click", async () => {
  const source = document.getElementById("income-source").value;
  const amount = document.getElementById("income-amount").value;
  if (source && amount) {
    await saveIncome(source, amount);
    document.getElementById("income-source").value = "";
    document.getElementById("income-amount").value = "";
  } else {
    alert("Completa todos los campos de ingreso.");
  }
});

// ----------------------------
// Agregar Gasto
// ----------------------------
document.getElementById("add-expense-btn").addEventListener("click", async () => {
  const category = document.getElementById("expense-category").value;
  const amount = document.getElementById("expense-amount").value;
  if (category && amount) {
    await saveExpense(category, amount);
    document.getElementById("expense-category").value = "";
    document.getElementById("expense-amount").value = "";
  } else {
    alert("Completa todos los campos de gasto.");
  }
});

// ----------------------------
// Agregar Meta/Ahorro
// ----------------------------
document.getElementById("add-goal-btn").addEventListener("click", async () => {
  const goalName = document.getElementById("goal-name").value;
  const targetAmount = document.getElementById("goal-amount").value;
  if (goalName && targetAmount) {
    await saveGoal(goalName, targetAmount);
    document.getElementById("goal-name").value = "";
    document.getElementById("goal-amount").value = "";
  } else {
    alert("Completa todos los campos de la meta.");
  }
});
