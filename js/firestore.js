import { db, auth } from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const saveIncome = async (fuente, cantidad) => {
  try {
    await addDoc(collection(db, "ingresos"), {
      uid: auth.currentUser.uid,
      fuente,
      cantidad: Number(cantidad)
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserIncomes = async () => {
  const q = query(collection(db, "ingresos"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

// Gastos
export const saveExpense = async (categoria, cantidad) => {
  try {
    await addDoc(collection(db, "gastos"), {
      uid: auth.currentUser.uid,
      categoria,
      cantidad: Number(cantidad)
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserExpenses = async () => {
  const q = query(collection(db, "gastos"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

// Metas
export const saveGoal = async (nombre, monto) => {
  try {
    await addDoc(collection(db, "metas"), {
      uid: auth.currentUser.uid,
      nombre,
      monto: Number(monto)
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserGoals = async () => {
  const q = query(collection(db, "metas"), where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
