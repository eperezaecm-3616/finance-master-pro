// firestore.js
import { db, auth } from "./firebase.js";
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Guardar ingreso
export const saveIncome = async (source, amount) => {
  try {
    await addDoc(collection(db, "incomes"), {
      uid: auth.currentUser.uid,
      source,
      amount: parseFloat(amount),
      date: new Date()
    });
    alert("Ingreso agregado!");
  } catch (error) {
    console.error(error);
  }
};

// Guardar gasto
export const saveExpense = async (category, amount) => {
  try {
    await addDoc(collection(db, "expenses"), {
      uid: auth.currentUser.uid,
      category,
      amount: parseFloat(amount),
      date: new Date()
    });
    alert("Gasto agregado!");
  } catch (error) {
    console.error(error);
  }
};

// Guardar meta
export const saveGoal = async (goalName, targetAmount) => {
  try {
    await addDoc(collection(db, "goals"), {
      uid: auth.currentUser.uid,
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      date: new Date()
    });
    alert("Meta creada!");
  } catch (error) {
    console.error(error);
  }
};

// Obtener ingresos del usuario
export const getUserIncomes = async () => {
  const q = query(collection(db, "incomes"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

// Obtener gastos del usuario
export const getUserExpenses = async () => {
  const q = query(collection(db, "expenses"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

// Obtener metas del usuario
export const getUserGoals = async () => {
  const q = query(collection(db, "goals"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
