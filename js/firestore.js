import { db, auth } from "./firebase.js";
import { collection, addDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const getUid = ()=> auth.currentUser ? auth.currentUser.uid : null;

// Ingresos
const incomeForm = document.getElementById("incomeForm");
const incomeList = document.getElementById("incomeList");
if(incomeForm){
  incomeForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const uid = getUid();
    if(!uid) return alert("Usuario no logeado");
    const source = document.getElementById("incomeSource").value;
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    await addDoc(collection(db,"incomes"),{uid,source,amount,createdAt:new Date()});
    incomeForm.reset();
  });
}
if(incomeList){
  const uid = getUid();
  if(uid){
    const q = query(collection(db,"incomes"),where("uid","==",uid));
    onSnapshot(q,snapshot=>{
      incomeList.innerHTML="";
      snapshot.forEach(doc=>{
        const data=doc.data();
        const div=document.createElement("div");
        div.textContent=`${data.source}: $${data.amount}`;
        incomeList.appendChild(div);
      });
    });
  }
}

// Gastos
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
if(expenseForm){
  expenseForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const uid = getUid();
    if(!uid) return alert("Usuario no logeado");
    const category = document.getElementById("expenseCategory").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    await addDoc(collection(db,"expenses"),{uid,category,amount,createdAt:new Date()});
    expenseForm.reset();
  });
}
if(expenseList){
  const uid = getUid();
  if(uid){
    const q = query(collection(db,"expenses"),where("uid","==",uid));
    onSnapshot(q,snapshot=>{
      expenseList.innerHTML="";
      snapshot.forEach(doc=>{
        const data=doc.data();
        const div=document.createElement("div");
        div.textContent=`${data.category}: $${data.amount}`;
        expenseList.appendChild(div);
      });
    });
  }
}

// Metas
const goalForm = document.getElementById("goalForm");
const goalList = document.getElementById("goalList");
if(goalForm){
  goalForm.addEventListener("submit", async e=>{
    e.preventDefault();
    const uid = getUid();
    if(!uid) return alert("Usuario no logeado");
    const name = document.getElementById("goalName").value;
    const target = parseFloat(document.getElementById("goalTarget").value);
    await addDoc(collection(db,"goals"),{uid,name,target,progress:0,createdAt:new Date()});
    goalForm.reset();
  });
}
if(goalList){
  const uid = getUid();
  if(uid){
    const q = query(collection(db,"goals"),where("uid","==",uid));
    onSnapshot(q,snapshot=>{
      goalList.innerHTML="";
      snapshot.forEach(doc=>{
        const data=doc.data();
        const div=document.createElement("div");
        div.textContent=`${data.name}: $${data.target}`;
        goalList.appendChild(div);
      });
    });
  }
}