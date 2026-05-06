const REPO_OWNER = “abhicome”;
const REPO_NAME  = “second-brain”;
const DATA_PATH  = “data”;

const app = document.getElementById(“root”) || document.getElementById(“app”);

if (!app) {
document.body.innerHTML = ‘<div style="background:#020617;color:white;min-height:100vh;padding:40px">Root container missing</div>’;
throw new Error(“Root container missing”);
}

const DEFAULT_CATEGORIES = [
{id:“work”,      name:“Work”,      color:”#3B82F6”, file:“work.json”,      icon:“💼”},
{id:“projects”,  name:“Projects”,  color:”#8B5CF6”, file:“projects.json”,  icon:“🚀”},
{id:“personal”,  name:“Personal”,  color:”#EF4444”, file:“personal.json”,  icon:“👤”},
{id:“knowledge”, name:“Knowledge”, color:”#2563EB”, file:“knowledge.json”, icon:“📘”},
{id:“bills”,     name:“Bills”,     color:”#F59E0B”, file:“bills.json”,     icon:“💳”},
{id:“watchlist”, name:“Watchlist”, color:”#D946EF”, file:“watchlist.json”, icon:“🎬”}
];

const PCOL = {urgent:”#EF4444”, high:”#F59E0B”, normal:”#94A3B8”, low:”#475569”};
const SCOL = {todo:”#94A3B8”,   inprogress:”#3B82F6”, done:”#10B981”, blocked:”#EF4444”};
const LCOL = {bau:”#94A3B8”,    project:”#8B5CF6”, investigation:”#EF4444”, agentic:”#10B981”};

let state = {
token:      localStorage.getItem(“github_token”) || “”,
categories: [],
data:       {},
worklog:    [],
current:    null,
view:       “home”,
catFilter:  “all”
};

let saveTimers = {};

init();

async function init() {
renderLoading();
try {
await loadCategories();
await loadAllData();
await loadWorklog();
renderHome();
} catch(e) {
console.error(e);
app.innerHTML = ‘<div style="color:white;padding:30px">Failed to load — check console.</div>’;
}
}

function renderLoading() {
app.innerHTML = ‘<div style="color:white;padding:30px;font-size:20px">Loading…</div>’;
}

function rawUrl(file) {
return `./data/${file}?v=${Date.now()}`;
}

async function loadCategories() {
try {
const res  = await fetch(rawUrl(“sb-categories.json”));
const json = JSON.parse(await res.text());
state.categories = Array.isArray(json) && json.length ? json : DEFAULT_CATEGORIES;
} catch(e) {
state.categories = DEFAULT_CATEGORIES;
}
}

async function loadAllData() {
for (const cat of state.categories) {
try {
const res  = await fetch(rawUrl(cat.file));
const json = JSON.parse(await res.text());
state.data[cat.id] = Array.isArray(json) ? json : [];
} catch(e) {
state.data[cat.id] = [];
}
}
}

async function loadWorklog() {
try {
const res  = await fetch(rawUrl(“sb-worklog.json”));
const json = JSON.parse(await res.text());
state.worklog = Array.isArray(json) ? json : (json.entries || []);
} catch(e) {
state.worklog = [];
}
}

// ── GITHUB SAVE ───────────────────────────────────────────────────────────────
async function saveFile(file, data) {
if (!state.token) { alert(“Add GitHub token first (Key button)”); return; }
const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}/${file}`;
let sha = null;
try {
const ex  = await fetch(url, {headers:{Authorization:`token ${state.token}`}});
const exj = await ex.json();
sha = exj.sha;
} catch(e) {}
const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
await fetch(url, {
method:“PUT”,
headers:{Authorization:`token ${state.token}`,“Content-Type”:“application/json”},
body:JSON.stringify({message:`update ${file}`, content, sha})
});
}

function debSave(key, file, data) {
clearTimeout(saveTimers[key]);
saveTimers[key] = setTimeout(async () => {
setStatus(“Saving…”);
await saveFile(file, data);
setStatus(“Saved ✓”);
}, 1200);
}

function setStatus(msg) {
const el = document.getElementById(“status”);
if (el) el.textContent = msg;
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function renderHome() {
state.view    = “home”;
state.current = null;

let total = 0, done = 0, overdue = 0;
state.categories.forEach(cat => {
const tasks = state.data[cat.id] || [];
total   += tasks.length;
done    += tasks.filter(t => t.done).length;
overdue += tasks.filter(t => !t.done && t.date && new Date(t.date) < new Date(new Date().toDateString())).length;
});

const catGrid = state.categories.map(cat => {
const cnt = (state.data[cat.id] || []).filter(t => !t.done).length;
return `<div onclick="openCategory('${cat.id}')" style="background:#081225;border:2px solid ${cat.color};border-radius:24px;padding:20px;cursor:pointer;position:relative"> <div style="font-size:32px">${cat.icon}</div> <div style="margin-top:14px;font-size:28px;font-weight:bold">${cat.name}</div> <div style="margin-top:10px;color:#94A3B8">${cnt} open</div> ${cnt > 0 ?`<div style="position:absolute;top:12px;right:12px;background:${cat.color};color:#fff;border-radius:99px;font-size:12px;font-weight:700;padding:3px 9px">${cnt}</div>` : ""} </div>`;
}).join(””);

app.innerHTML = `
<div style="background:#020617;min-height:100vh;color:white;font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:20px;padding-bottom:120px">

```
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
    <div>
      <div style="font-size:34px;font-weight:bold">Second Brain</div>
      <div id="status" style="font-size:12px;color:#34D399;margin-top:4px">${state.token ? "Ready" : "Add token to save"}</div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
      <button onclick="setToken()" style="${btnStyle()}">🔑 Key</button>
      <button onclick="syncAll()" style="${btnStyle()}">⟳ Sync</button>
      <button onclick="renderLog()" style="${btnStyle()}">📋 Log</button>
      <button onclick="renderReport()" style="${btnStyle()}">📊 Report</button>
    </div>
  </div>

  <div style="font-size:44px;font-weight:800;line-height:1.1">Your Second Brain</div>
  <div style="margin-top:8px;color:#94A3B8">${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
  <div style="margin-top:12px;height:4px;background:#1E293B;border-radius:99px">
    <div style="height:100%;width:${total?Math.round(done/total*100):0}%;background:linear-gradient(90deg,#3B82F6,#8B5CF6);border-radius:99px"></div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:24px">
    ${statCard(total,"TOTAL","#3B82F6")}
    ${statCard(done,"DONE","#10B981")}
    ${statCard(total-done,"ACTIVE","#F59E0B")}
    ${statCard(overdue,"OVERDUE","#EF4444")}
  </div>

  <div style="margin-top:36px;margin-bottom:16px;font-size:14px;font-weight:700;color:#94A3B8;letter-spacing:1px">CATEGORIES</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${catGrid}</div>

  <button onclick="addCategoryUI()" style="margin-top:20px;width:100%;padding:18px;background:#081225;border:2px dashed #1E293B;border-radius:20px;color:#94A3B8;font-size:18px;cursor:pointer">+ Add Category</button>

</div>`;
```

}

function statCard(value, label, color) {
return `<div style="background:#081225;border-radius:22px;padding:24px;text-align:center">
<div style="color:${color};font-size:40px;font-weight:800">${value}</div>
<div style="margin-top:8px;color:#94A3B8;font-size:13px">${label}</div>

  </div>`;
}

// ── CATEGORY VIEW ─────────────────────────────────────────────────────────────
function openCategory(id) {
state.current = id;
state.view    = “category”;

const cat   = state.categories.find(c => c.id === id);
const tasks = state.data[id] || [];

const filter  = state.catFilter || “all”;
let filtered  = filter === “all” ? tasks : tasks.filter(t => (t.status || (t.done?“done”:“todo”)) === filter);
filtered = filtered.sort((a,b) => {
const p = [“urgent”,“high”,“normal”,“low”];
return p.indexOf(a.priority||“normal”) - p.indexOf(b.priority||“normal”);
});

const chips = [“all”,“todo”,“inprogress”,“done”,“blocked”].map(s => {
const on  = filter === s;
const col = SCOL[s] || “#94A3B8”;
const lbl = s === “all” ? “All” : s === “inprogress” ? “In Progress” : s.charAt(0).toUpperCase()+s.slice(1);
return `<button onclick="setCatFilter('${id}','${s}')" style="background:${on?col+"22":"#081225"};border:1px solid ${on?col:"#1E293B"};color:${on?col:"#94A3B8"};border-radius:99px;padding:7px 16px;font-size:13px;cursor:pointer;white-space:nowrap">${lbl}</button>`;
}).join(””);

const cards = filtered.map((task, _) => {
const realIdx = tasks.indexOf(task);
const pri  = task.priority || “normal”;
const stat = task.status   || (task.done ? “done” : “todo”);
const pc   = PCOL[pri]  || “#94A3B8”;
const sc   = SCOL[stat] || “#94A3B8”;
const isOv = !task.done && task.date && new Date(task.date) < new Date(new Date().toDateString());

```
return `
  <div style="background:#081225;border-radius:22px;padding:20px;margin-bottom:14px;${isOv?"border:1px solid #EF444450":""}">
    <div style="display:flex;gap:14px;align-items:flex-start">
      <input type="checkbox" ${task.done?"checked":""} onchange="toggleTask('${id}',${realIdx})" style="width:22px;height:22px;margin-top:6px;flex-shrink:0">
      <div style="flex:1;min-width:0">
        <div onclick="editTaskUI('${id}',${realIdx})" style="font-size:22px;font-weight:700;cursor:pointer;${task.done?"text-decoration:line-through;opacity:.5":""}">${task.title||""}</div>
        ${task.notes ? `<div style="margin-top:10px;color:#94A3B8;line-height:1.5;font-size:15px">${task.notes}</div>` : ""}
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;align-items:center">
          <span style="background:${pc}22;color:${pc};padding:4px 12px;border-radius:99px;font-size:12px;font-weight:700">${pri}</span>
          <span style="background:${sc}22;color:${sc};padding:4px 12px;border-radius:99px;font-size:12px">${stat==="inprogress"?"In Progress":stat}</span>
          ${task.date ? `<span style="color:${isOv?"#EF4444":"#94A3B8"};font-size:13px">${isOv?"⚠ ":""}${fdate(task.date)}</span>` : ""}
        </div>
        ${task.subtasks && task.subtasks.length ? `
          <div style="margin-top:16px">
            ${task.subtasks.map((s,si) => `
              <div style="display:flex;gap:10px;margin-bottom:10px;align-items:center">
                <input type="checkbox" ${s.done?"checked":""} onchange="toggleSubtask('${id}',${realIdx},${si})">
                <span style="font-size:15px;${s.done?"text-decoration:line-through;opacity:.5":""}">${s.title}</span>
              </div>`).join("")}
          </div>` : ""}
      </div>
      <button onclick="deleteTask('${id}',${realIdx})" style="background:transparent;border:none;color:#374151;font-size:20px;cursor:pointer;padding:4px;flex-shrink:0">✕</button>
    </div>
  </div>`;
```

}).join(””);

app.innerHTML = ` <div style="background:#020617;min-height:100vh;color:white;font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding-bottom:120px"> <div style="padding:20px;border-bottom:1px solid #1E293B;background:#0B1220;position:sticky;top:0;z-index:100;display:flex;justify-content:space-between;align-items:center"> <button onclick="renderHome()" style="${circleBtn()}">←</button> <div style="font-size:26px;font-weight:bold;color:${cat.color}">${cat.icon} ${cat.name}</div> <button onclick="syncCategory('${id}')" style="${circleBtn()}" title="Save">⟳</button> </div> <div style="padding:16px"> <div style="font-size:13px;color:#94A3B8;margin-bottom:14px">${tasks.filter(t=>!t.done).length} open · ${tasks.filter(t=>t.done).length} done</div> <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:4px">${chips}</div> ${filtered.length ? cards : '<p style="color:#94A3B8;text-align:center;padding:40px 0">No tasks — tap + to add</p>'} </div> <button onclick="addTaskUI('${id}')" style="position:fixed;right:24px;bottom:24px;width:68px;height:68px;border-radius:50%;border:none;background:${cat.color};color:white;font-size:40px;cursor:pointer;box-shadow:0 4px 20px ${cat.color}55">+</button> </div>`;
}

function setCatFilter(id, status) {
state.catFilter = status;
openCategory(id);
}

// ── TASK CRUD ─────────────────────────────────────────────────────────────────
function toggleTask(cat, index) {
state.data[cat][index].done = !state.data[cat][index].done;
state.data[cat][index].status = state.data[cat][index].done ? “done” : “todo”;
debSave(cat, state.categories.find(c=>c.id===cat).file, state.data[cat]);
openCategory(cat);
}

function toggleSubtask(cat, index, si) {
state.data[cat][index].subtasks[si].done = !state.data[cat][index].subtasks[si].done;
openCategory(cat);
}

function deleteTask(cat, index) {
if (!confirm(“Delete this task?”)) return;
state.data[cat].splice(index, 1);
debSave(cat, state.categories.find(c=>c.id===cat).file, state.data[cat]);
openCategory(cat);
}

function addTaskUI(cat) {
showModal(`<h3 style="margin-bottom:18px;font-size:22px">New Task</h3> <input id="mt" placeholder="Title *" style="${inp()}"> <textarea id="mn" placeholder="Notes" style="${inp()}height:80px;resize:none"></textarea> <select id="mp" style="${inp()}"> <option value="normal">Normal Priority</option> <option value="high">High Priority</option> <option value="urgent">Urgent</option> <option value="low">Low Priority</option> </select> <select id="ms" style="${inp()}"> <option value="todo">To Do</option> <option value="inprogress">In Progress</option> <option value="blocked">Blocked</option> </select> <input type="date" id="md" style="${inp()}"> <button onclick="submitAddTask('${cat}')" style="${savBtn()}">Add Task</button>`);
}

function submitAddTask(cat) {
const title = document.getElementById(“mt”).value.trim();
if (!title) { alert(“Title required”); return; }
state.data[cat].unshift({
id:       Date.now().toString(),
title,
notes:    document.getElementById(“mn”).value,
priority: document.getElementById(“mp”).value,
status:   document.getElementById(“ms”).value,
date:     document.getElementById(“md”).value,
done:     false,
subtasks: []
});
debSave(cat, state.categories.find(c=>c.id===cat).file, state.data[cat]);
closeModal();
openCategory(cat);
}

function editTaskUI(cat, index) {
const t = state.data[cat][index];
showModal(` <h3 style="margin-bottom:18px;font-size:22px">Edit Task</h3> <input id="et" value="${esc(t.title||"")}" style="${inp()}"> <textarea id="en" style="${inp()}height:80px;resize:none">${esc(t.notes||"")}</textarea> <select id="ep" style="${inp()}"> ${["normal","high","urgent","low"].map(p=>`<option value=”${p}”${(t.priority||“normal”)===p?” selected”:””}>${p.charAt(0).toUpperCase()+p.slice(1)} Priority</option>`).join("")} </select> <select id="es" style="${inp()}"> ${["todo","inprogress","done","blocked"].map(s=>`<option value=”${s}”${(t.status||“todo”)===s?” selected”:””}>${s===“inprogress”?“In Progress”:s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join("")} </select> <input type="date" id="ed" value="${t.date||""}" style="${inp()}"> <button onclick="submitEditTask('${cat}',${index})" style="${savBtn()}">Update Task</button> `);
}

function submitEditTask(cat, index) {
const title = document.getElementById(“et”).value.trim();
if (!title) { alert(“Title required”); return; }
const t = state.data[cat][index];
t.title    = title;
t.notes    = document.getElementById(“en”).value;
t.priority = document.getElementById(“ep”).value;
t.status   = document.getElementById(“es”).value;
t.date     = document.getElementById(“ed”).value;
t.done     = t.status === “done”;
debSave(cat, state.categories.find(c=>c.id===cat).file, state.data[cat]);
closeModal();
openCategory(cat);
}

// ── WORKLOG ───────────────────────────────────────────────────────────────────
function renderLog() {
state.view = “log”;

const grouped = {};
state.worklog.forEach(e => {
if (!grouped[e.date]) grouped[e.date] = [];
grouped[e.date].push(e);
});
const days = Object.keys(grouped).sort((a,b) => b.localeCompare(a));
const cnt  = {bau:0,project:0,investigation:0,agentic:0};
state.worklog.forEach(e => { if (cnt[e.type] !== undefined) cnt[e.type]++; });

const abar = [“project”,“bau”,“investigation”,“agentic”].map(type => {
const col = LCOL[type];
const lbl = type===“investigation” ? “Invest.” : type.charAt(0).toUpperCase()+type.slice(1);
return `<div style="background:${col}18;border-radius:16px;padding:16px 8px;text-align:center"> <div style="color:${col};font-size:32px;font-weight:800">${cnt[type]}</div> <div style="color:${col};font-size:12px;margin-top:4px">${lbl}</div> </div>`;
}).join(””);

const entries = days.map(date => {
const es    = grouped[date];
const eHtml = es.map(e => {
const cat = state.categories.find(c=>c.id===e.category)||{name:e.category,color:”#94A3B8”};
const tc  = LCOL[e.type]||”#94A3B8”;
const tl  = e.type===“investigation”?“Investigation”:e.type.charAt(0).toUpperCase()+e.type.slice(1);
return `<div style="background:#081225;border-radius:16px;padding:16px;margin-bottom:8px;display:flex;gap:10px"> <div style="width:3px;min-height:20px;border-radius:99px;background:${cat.color};flex-shrink:0;margin-top:2px"></div> <div style="flex:1"> <div style="font-size:15px;line-height:1.5">${esc(e.text)}</div> <div style="margin-top:6px"> <span style="background:${cat.color}22;color:${cat.color};padding:2px 8px;border-radius:99px;font-size:11px;margin-right:6px">${esc(cat.name)}</span> <span style="background:${tc}22;color:${tc};padding:2px 8px;border-radius:99px;font-size:11px">${tl}</span> </div> </div> <button onclick="deleteLogEntry('${e.id}')" style="background:transparent;border:none;color:#374151;font-size:18px;cursor:pointer;padding:0 4px">✕</button> </div>`;
}).join(””);
return `<div style="margin-bottom:20px"> <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"> <span style="font-size:15px;font-weight:700">${fdate(date)}</span> <span style="color:#374151;font-size:12px;flex:1">${date}</span> <span style="background:#081225;color:#94A3B8;font-size:11px;border-radius:99px;padding:2px 10px">${es.length}</span> </div> ${eHtml} </div>`;
}).join(””);

app.innerHTML = ` <div style="background:#020617;min-height:100vh;color:white;font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding-bottom:120px"> <div style="padding:20px;border-bottom:1px solid #1E293B;background:#0B1220;position:sticky;top:0;z-index:100;display:flex;justify-content:space-between;align-items:center"> <button onclick="renderHome()" style="${circleBtn()}">←</button> <div style="font-size:24px;font-weight:bold">📋 Worklog</div> <div style="font-size:12px;color:#94A3B8">${state.worklog.length} entries</div> </div> <div style="padding:20px"> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px">${abar}</div> ${days.length ? entries : '<p style="color:#94A3B8;text-align:center;padding:40px 0">No entries yet — tap + to add</p>'} </div> <button onclick="addLogUI()" style="position:fixed;right:24px;bottom:24px;width:68px;height:68px;border-radius:50%;border:none;background:linear-gradient(135deg,#3B82F6,#8B5CF6);color:white;font-size:40px;cursor:pointer;box-shadow:0 4px 20px #3B82F655">+</button> </div>`;
}

function deleteLogEntry(id) {
state.worklog = state.worklog.filter(e => e.id !== id);
debSave(“wl”, “sb-worklog.json”, state.worklog);
renderLog();
}

function addLogUI() {
const catOpts = state.categories.map(c => `<option value="${c.id}"${c.id==="work"?" selected":""}>${c.name}</option>`).join(””);
showModal(`<h3 style="margin-bottom:18px;font-size:22px">Log Work Entry</h3> <input type="date" id="ld" value="${new Date().toISOString().slice(0,10)}" style="${inp()}"> <textarea id="lt" placeholder="What did you work on?" style="${inp()}height:90px;resize:none"></textarea> <select id="lc" style="${inp()}">${catOpts}</select> <select id="ltp" style="${inp()}"> <option value="bau">BAU Activity</option> <option value="project">Project Work</option> <option value="investigation">Investigation</option> <option value="agentic">Agentic / Idea</option> </select> <button onclick="submitLog()" style="${savBtn()}">Save Entry</button>`);
}

function submitLog() {
const text = document.getElementById(“lt”).value.trim();
if (!text) { alert(“Please describe what you worked on”); return; }
state.worklog.unshift({
id:       Date.now().toString(),
date:     document.getElementById(“ld”).value,
text,
category: document.getElementById(“lc”).value,
type:     document.getElementById(“ltp”).value,
createdAt:new Date().toISOString()
});
debSave(“wl”, “sb-worklog.json”, state.worklog);
closeModal();
renderLog();
}

// ── WEEKLY REPORT ─────────────────────────────────────────────────────────────
function renderReport() {
state.view = “report”;
const wk   = weekRange();

app.innerHTML = ` <div style="background:#020617;min-height:100vh;color:white;font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding-bottom:120px"> <div style="padding:20px;border-bottom:1px solid #1E293B;background:#0B1220;position:sticky;top:0;z-index:100;display:flex;justify-content:space-between;align-items:center"> <button onclick="renderHome()" style="${circleBtn()}">←</button> <div style="font-size:24px;font-weight:bold">📊 Weekly Report</div> <div></div> </div> <div style="padding:20px"> <div style="background:#081225;border:1px solid #1E293B;border-radius:24px;padding:24px;margin-bottom:20px"> <div style="font-size:18px;font-weight:700;margin-bottom:6px">${wk.label}</div> <div style="font-size:14px;color:#94A3B8;margin-bottom:16px">AI reads your worklog and tasks to draft your weekly email for Abhi Kapoor</div> <button onclick="buildReport()" id="repBtn" style="${savBtn()}">✨ Generate Weekly Report</button> </div> <div id="repOut" style="display:none"> <div style="display:flex;gap:10px;margin-bottom:16px"> <button onclick="copyRep()" style="flex:1;padding:14px;background:#081225;border:none;border-radius:14px;color:#94A3B8;font-size:15px;cursor:pointer">📋 Copy</button> <button onclick="dlRep()" style="flex:1;padding:14px;background:#081225;border:none;border-radius:14px;color:#94A3B8;font-size:15px;cursor:pointer">⬇ Download</button> </div> <div style="background:#081225;border-radius:20px;padding:20px;overflow-x:auto"> <pre id="repText" style="color:#C8D6E5;font-size:12px;line-height:1.8;white-space:pre-wrap;font-family:monospace"></pre> </div> </div> </div> </div>`;
}

async function buildReport() {
let key = localStorage.getItem(“anthropic_key”) || “”;
if (!key) {
key = prompt(“Enter Anthropic API key:”);
if (!key) return;
localStorage.setItem(“anthropic_key”, key.trim());
key = key.trim();
}
const btn = document.getElementById(“repBtn”);
if (btn) btn.textContent = “Generating…”;

const wk    = weekRange();
const logs  = state.worklog.filter(e => e.date >= wk.start && e.date <= wk.end);
const allTasks = [];
state.categories.forEach(cat => {
(state.data[cat.id]||[]).forEach(t => allTasks.push(Object.assign({},t,{categoryName:cat.name})));
});

const prompt = `Generate weekly work update email in this EXACT format:

Hi Sir,

Please find below my weekly work update:

-----

Agentic Solutions / Ideas

|Issue              |Summary|Next Steps|
|-------------------|-------|----------|
|[fill agentic rows]|       |          |

-----

Projects

|Project            |Status|Summary|Next Steps|
|-------------------|------|-------|----------|
|[fill project rows]|      |       |          |

-----

Troubleshooting / Investigation

|Issue                    |Summary|Next Steps|
|-------------------------|-------|----------|
|[fill investigation rows]|       |          |

-----

Please let me know if you would like additional details.

Thanks,
Abhi Kapoor

WEEK: ${wk.label}

WORKLOG THIS WEEK:
${logs.map(e=>`[${e.date}][${e.type}] ${e.text}`).join(”\n”)||”(none)”}

ALL ACTIVE TASKS:
${allTasks.filter(t=>!t.done).map(t=>`[${t.categoryName}][${t.priority||"normal"}][${t.status||"todo"}] ${t.title}${t.notes?" - "+t.notes:""}`).join(”\n”)||”(none)”}`;

try {
const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method:“POST”,
headers:{“Content-Type”:“application/json”,“x-api-key”:key,“anthropic-version”:“2023-06-01”},
body:JSON.stringify({
model:“claude-sonnet-4-20250514”,
max_tokens:2000,
system:“You are a professional email writer. Follow the exact format provided. Return ONLY the email text, nothing else.”,
messages:[{role:“user”,content:prompt}]
})
});
const data = await res.json();
const text = (data.content||[]).filter(b=>b.type===“text”).map(b=>b.text).join(””) || “Error generating report.”;
window._reportText = text;
const out = document.getElementById(“repOut”);
const pre = document.getElementById(“repText”);
if (out) out.style.display = “block”;
if (pre) pre.textContent  = text;
} catch(e) {
alert(“Error: “ + e.message);
}
if (btn) btn.textContent = “✨ Generate Weekly Report”;
}

function copyRep() {
navigator.clipboard.writeText(window._reportText||””).then(()=>{
const btn = document.querySelector(’[onclick=“copyRep()”]’);
if (btn) { btn.textContent = “✓ Copied!”; setTimeout(()=>{ btn.textContent = “📋 Copy”; },2000); }
});
}

function dlRep() {
const a = document.createElement(“a”);
a.href     = “data:text/plain;charset=utf-8,” + encodeURIComponent(window._reportText||””);
a.download = “Weekly-Report-” + new Date().toISOString().slice(0,10) + “.txt”;
a.click();
}

// ── CATEGORY MANAGEMENT ───────────────────────────────────────────────────────
function addCategoryUI() {
showModal(`<h3 style="margin-bottom:18px;font-size:22px">New Category</h3> <input id="cname" placeholder="Category name" style="${inp()}"> <input id="cicon" placeholder="Icon emoji e.g. 📁" style="${inp()}"> <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"> <span style="color:#94A3B8;font-size:15px">Color:</span> <input type="color" id="ccolor" value="#3B82F6" style="width:52px;height:40px;border:none;border-radius:10px;cursor:pointer;background:transparent"> </div> <button onclick="submitAddCategory()" style="${savBtn()}">Create Category</button>`);
}

function submitAddCategory() {
const name = document.getElementById(“cname”).value.trim();
if (!name) { alert(“Name required”); return; }
const id  = name.toLowerCase().replace(/\s+/g,”-”) + “-” + Date.now().toString(36);
const cat = {
id, name,
icon:  document.getElementById(“cicon”).value || “📁”,
color: document.getElementById(“ccolor”).value,
file:  id + “.json”
};
state.categories.push(cat);
state.data[id] = [];
debSave(“cats”, “sb-categories.json”, state.categories);
closeModal();
renderHome();
}

// ── TOKEN & SYNC ──────────────────────────────────────────────────────────────
async function setToken() {
showModal(`<h3 style="margin-bottom:18px;font-size:22px">GitHub Token</h3> <p style="color:#94A3B8;font-size:14px;margin-bottom:14px">Required to save data back to GitHub.<br>Get it at: github.com/settings/tokens</p> <input type="password" id="tok" value="${state.token||""}" placeholder="ghp_..." style="${inp()}"> <button onclick="submitToken()" style="${savBtn()}">Save Token</button>`);
}

function submitToken() {
const t = document.getElementById(“tok”).value.trim();
state.token = t;
localStorage.setItem(“github_token”, t);
closeModal();
setStatus(“Token saved ✓”);
}

async function syncAll() {
if (!state.token) { setToken(); return; }
setStatus(“Syncing all…”);
for (const cat of state.categories) {
await saveFile(cat.file, state.data[cat.id]);
}
await saveFile(“sb-categories.json”, state.categories);
await saveFile(“sb-worklog.json”,    state.worklog);
setStatus(“All synced ✓”);
}

async function syncCategory(id) {
if (!state.token) { setToken(); return; }
setStatus(“Saving…”);
const cat = state.categories.find(c => c.id === id);
await saveFile(cat.file, state.data[id]);
setStatus(“Saved ✓”);
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function showModal(html) {
let mc = document.getElementById(”_mc”);
if (!mc) { mc = document.createElement(“div”); mc.id = “_mc”; document.body.appendChild(mc); }
mc.innerHTML = ` <div onclick="if(event.target===this)closeModal()" style="position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:flex-end;justify-content:center;z-index:200"> <div style="background:#111827;border-radius:24px 24px 0 0;padding:24px;width:100%;max-width:430px;max-height:88vh;overflow-y:auto"> <div style="width:36px;height:4px;background:#374151;border-radius:99px;margin:0 auto 20px"></div> ${html} <button onclick="closeModal()" style="margin-top:10px;width:100%;padding:14px;border:none;border-radius:14px;background:#1E293B;color:#94A3B8;font-size:16px;cursor:pointer">Cancel</button> </div> </div>`;
}

function closeModal() {
const mc = document.getElementById(”_mc”);
if (mc) mc.innerHTML = “”;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────
function esc(s) {
return (s||””).replace(/&/g,”&”).replace(/</g,”<”).replace(/>/g,”>”).replace(/”/g,”"”);
}

function fdate(iso) {
if (!iso) return “”;
const today = new Date(); today.setHours(0,0,0,0);
const dt    = new Date(iso); dt.setHours(0,0,0,0);
const d     = Math.round((dt-today)/86400000);
if (d===0)  return “Today”;
if (d===1)  return “Tomorrow”;
if (d===-1) return “Yesterday”;
if (d<0)    return Math.abs(d)+“d ago”;
if (d<8)    return new Date(iso).toLocaleDateString(“en-US”,{weekday:“short”});
return new Date(iso).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”});
}

function weekRange() {
const d = new Date(), day = d.getDay();
const mon = new Date(d); mon.setDate(d.getDate()-((day+6)%7));
const sun = new Date(mon); sun.setDate(mon.getDate()+6);
const fmt = x => x.toLocaleDateString(“en-GB”,{day:“2-digit”,month:“short”,year:“numeric”});
return {start:mon.toISOString().slice(0,10), end:sun.toISOString().slice(0,10), label:`${fmt(mon)} – ${fmt(sun)}`};
}

function btnStyle()   { return “background:#081225;color:white;border:1px solid #1E293B;padding:10px 14px;border-radius:12px;cursor:pointer;font-size:14px”; }
function circleBtn()  { return “width:50px;height:50px;border-radius:50%;border:none;background:#081225;color:white;font-size:22px;cursor:pointer”; }
function inp()        { return “width:100%;background:#1E293B;border:none;color:white;padding:14px;border-radius:14px;margin-bottom:12px;font-size:16px;font-family:inherit;display:block;outline:none;”; }
function savBtn()     { return “width:100%;padding:16px;border:none;border-radius:14px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);color:white;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit”; }

// ── GLOBALS ───────────────────────────────────────────────────────────────────
window.renderHome         = renderHome;
window.openCategory       = openCategory;
window.setCatFilter       = setCatFilter;
window.toggleTask         = toggleTask;
window.toggleSubtask      = toggleSubtask;
window.deleteTask         = deleteTask;
window.addTaskUI          = addTaskUI;
window.submitAddTask      = submitAddTask;
window.editTaskUI         = editTaskUI;
window.submitEditTask     = submitEditTask;
window.addCategoryUI      = addCategoryUI;
window.submitAddCategory  = submitAddCategory;
window.renderLog          = renderLog;
window.addLogUI           = addLogUI;
window.submitLog          = submitLog;
window.deleteLogEntry     = deleteLogEntry;
window.renderReport       = renderReport;
window.buildReport        = buildReport;
window.copyRep            = copyRep;
window.dlRep              = dlRep;
window.setToken           = setToken;
window.submitToken        = submitToken;
window.syncAll            = syncAll;
window.syncCategory       = syncCategory;
window.closeModal         = closeModal;
