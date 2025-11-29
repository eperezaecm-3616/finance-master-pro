import { db, auth } from "./firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Guardar gasto
export async function saveExpense(category, amount) {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "gastos"), {
        uid: user.uid,
        category,
        amount,
        date: new Date().toISOString()
    });
}

// Obtener gastos
export async function loadExpenses() {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "gastos"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    let results = [];
    snapshot.forEach(doc => results.push(doc.data()));
    return results;
}