import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { auth } from "./firebase.js";

const db = getFirestore();

// ======================================================
// Funciones de Ingresos
// ======================================================
export async function saveIncome(source, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "incomes"), {
    uid: user.uid,
    source,
    amount,
    createdAt: new Date()
  });
}

export async function getUserIncomes() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "incomes"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  const incomes = snapshot.docs.map(doc => doc.data());
  return incomes;
}

// ======================================================
// Funciones de Gastos
// ======================================================
export async function saveExpense(category, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "expenses"), {
    uid: user.uid,
    category,
    amount,
    createdAt: new Date()
  });
}

export async function getUserExpenses() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "expenses"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  const expenses = snapshot.docs.map(doc => doc.data());
  return expenses;
}

// ======================================================
// Funciones de Metas
// ======================================================
export async function saveGoal(name, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "goals"), {
    uid: user.uid,
    name,
    amount,
    createdAt: new Date()
  });
}

export async function getUserGoals() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "goals"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  const goals = snapshot.docs.map(doc => doc.data());
  return goals;
}