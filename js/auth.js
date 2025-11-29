import { auth } from "./firebase.js";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Registro
const registerForm = document.getElementById("registerForm");
if(registerForm){
    registerForm.addEventListener("submit", e=>{
        e.preventDefault();
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        createUserWithEmailAndPassword(auth,email,password)
        .then(()=>{window.location.href="dashboard.html";})
        .catch(err=>{alert(err.message);});
    });
}

// Login
const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", e=>{
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{window.location.href="dashboard.html";})
        .catch(err=>{alert(err.message);});
    });
}

// Verificar usuario activo
if(window.location.pathname.includes("dashboard.html")){
    onAuthStateChanged(auth,user=>{
        if(!user) window.location.href="index.html";
        else document.getElementById("userEmail").innerText = user.email;
    });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click",()=>{
        signOut(auth).then(()=>{window.location.href="index.html";});
    });
}