import { auth } from "./firebase.js";
import { logoutUser } from "./auth.js";
import { saveIncome, getUserIncomes, saveExpense, getUserExpenses, saveGoal, getUserGoals } from "./firestore.js";

// ----------------------------
// Cerrar sesión
// ----------------------------
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logoutUser);

// ===========================
// INICIO Y ACTUALIZACIÓN DE DASHBOARD
// ===========================
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  await updateDashboard();
});

// ===========================
// FUNCIONES DE ACTUALIZACIÓN
// ===========================
async function updateDashboard() {
  await renderIncomes();
  await renderExpenses();
  await renderGoals();
  updateSummary();
}

// ----------------------------
// INGRESOS
// ----------------------------
const incomeForm = document.getElementById("income-form");
incomeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const source = document.getElementById("income-source").value;
  const amount = parseFloat(document.getElementById("income-amount").value);
  if (!source || isNaN(amount)) return;

  await saveIncome(source, amount);
  incomeForm.reset();
  await renderIncomes();
  updateSummary();
});

async function renderIncomes() {
  const incomes = await getUserIncomes();
  const incomeList = document.getElementById("income-list");
  incomeList.innerHTML = "";
  incomes.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.source}: $${i.amount}`;
    incomeList.appendChild(li);
  });
}

// ----------------------------
// GASTOS
// ----------------------------
const expenseForm = document.getElementById("expense-form");
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = document.getElementById("expense-category").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  if (!category || isNaN(amount)) return;

  await saveExpense(category, amount);
  expenseForm.reset();
  await renderExpenses();
  updateSummary();
});

async function renderExpenses() {
  const expenses = await getUserExpenses();
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";
  expenses.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.category}: $${e.amount}`;
    expenseList.appendChild(li);
  });
}

// ----------------------------
// METAS
// ----------------------------
const goalForm = document.getElementById("goal-form");
goalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("goal-name").value;
  const amount = parseFloat(document.getElementById("goal-amount").value);
  if (!name || isNaN(amount)) return;

  await saveGoal(name, amount);
  goalForm.reset();
  await renderGoals();
});

async function renderGoals() {
  const goals = await getUserGoals();
  const goalList = document.getElementById("goal-list");
  goalList.innerHTML = "";
  goals.forEach(g => {
    const li = document.createElement("li");
    li.textContent = `${g.name}: $${g.amount}`;
    goalList.appendChild(li);
  });
}

// ----------------------------
// RESUMEN
// ----------------------------
async function updateSummary() {
  const incomes = await getUserIncomes();
  const expenses = await getUserExpenses();
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("total-income").textContent = `$${totalIncome}`;
  document.getElementById("total-expenses").textContent = `$${totalExpenses}`;
  document.getElementById("total-remaining").textContent = `$${totalIncome - totalExpenses}`;
}
