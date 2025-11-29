import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ===========================
// INGRESOS
// ===========================
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
  return snapshot.docs.map(doc => doc.data());
}

// ===========================
// GASTOS
// ===========================
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
  return snapshot.docs.map(doc => doc.data());
}

// ===========================
// METAS
// ===========================
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
  return snapshot.docs.map(doc => doc.data());
}
