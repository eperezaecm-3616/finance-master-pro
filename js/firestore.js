import {
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "./firebase.js";


// ======================================================
//  FUNCIONES PARA GUARDAR DATOS
// ======================================================

// -----------------------------
// GUARDAR INGRESO
// -----------------------------
export async function saveIncome(source, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "incomes"), {
    uid: user.uid,
    source,
    amount: Number(amount),
    createdAt: Date.now()
  });
}


// -----------------------------
// GUARDAR GASTO
// -----------------------------
export async function saveExpense(category, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "expenses"), {
    uid: user.uid,
    category,
    amount: Number(amount),
    createdAt: Date.now()
  });
}


// -----------------------------
// GUARDAR META
// -----------------------------
export async function saveGoal(name, amount) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "goals"), {
    uid: user.uid,
    name,
    amount: Number(amount),
    createdAt: Date.now()
  });
}



// ======================================================
//  FUNCIONES PARA LEER DATOS
// ======================================================

// -----------------------------
// OBTENER INGRESOS
// -----------------------------
export async function getUserIncomes() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "incomes"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => doc.data());
}


// -----------------------------
// OBTENER GASTOS
// -----------------------------
export async function getUserExpenses() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "expenses"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => doc.data());
}


// -----------------------------
// OBTENER METAS
// -----------------------------
export async function getUserGoals() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "goals"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => doc.data());
}