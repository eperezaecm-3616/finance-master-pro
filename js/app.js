import {
  saveIncome,
  saveExpense,
  saveGoal,
  getUserIncomes,
  getUserExpenses,
  getUserGoals
} from "./firestore.js";

import { auth, onAuthStateChanged } from "./firebase.js";

// ======================================================
// Esperar a que el usuario inicie sesión
// ======================================================
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  console.log("Usuario autenticado:", user.email);

  // Carga inicial de datos
  loadDashboardData();
});

// ======================================================
// Función principal para cargar datos
// ======================================================
async function loadDashboardData() {
  const incomes = await getUserIncomes();
  const expenses = await getUserExpenses();
  const goals = await getUserGoals();

  updateIncomeUI(incomes);
  updateExpenseUI(expenses);
  updateGoalUI(goals);
  updateTotals(incomes, expenses);
}

// ======================================================
// Actualizar UI — Ingresos
// ======================================================
function updateIncomeUI(incomes) {
  const list = document.getElementById("income-list");
  if (!list) return;

  list.innerHTML = "";
  incomes.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.source}: $${item.amount}`;
    list.appendChild(li);
  });
}

// ======================================================
// Actualizar UI — Gastos
// ======================================================
function updateExpenseUI(expenses) {
  const list = document.getElementById("expense-list");
  if (!list) return;

  list.innerHTML = "";
  expenses.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.category}: -$${item.amount}`;
    list.appendChild(li);
  });
}

// ======================================================
// Actualizar UI — Metas
// ======================================================
function updateGoalUI(goals) {
  const list = document.getElementById("goal-list");
  if (!list) return;

  list.innerHTML = "";
  goals.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: $${item.amount}`;
    list.appendChild(li);
  });
}

// ======================================================
// Calcular totales
// ======================================================
function updateTotals(incomes, expenses) {
  const totalIncome = incomes.reduce((acc, x) => acc + x.amount, 0);
  const totalExpenses = expenses.reduce((acc, x) => acc + x.amount, 0);
  const remaining = totalIncome - totalExpenses;

  const incomeBox = document.getElementById("total-income");
  const expenseBox = document.getElementById("total-expenses");
  const remainingBox = document.getElementById("total-remaining");

  if (incomeBox) incomeBox.textContent = `$${totalIncome}`;
  if (expenseBox) expenseBox.textContent = `$${totalExpenses}`;
  if (remainingBox) remainingBox.textContent = `$${remaining}`;
}

// ======================================================
// Formularios
// ======================================================

// Ingresos
const incomeForm = document.getElementById("income-form");
if (incomeForm) {
  incomeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const source = document.getElementById("income-source").value;
    const amount = parseFloat(document.getElementById("income-amount").value);
    await saveIncome(source, amount);
    incomeForm.reset();
    loadDashboardData();
  });
}

// Gastos
const expenseForm = document.getElementById("expense-form");
if (expenseForm) {
  expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = document.getElementById("expense-category").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    await saveExpense(category, amount);
    expenseForm.reset();
    loadDashboardData();
  });
}

// Metas
const goalForm = document.getElementById("goal-form");
if (goalForm) {
  goalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("goal-name").value;
    const amount = parseFloat(document.getElementById("goal-amount").value);
    await saveGoal(name, amount);
    goalForm.reset();
    loadDashboardData();
  });
}