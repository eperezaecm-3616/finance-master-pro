console.log('Dashboard cargado');

// Funciones de ejemplo para secciones avanzadas
async function actualizarSecciones(uid){
    const docRef = doc(db,'usuarios',uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        const data = docSnap.data();

        // Presupuesto vs Real
        const presLista = document.getElementById('presupuesto-lista');
        presLista.innerHTML='';
        if(data.presupuesto){
            for(let cat in data.presupuesto){
                let gastado = data.gastos.filter(g=>g.categoria===cat).reduce((a,b)=>a+b.monto,0);
                presLista.innerHTML+=`<div>${cat}: Presupuesto $${data.presupuesto[cat]} - Gastado $${gastado}</div>`;
            }
        }

        // Ahorros y Metas
        const ahorrosLista = document.getElementById('ahorros-lista');
        ahorrosLista.innerHTML='';
        if(data.metas){
            data.metas.forEach(m=>{
                let progreso = ((m.ahorrado/m.objetivo)*100).toFixed(1);
                ahorrosLista.innerHTML+=`<div>${m.nombre}: $${m.ahorrado}/$${m.objetivo} (${progreso}%)</div>`;
            });
        }

        // Deudas y Créditos
        const deudasLista = document.getElementById('deudas-lista');
        deudasLista.innerHTML='';
        if(data.deudas){
            data.deudas.forEach(d=>{
                deudasLista.innerHTML+=`<div>${d.nombre}: $${d.saldo} - Próximo pago ${d.proximoPago}</div>`;
            });
        }

        // Inversiones
        const invLista = document.getElementById('inversiones-lista');
        invLista.innerHTML='';
        if(data.inversiones){
            data.inversiones.forEach(i=>{
                invLista.innerHTML+=`<div>${i.tipo}: $${i.monto} - Rendimiento ${i.rendimiento}%</div>`;
            });
        }

        // Hábitos de gasto
        const habLista = document.getElementById('habitos-lista');
        habLista.innerHTML='';
        if(data.gastos){
            const total = data.gastos.reduce((a,b)=>a+b,0);
            habLista.innerHTML=`Gasto promedio: $${(total/data.gastos.length).toFixed(2)}`;
        }

        // Próximos vencimientos
        const vencLista = document.getElementById('vencimientos-lista');
        vencLista.innerHTML='';
        if(data.vencimientos){
            data.vencimientos.forEach(v=>{
                vencLista.innerHTML+=`<div>${v.nombre}: ${v.fecha}</div>`;
            });
        }
    }
}

// Llamar actualizar secciones después de cargar datos
onAuthStateChanged(auth, user=>{
    if(user) actualizarSecciones(user.uid);
});

// Agregar nuevas funcionalidades de presupuesto, metas, deudas, inversiones, etc.
window.agregarPresupuesto = async (categoria, monto) => {
    const user = auth.currentUser;
    if(user){
        const docRef = doc(db,'usuarios',user.uid);
        const docSnap = await getDoc(docRef);
        const presupuesto = docSnap.data().presupuesto || {};
        presupuesto[categoria]=monto;
        await updateDoc(docRef,{presupuesto});
        actualizarSecciones(user.uid);
    }
}

// Funciones similares se pueden crear para metas, deudas, inversiones y vencimientos