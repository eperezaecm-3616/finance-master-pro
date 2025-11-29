// firestore.js
import { db, auth } from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Ingresos
export const saveIncome = async (source, amount) => {
  if(!auth.currentUser) return;
  await addDoc(collection(db, "incomes"), {
    uid: auth.currentUser.uid,
    source,
    amount: parseFloat(amount),
    date: new Date()
  });
};

export const getUserIncomes = async () => {
  if(!auth.currentUser) return [];
  const q = query(collection(db, "incomes"), where("uid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

// Gastos
export const saveExpense = async (category, amount) => {
  if(!auth.currentUser) return;
  await addDoc(collection(db, "expenses"), {
    uid: auth.currentUser.uid,
    category,
    amount: parseFloat(amount),
    date: new Date()
  });
};

export const getUserExpenses = async () => {
  if(!auth.currentUser) return [];
  const q = query(collection(db, "expenses"), where("uid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

// Metas
export const saveGoal = async (name, amount) => {
  if(!auth.currentUser) return;
  await addDoc(collection(db, "goals"), {
    uid: auth.currentUser.uid,
    name,
    amount: parseFloat(amount),
    date: new Date()
  });
};

export const getUserGoals = async () => {
  if(!auth.currentUser) return [];
  const q = query(collection(db, "goals"), where("uid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};
