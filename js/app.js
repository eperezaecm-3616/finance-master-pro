import { auth, db } from "./firebase.js";
import { collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const netWorthEl = document.getElementById("netWorth");
const monthlyFlowEl = document.getElementById("monthlyFlow");
const liquidAvailableEl = document.getElementById("liquidAvailable");

const updateSummary = ()=>{
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  if(!uid) return;

  let totalIncome = 0, totalExpense = 0;

  const incomeQuery = query(collection(db,"incomes"),where("uid","==",uid));
  onSnapshot(incomeQuery,snapshot=>{
    totalIncome=0;
    snapshot.forEach(doc=>totalIncome+=doc.data().amount);
    monthlyFlowEl.textContent = `$${totalIncome - totalExpense}`;
    netWorthEl.textContent = `$${totalIncome - totalExpense}`;
    liquidAvailableEl.textContent = `$${totalIncome - totalExpense}`;
  });

  const expenseQuery = query(collection(db,"expenses"),where("uid","==",uid));
  onSnapshot(expenseQuery,snapshot=>{
    totalExpense=0;
    snapshot.forEach(doc=>totalExpense+=doc.data().amount);
    monthlyFlowEl.textContent = `$${totalIncome - totalExpense}`;
    netWorthEl.textContent = `$${totalIncome - totalExpense}`;
    liquidAvailableEl.textContent = `$${totalIncome - totalExpense}`;
  });
};

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
onAuthStateChanged(auth,user=>{
  if(user) updateSummary();
});