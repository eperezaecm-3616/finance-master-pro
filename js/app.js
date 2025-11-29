// FinanceMaster PRO - client-side logic (stores DATA in localStorage)
// Works offline in browser and on phone. No servers needed.

const STORAGE_KEY = 'financemaster_pro_v1';

const defaultData = {
  meta:{name:'Amilcar', created: new Date().toISOString()},
  accounts: [
    {name:'Cuenta Ahorros', balance: 8200},
    {name:'Cuenta Corriente', balance: 1400},
    {name:'Wallet Crypto', balance: 3200}
  ],
  ingresos: [
    {source:'Salario principal', amount:2500, freq:'mensual'},
    {source:'Freelance', amount:300, freq:'mensual'}
  ],
  gastos: [
    {categoria:'Vivienda', desc:'Renta', amount:700, date:'2025-10-01'},
    {categoria:'Alimentación', desc:'Super', amount:320, date:'2025-10-02'},
    {categoria:'Transporte', desc:'Gas', amount:80, date:'2025-10-05'}
  ],
  budgets: {
    Vivienda:900,
    Alimentación:350,
    Transporte:150,
    Servicios:120,
    Suscripciones:50,
    Entretenimiento:100,
    Restaurantes:120,
    Compras:150,
    Ahorro:500,
    Inversiones:300
  },
  metas: [],
  deudas: [],
  inversiones: []
};

// Utilities
function loadData(){ const raw = localStorage.getItem(STORAGE_KEY); if(!raw){ localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData)); return JSON.parse(JSON.stringify(defaultData)); } return JSON.parse(raw); }
function saveData(d){ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
function formatMoney(n){ return '$' + Number(n).toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:2}); }

// App state
let DATA = loadData();

// DOM helpers
function $(s){ return document.querySelector(s); }
function $all(s){ return document.querySelectorAll(s); }

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  // nav
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      document.querySelectorAll('.view').forEach(v=> v.classList.remove('active'));
      document.getElementById(view).classList.add('active');
      refreshAll();
    });
  });

  // reset demo
  $('#btn-reset').addEventListener('click', ()=> { if(confirm('Resetear datos demo?')){ localStorage.removeItem(STORAGE_KEY); DATA = loadData(); refreshAll(); alert('Datos reseteados.'); } });

  // export JSON
  $('#btn-export').addEventListener('click', ()=> {
    const blob = new Blob([JSON.stringify(DATA,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='financemaster_export.json'; a.click(); URL.revokeObjectURL(url);
  });

  // form ingreso
  $('#form-ingreso').addEventListener('submit', (e)=>{
    e.preventDefault();
    const f = new FormData(e.target);
    DATA.ingresos.push({source:f.get('source'), amount: Number(f.get('amount')), freq: f.get('freq')});
    saveData(DATA); e.target.reset(); renderIngresos();
    refreshAll();
  });

  // form gasto
  $('#form-gasto').addEventListener('submit', (e)=>{
    e.preventDefault(); const f=new FormData(e.target);
    DATA.gastos.push({categoria:f.get('categoria'), desc:f.get('desc'), amount:Number(f.get('amount')), date: new Date().toISOString().slice(0,10)});
    saveData(DATA); e.target.reset(); renderGastos(); refreshAll();
  });

  // form meta
  $('#form-meta').addEventListener('submit',(e)=>{ e.preventDefault(); const f=new FormData(e.target);
    DATA.metas.push({name:f.get('name'), target: Number(f.get('target')), monthly: Number(f.get('monthly')), saved:0});
    saveData(DATA); e.target.reset(); renderMetas(); refreshAll();
  });

  // deuda
  $('#form-deuda').addEventListener('submit',(e)=>{ e.preventDefault(); const f=new FormData(e.target);
    DATA.deudas.push({name:f.get('name'), balance:Number(f.get('balance')), due:f.get('due'), interest:Number(f.get('interest')||0)});
    saveData(DATA); e.target.reset(); renderDeudas(); refreshAll();
  });

  // inversiones
  $('#form-inv').addEventListener('submit',(e)=>{ e.preventDefault(); const f=new FormData(e.target);
    DATA.inversiones.push({asset:f.get('asset'), amount:Number(f.get('amount')), alloc: Number(f.get('alloc')||0)});
    saveData(DATA); e.target.reset(); renderInvs(); refreshAll();
  });

  // load budgets
  renderBudgetList();

  // initial render
  refreshAll();
});

// Renders
function refreshAll(){
  renderOverview();
  renderIngresos();
  renderGastos();
  renderPV();
  renderMetas();
  renderDeudas();
  renderInvs();
  renderHabitos();
  renderVencimientos();
  document.getElementById('last-sync').textContent = new Date().toLocaleString();
}

// Overview
function renderOverview(){
  const totalSaldos = DATA.accounts.reduce((s,a)=>s+a.balance,0);
  document.getElementById('total-saldos').textContent = formatMoney(totalSaldos);
  const activos = totalSaldos;
  const totalDeudas = DATA.deudas.reduce((s,d)=>s+d.balance,0);
  document.getElementById('patrimonio-neto').textContent = formatMoney(activos - totalDeudas);

  const ingresosMens = DATA.ingresos.reduce((s,i)=> s + (i.freq==='mensual'? i.amount : 0), 0);
  const gastosMens = DATA.gastos.reduce((s,g)=> s + g.amount, 0);
  document.getElementById('flujo-mensual').textContent = formatMoney(ingresosMens - gastosMens);
  document.getElementById('liquido').textContent = formatMoney(totalSaldos);

  // chart saldos (accounts)
  const ctx = document.getElementById('chart-saldos').getContext('2d');
  const labels = DATA.accounts.map(a=>a.name);
  const data = DATA.accounts.map(a=>a.balance);
  if(window.saldosChart) window.saldosChart.destroy();
  window.saldosChart = new Chart(ctx, {
    type:'doughnut',
    data:{labels, datasets:[{data, backgroundColor:['#06b6d4','#7c3aed','#34d399','#f59e0b']}]},
    options:{plugins:{legend:{position:'bottom'}}}
  });

  // rendimiento (mock)
  const ctx2 = document.getElementById('chart-rendimiento').getContext('2d');
  const months = Array.from({length:12}, (_,i)=> {
    const m = new Date(); m.setMonth(m.getMonth()-11+i); return m.toLocaleString(undefined,{month:'short'});
  });
  const series = Array.from({length:12}, (_,i)=> 10000 + i*200 + (Math.random()-0.5)*1200);
  if(window.rendChart) window.rendChart.destroy();
  window.rendChart = new Chart(ctx2, {
    type:'line',
    data:{labels:months, datasets:[{label:'Balance', data:series, borderColor:'#06b6d4', fill:true, backgroundColor:'rgba(6,182,212,0.08)'}]},
    options:{plugins:{legend:{display:false}}}
  });
}

// Ingresos
function renderIngresos(){
  const list = document.getElementById('list-ingresos'); list.innerHTML='';
  DATA.ingresos.forEach((it, idx)=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${it.source}</strong><div class="muted">${it.freq}</div></div><div>${formatMoney(it.amount)} <button data-idx="${idx}" class="btn small ghost">Borrar</button></div>`;
    list.appendChild(div);
  });
  // attach delete
  list.querySelectorAll('button[data-idx]').forEach(b=>b.addEventListener('click', (e)=>{ const i=Number(e.target.getAttribute('data-idx')); DATA.ingresos.splice(i,1); saveData(DATA); renderIngresos(); refreshAll(); }));
  const totalMes = DATA.ingresos.reduce((s,i)=> s + (i.freq==='mensual'? i.amount : 0), 0);
  document.getElementById('ingreso-total-mes').textContent = formatMoney(totalMes);
  document.getElementById('ingreso-anual').textContent = formatMoney(totalMes*12);

  // ingresos small chart
  const ctx = document.getElementById('chart-ingresos').getContext('2d');
  const labels = DATA.ingresos.map(i=>i.source);
  const values = DATA.ingresos.map(i=>i.amount);
  if(window.ingChart) window.ingChart.destroy();
  window.ingChart = new Chart(ctx, {type:'bar', data:{labels, datasets:[{data:values, backgroundColor:'#7c3aed'}]}, options:{plugins:{legend:{display:false}}}});
}

// Gastos
function renderGastos(){
  const list = document.getElementById('list-gastos'); list.innerHTML='';
  DATA.gastos.forEach((g,idx)=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${g.categoria}</strong><div class="muted">${g.desc} · ${g.date}</div></div><div>${formatMoney(g.amount)} <button data-idx="${idx}" class="btn small ghost">Borrar</button></div>`;
    list.appendChild(div);
  });
  list.querySelectorAll('button[data-idx]').forEach(b=>b.addEventListener('click', (e)=>{ const i=Number(e.target.getAttribute('data-idx')); DATA.gastos.splice(i,1); saveData(DATA); renderGastos(); refreshAll(); }));

  // budget list
  renderBudgetList();

  // check alerts
  const alerts = document.getElementById('alerts');
  alerts.innerHTML = '';
  const spentByCat = {};
  DATA.gastos.forEach(g=> spentByCat[g.categoria] = (spentByCat[g.categoria]||0) + g.amount);
  Object.keys(DATA.budgets).forEach(cat=>{
    const budget = DATA.budgets[cat]||0;
    const spent = spentByCat[cat]||0;
    if(budget>0 && spent>budget){
      const el = document.createElement('div'); el.className='alert'; el.textContent = `Alerta: Te pasaste del presupuesto en ${cat} — Gastado ${formatMoney(spent)} / Presupuesto ${formatMoney(budget)}`;
      alerts.appendChild(el);
    }
  });
}

// budget list render and inline editing
function renderBudgetList(){
  const container = document.getElementById('budget-list'); container.innerHTML = '';
  Object.keys(DATA.budgets).forEach(cat=>{
    const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px'; row.style.alignItems='center'; row.style.marginTop='6px';
    row.innerHTML = `<div style="flex:1">${cat}</div><input value="${DATA.budgets[cat]}" data-cat="${cat}" style="width:120px;padding:6px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,0.03);color:inherit">`;
    container.appendChild(row);
  });
  container.querySelectorAll('input[data-cat]').forEach(inp=> inp.addEventListener('change', (e)=>{ const cat = e.target.getAttribute('data-cat'); DATA.budgets[cat] = Number(e.target.value||0); saveData(DATA); renderGastos(); }));
}

// Presupuesto vs Real
function renderPV(){
  const container = document.getElementById('pvstable'); container.innerHTML = '';
  const table = document.createElement('table'); table.style.width='100%';
  const thead = document.createElement('thead'); thead.innerHTML = '<tr><th>Categoria</th><th>Presupuestado</th><th>Real</th><th>% Cumplimiento</th></tr>';
  const tbody = document.createElement('tbody');
  const spentByCat = {};
  DATA.gastos.forEach(g=> spentByCat[g.categoria] = (spentByCat[g.categoria]||0)+g.amount);
  Object.keys(DATA.budgets).forEach(cat=>{
    const bud = DATA.budgets[cat]||0;
    const real = spentByCat[cat]||0;
    const pct = bud>0? Math.round((real/bud)*100): (real>0?100:0);
    const tr = document.createElement('tr'); tr.innerHTML = `<td>${cat}</td><td>${formatMoney(bud)}</td><td>${formatMoney(real)}</td><td>${pct}%</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody); container.appendChild(table);

  // top 3 overspend
  const overs = Object.keys(DATA.budgets).map(cat=>({cat, over: ( (DATA.gastos.filter(g=>g.categoria===cat).reduce((s,g)=>s+g.amount,0)) - (DATA.budgets[cat]||0))})).sort((a,b)=>b.over-a.over).slice(0,3);
  const alerts = document.getElementById('alerts'); if(alerts) alerts.innerHTML = '';
  overs.forEach(o=>{ if(o.over>0){ const el = document.createElement('div'); el.className='alert'; el.textContent = `Top: Te excediste en ${o.cat} por ${formatMoney(o.over)}`; alerts.appendChild(el); } });
}

// Metas
function renderMetas(){
  const wrap = document.getElementById('metas-list'); wrap.innerHTML='';
  DATA.metas.forEach((m,idx)=>{
    const div = document.createElement('div'); div.className='item';
    const pct = m.target>0? Math.round((m.saved/m.target)*100):0;
    div.innerHTML = `<div><strong>${m.name}</strong><div class="muted">Objetivo ${formatMoney(m.target)} · Ahorro mensual ${formatMoney(m.monthly)} · Progreso ${pct}%</div></div>
      <div>${formatMoney(m.saved)} <button data-idx="${idx}" class="btn small ghost">Añadir ahorro</button></div>`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll('button[data-idx]').forEach(b=>b.addEventListener('click', (e)=>{ const i=Number(e.target.getAttribute('data-idx')); DATA.metas[i].saved += DATA.metas[i].monthly; saveData(DATA); renderMetas(); refreshAll(); }));
}

// Deudas
function renderDeudas(){
  const wrap = document.getElementById('deudas-list'); wrap.innerHTML='';
  DATA.deudas.forEach((d,idx)=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${d.name}</strong><div class="muted">Saldo ${formatMoney(d.balance)} · Próx pago ${d.due} · Int ${d.interest}%</div></div><div>${formatMoney(d.balance)} <button data-idx="${idx}" class="btn small ghost">Pagar</button></div>`;
    wrap.appendChild(div);
  });
  wrap.querySelectorAll('button[data-idx]').forEach(b=>b.addEventListener('click', (e)=>{ const i=Number(e.target.getAttribute('data-idx')); DATA.deudas[i].balance = Math.max(0, DATA.deudas[i].balance - 50); saveData(DATA); renderDeudas(); refreshAll(); }));
}

// Inversiones
function renderInvs(){
  const wrap = document.getElementById('inv-list'); wrap.innerHTML='';
  DATA.inversiones.forEach((it,idx)=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${it.asset}</strong><div class="muted">Valor ${formatMoney(it.amount)} · Alloc ${it.alloc}%</div></div><div>${formatMoney(it.amount)}</div>`;
    wrap.appendChild(div);
  });
  // allocation chart
  const ctx = document.getElementById('chart-alloc').getContext('2d');
  const labels = DATA.inversiones.map(i=>i.asset);
  const vals = DATA.inversiones.map(i=>i.amount);
  if(window.allocChart) window.allocChart.destroy();
  window.allocChart = new Chart(ctx, {type:'pie', data:{labels, datasets:[{data:vals, backgroundColor:['#06b6d4','#7c3aed','#34d399','#f59e0b']}]}, options:{plugins:{legend:{position:'bottom'}}}});
}

// Habitos
function renderHabitos(){
  const ctx = document.getElementById('chart-week').getContext('2d');
  const days = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
  const daySums = [0,0,0,0,0,0,0];
  DATA.gastos.forEach(g=>{
    const d = new Date(g.date).getDay();
    daySums[d] += g.amount;
  });
  if(window.weekChart) window.weekChart.destroy();
  window.weekChart = new Chart(ctx, {type:'bar', data:{labels:days, datasets:[{data:daySums, backgroundColor:'#06b6d4'}]}, options:{plugins:{legend:{display:false}}}});

  const ctx2 = document.getElementById('chart-trend').getContext('2d');
  const months = Array.from({length:6}, (_,i)=> { const m=new Date(); m.setMonth(m.getMonth()-5+i); return m.toLocaleString(undefined,{month:'short'}); });
  const series = months.map(()=> Math.round(300 + Math.random()*500));
  if(window.trendChart) window.trendChart.destroy();
  window.trendChart = new Chart(ctx2, {type:'line', data:{labels:months, datasets:[{data:series, borderColor:'#7c3aed', fill:true, backgroundColor:'rgba(124,58,237,0.07)'}]}, options:{plugins:{legend:{display:false}}}});

  const horm = DATA.gastos.filter(g=> g.amount >0 && g.amount <=5);
  const hwrap = document.getElementById('hormigas'); hwrap.innerHTML = '<div class="muted">Gastos hormiga identificados (<= $5)</div>';
  horm.slice(0,6).forEach(h=>{ const el = document.createElement('div'); el.className='item'; el.textContent = `${h.categoria} · ${h.desc} · ${formatMoney(h.amount)} · ${h.date}`; hwrap.appendChild(el); });
}

// Vencimientos
function renderVencimientos(){
  const wrap = document.getElementById('venc-list'); wrap.innerHTML='';
  const today = new Date();
  DATA.deudas.forEach(d=>{
    const due = new Date(d.due);
    const diff = Math.ceil((due - today)/(1000*60*60*24));
    const el = document.createElement('div'); el.className='item'; el.innerHTML = `<div><strong>${d.name}</strong><div class="muted">Vence en ${diff} días · ${d.due}</div></div><div>${formatMoney(d.balance)}</div>`;
    wrap.appendChild(el);
  });
}

