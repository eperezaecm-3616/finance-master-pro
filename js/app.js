// app.js
import { auth } from "./firebase.js";
import { logoutUser } from "./auth.js";
import { saveIncome, getUserIncomes, saveExpense, getUserExpenses, saveGoal, getUserGoals } from "./firestore.js";

// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", logoutUser);

// Botones Dashboard
document.getElementById("add-income-btn").addEventListener("click", async () => {
  const source = document.getElementById("income-source").value;
  const amount = document.getElementById("income-amount").value;
  if(source && amount) await saveIncome(source, amount);
  loadIncomes();
});

document.getElementById("add-expense-btn").addEventListener("click", async () => {
  const category = document.getElementById("expense-category").value;
  const amount = document.getElementById("expense-amount").value;
  if(category && amount) await saveExpense(category, amount);
  loadExpenses();
});

document.getElementById("add-goal-btn").addEventListener("click", async () => {
  const name = document.getElementById("goal-name").value;
  const amount = document.getElementById("goal-amount").value;
  if(name && amount) await saveGoal(name, amount);
  loadGoals();
});

// Cargar datos
auth.onAuthStateChanged(async (user) => {
  if(user) {
    loadIncomes();
    loadExpenses();
    loadGoals();
  }
});

// Funciones de carga
async function loadIncomes() {
  const list = document.getElementById("income-list");
  list.innerHTML = "";
  const incomes = await getUserIncomes();
  incomes.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.source}: $${i.amount}`;
    list.appendChild(li);
  });
}

async function loadExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  const expenses = await getUserExpenses();
  expenses.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.category}: $${e.amount}`;
    list.appendChild(li);
  });
}

async function loadGoals() {
  const list = document.getElementById("goal-list");
  list.innerHTML = "";
  const goals = await getUserGoals();
  goals.forEach(g => {
    const li = document.createElement("li");
    li.textContent = `${g.name}: $${g.amount}`;
    list.appendChild(li);
  });
}
