const REPO_OWNER = “abhicome”;
const REPO_NAME = “second-brain”;
const DATA_PATH = “data”;

const app =
document.getElementById(“root”) ||
document.getElementById(“app”);

if (!app) {
document.body.innerHTML = `<div style=" background:#020617; color:white; min-height:100vh; padding:40px; font-family:sans-serif; "> Root container missing </div>`;
throw new Error(“Root container missing”);
}

const DEFAULT_CATEGORIES = [
{
id: “work”,
name: “Work”,
color: “#3B82F6”,
file: “work.json”,
icon: “W”
},
{
id: “projects”,
name: “Projects”,
color: “#8B5CF6”,
file: “projects.json”,
icon: “P”
},
{
id: “personal”,
name: “Personal”,
color: “#EF4444”,
file: “personal.json”,
icon: “Me”
},
{
id: “knowledge”,
name: “Knowledge”,
color: “#2563EB”,
file: “knowledge.json”,
icon: “K”
},
{
id: “bills”,
name: “Bills”,
color: “#F59E0B”,
file: “bills.json”,
icon: “$”
},
{
id: “watchlist”,
name: “Watchlist”,
color: “#D946EF”,
file: “watchlist.json”,
icon: “TV”
}
];

let state = {
token: localStorage.getItem(“github_token”) || “”,
categories: [],
data: {},
worklog: [],
current: null
};

init();

async function init() {
try {
renderLoading();
await loadCategories();
await loadAllData();
await loadWorklog();
renderHome();
} catch (e) {
console.error(e);
app.innerHTML = `<div style="color:white;padding:30px;font-family:sans-serif;"> Failed to load app </div>`;
}
}

function renderLoading() {
app.innerHTML = `<div style="color:white;padding:30px;font-size:20px;"> Loading... </div>`;
}

function rawUrl(file) {
return `./data/${file}?v=${Date.now()}`;
}

async function loadCategories() {
try {
const res = await fetch(rawUrl(“sb-categories.json”));
const text = await res.text();
const json = JSON.parse(text);
state.categories =
Array.isArray(json) && json.length
? json
: DEFAULT_CATEGORIES;
} catch (e) {
console.error(“Category load error”, e);
state.categories = DEFAULT_CATEGORIES;
}
}

async function loadAllData() {
for (const cat of state.categories) {
try {
const res = await fetch(rawUrl(cat.file));
const text = await res.text();
const json = JSON.parse(text);
state.data[cat.id] = Array.isArray(json) ? json : [];
} catch (e) {
console.error(“Failed loading”, cat.file, e);
state.data[cat.id] = [];
}
}
}

async function loadWorklog() {
try {
const res = await fetch(rawUrl(“sb-worklog.json”));
const text = await res.text();
const json = JSON.parse(text);
state.worklog = Array.isArray(json) ? json : (json.entries || []);
} catch (e) {
state.worklog = [];
}
}

// ── HOME ──────────────────────────────────────────────────────────────────────

function renderHome() {
let total = 0;
let done = 0;

state.categories.forEach(cat => {
const tasks = state.data[cat.id] || [];
total += tasks.length;
done += tasks.filter(t => t.done).length;
});

app.innerHTML = `
<div style="
background:#020617;
min-height:100vh;
color:white;
padding:20px;
font-family:sans-serif;
padding-bottom:120px;
">

```
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <div style="font-size:34px;font-weight:bold;">Second Brain</div>
    <div style="display:flex;gap:10px;">
      <button onclick="setToken()" style="${buttonStyle()}">Key</button>
      <button onclick="syncAll()" style="${buttonStyle()}">Sync</button>
      <button onclick="openLog()" style="${buttonStyle()}">Log</button>
      <button onclick="openReport()" style="${buttonStyle()}">Report</button>
    </div>
  </div>

  <div style="font-size:44px;font-weight:bold;">Your Second Brain</div>
  <div style="margin-top:10px;color:#94A3B8;">${new Date().toDateString()}</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:30px;">
    ${statCard(total,"TOTAL","#3B82F6")}
    ${statCard(done,"DONE","#10B981")}
    ${statCard(total-done,"ACTIVE","#F59E0B")}
    ${statCard(0,"OVERDUE","#EF4444")}
  </div>

  <div style="margin-top:40px;margin-bottom:20px;font-size:22px;font-weight:bold;">Categories</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    ${state.categories.map(cat => {
      const count = (state.data[cat.id] || []).filter(t => !t.done).length;
      return `
        <div onclick="openCategory('${cat.id}')" style="
          background:#081225;
          border:2px solid ${cat.color};
          border-radius:24px;
          padding:20px;
          cursor:pointer;
          position:relative;
        ">
          <div style="font-size:32px;">${cat.icon}</div>
          <div style="margin-top:14px;font-size:28px;font-weight:bold;">${cat.name}</div>
          <div style="margin-top:10px;color:#94A3B8;">${count} open</div>
          ${count > 0 ? `<div style="position:absolute;top:12px;right:12px;background:${cat.color};color:white;border-radius:99px;font-size:12px;font-weight:bold;padding:2px 8px;">${count}</div>` : ""}
        </div>
      `;
    }).join("")}
  </div>

  <button onclick="addCategory()" style="
    position:fixed;
    right:24px;
    bottom:110px;
    width:72px;
    height:72px;
    border-radius:50%;
    border:none;
    background:#3B82F6;
    color:white;
    font-size:42px;
    cursor:pointer;
  ">+</button>

</div>
```

`;
}

function statCard(value,label,color) {
return `<div style="background:#081225;border-radius:22px;padding:30px;text-align:center;"> <div style="color:${color};font-size:42px;font-weight:bold;">${value}</div> <div style="margin-top:10px;color:#94A3B8;">${label}</div> </div>`;
}

// ── CATEGORY VIEW ─────────────────────────────────────────────────────────────

function openCategory(id) {
state.current = id;
const category = state.categories.find(c => c.id === id);
const tasks = state.data[id] || [];

app.innerHTML = `
<div style="
background:#020617;
min-height:100vh;
color:white;
padding:20px;
font-family:sans-serif;
padding-bottom:120px;
">

```
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <button onclick="renderHome()" style="${circleButton()}">&#8592;</button>
    <div style="font-size:40px;font-weight:bold;color:${category.color};">${category.name}</div>
    <button onclick="syncCategory('${id}')" style="${circleButton()}">&#8635;</button>
  </div>

  <div style="margin-top:30px;">
    ${tasks.map((task,index) => `
      <div style="
        background:#081225;
        border-radius:22px;
        padding:20px;
        margin-bottom:16px;
      ">
        <div style="display:flex;gap:16px;">
          <input
            type="checkbox"
            ${task.done ? "checked" : ""}
            onchange="toggleTask('${id}',${index})"
            style="width:24px;height:24px;margin-top:5px;"
          >
          <div style="flex:1">
            <div
              onclick="editTask('${id}',${index})"
              style="
                font-size:24px;
                font-weight:bold;
                cursor:pointer;
                text-decoration:${task.done ? "line-through" : "none"};
              "
            >${task.title || ""}</div>

            ${task.priority ? `
              <span style="
                display:inline-block;
                margin-top:8px;
                background:${task.priority === "urgent" ? "#3B1F1F" : task.priority === "high" ? "#3B2A12" : "#1E293B"};
                color:${task.priority === "urgent" ? "#F87171" : task.priority === "high" ? "#FBBF24" : "#94A3B8"};
                padding:4px 12px;
                border-radius:99px;
                font-size:12px;
                font-weight:bold;
              ">${task.priority}</span>
            ` : ""}

            ${task.status && task.status !== "todo" ? `
              <span style="
                display:inline-block;
                margin-top:8px;
                margin-left:6px;
                background:#1E293B;
                color:${task.status === "done" ? "#10B981" : task.status === "inprogress" ? "#3B82F6" : task.status === "blocked" ? "#EF4444" : "#94A3B8"};
                padding:4px 12px;
                border-radius:99px;
                font-size:12px;
              ">${task.status === "inprogress" ? "In Progress" : task.status}</span>
            ` : ""}

            ${task.notes ? `
              <div style="margin-top:12px;color:#94A3B8;line-height:1.5;">${task.notes}</div>
            ` : ""}

            ${task.date ? `
              <div style="margin-top:8px;color:#94A3B8;font-size:13px;">${task.date}</div>
            ` : ""}

            ${task.subtasks && task.subtasks.length ? `
              <div style="margin-top:18px;">
                ${task.subtasks.map((s,si) => `
                  <div style="display:flex;gap:10px;margin-bottom:10px;">
                    <input
                      type="checkbox"
                      ${s.done ? "checked" : ""}
                      onchange="toggleSubtask('${id}',${index},${si})"
                    >
                    <div>${s.title}</div>
                  </div>
                `).join("")}
              </div>
            ` : ""}

          </div>

          <button
            onclick="deleteTask('${id}',${index})"
            style="
              background:transparent;
              border:none;
              color:#374151;
              font-size:20px;
              cursor:pointer;
              padding:4px;
            "
          >x</button>

        </div>
      </div>
    `).join("")}
  </div>

  <button onclick="addTask('${id}')" style="
    position:fixed;
    right:24px;
    bottom:110px;
    width:72px;
    height:72px;
    border-radius:50%;
    border:none;
    background:${category.color};
    color:white;
    font-size:42px;
    cursor:pointer;
  ">+</button>

</div>
```

`;
}

// ── TASK CRUD ─────────────────────────────────────────────────────────────────

function toggleTask(cat,index) {
state.data[cat][index].done = !state.data[cat][index].done;
if (state.data[cat][index].done) state.data[cat][index].status = “done”;
openCategory(cat);
}

function toggleSubtask(cat,index,si) {
state.data[cat][index].subtasks[si].done =
!state.data[cat][index].subtasks[si].done;
openCategory(cat);
}

function addTask(cat) {
showModal(`<h3 style="margin-bottom:18px;font-size:20px;">New Task</h3> <input id="at_title" placeholder="Title *" style="${modalInput()}"> <textarea id="at_notes" placeholder="Notes" style="${modalInput()}height:80px;resize:none;"></textarea> <select id="at_priority" style="${modalInput()}"> <option value="normal">Normal Priority</option> <option value="high">High Priority</option> <option value="urgent">Urgent</option> <option value="low">Low Priority</option> </select> <select id="at_status" style="${modalInput()}"> <option value="todo">To Do</option> <option value="inprogress">In Progress</option> <option value="blocked">Blocked</option> </select> <input type="date" id="at_date" style="${modalInput()}"> <button onclick="submitAddTask('${cat}')" style="${modalButton()}">Add Task</button>`);
}

function submitAddTask(cat) {
const title = document.getElementById(“at_title”).value.trim();
if (!title) { alert(“Title required”); return; }
state.data[cat].unshift({
title,
notes:    document.getElementById(“at_notes”).value,
priority: document.getElementById(“at_priority”).value,
status:   document.getElementById(“at_status”).value,
date:     document.getElementById(“at_date”).value,
done:     false,
subtasks: []
});
closeModal();
openCategory(cat);
}

function editTask(cat,index) {
const t = state.data[cat][index];
showModal(`<h3 style="margin-bottom:18px;font-size:20px;">Edit Task</h3> <input id="et_title" value="${(t.title||"").replace(/"/g,"&quot;")}" style="${modalInput()}"> <textarea id="et_notes" style="${modalInput()}height:80px;resize:none;">${t.notes||""}</textarea> <select id="et_priority" style="${modalInput()}"> <option value="normal" ${(t.priority||"normal")==="normal"?"selected":""}>Normal Priority</option> <option value="high"   ${t.priority==="high"?"selected":""}>High Priority</option> <option value="urgent" ${t.priority==="urgent"?"selected":""}>Urgent</option> <option value="low"    ${t.priority==="low"?"selected":""}>Low Priority</option> </select> <select id="et_status" style="${modalInput()}"> <option value="todo"       ${(t.status||"todo")==="todo"?"selected":""}>To Do</option> <option value="inprogress" ${t.status==="inprogress"?"selected":""}>In Progress</option> <option value="done"       ${t.status==="done"?"selected":""}>Done</option> <option value="blocked"    ${t.status==="blocked"?"selected":""}>Blocked</option> </select> <input type="date" id="et_date" value="${t.date||""}" style="${modalInput()}"> <button onclick="submitEditTask('${cat}',${index})" style="${modalButton()}">Update Task</button>`);
}

function submitEditTask(cat,index) {
const title = document.getElementById(“et_title”).value.trim();
if (!title) { alert(“Title required”); return; }
const t = state.data[cat][index];
t.title    = title;
t.notes    = document.getElementById(“et_notes”).value;
t.priority = document.getElementById(“et_priority”).value;
t.status   = document.getElementById(“et_status”).value;
t.date     = document.getElementById(“et_date”).value;
t.done     = t.status === “done”;
closeModal();
openCategory(cat);
}

function deleteTask(cat,index) {
if (!confirm(“Delete this task?”)) return;
state.data[cat].splice(index,1);
openCategory(cat);
}

// ── WORKLOG ───────────────────────────────────────────────────────────────────

function openLog() {
const grouped = {};
state.worklog.forEach(e => {
if (!grouped[e.date]) grouped[e.date] = [];
grouped[e.date].push(e);
});
const days = Object.keys(grouped).sort((a,b) => b.localeCompare(a));

const cnt = {bau:0,project:0,investigation:0,agentic:0};
state.worklog.forEach(e => { if (cnt[e.type] !== undefined) cnt[e.type]++; });

const LCOL = {bau:”#94A3B8”,project:”#8B5CF6”,investigation:”#EF4444”,agentic:”#10B981”};

app.innerHTML = `
<div style="
background:#020617;
min-height:100vh;
color:white;
padding:20px;
font-family:sans-serif;
padding-bottom:120px;
">

```
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
    <button onclick="renderHome()" style="${circleButton()}">&#8592;</button>
    <div style="font-size:28px;font-weight:bold;">Worklog</div>
    <div style="font-size:13px;color:#94A3B8;">${state.worklog.length} entries</div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px;">
    ${["project","bau","investigation","agentic"].map(type => `
      <div style="background:${LCOL[type]}18;border-radius:16px;padding:14px 8px;text-align:center;">
        <div style="color:${LCOL[type]};font-size:28px;font-weight:800;">${cnt[type]}</div>
        <div style="color:${LCOL[type]};font-size:11px;margin-top:4px;">${type === "investigation" ? "Invest." : type.charAt(0).toUpperCase()+type.slice(1)}</div>
      </div>
    `).join("")}
  </div>

  ${days.length ? days.map(date => {
    const es = grouped[date];
    return `
      <div style="margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span style="font-size:14px;font-weight:700;">${fmtDate(date)}</span>
          <span style="color:#374151;font-size:12px;flex:1;">${date}</span>
          <span style="background:#081225;color:#94A3B8;font-size:11px;border-radius:99px;padding:2px 10px;">${es.length}</span>
        </div>
        ${es.map(e => {
          const cat = state.categories.find(c => c.id === e.category) || {name:e.category,color:"#94A3B8"};
          const tc  = LCOL[e.type] || "#94A3B8";
          return `
            <div style="background:#081225;border-radius:16px;padding:16px;margin-bottom:8px;display:flex;gap:10px;">
              <div style="width:3px;min-height:20px;border-radius:99px;background:${cat.color};flex-shrink:0;margin-top:2px;"></div>
              <div style="flex:1;">
                <div style="font-size:15px;line-height:1.5;">${e.text}</div>
                <div style="margin-top:6px;">
                  <span style="background:${cat.color}22;color:${cat.color};padding:2px 8px;border-radius:99px;font-size:11px;margin-right:6px;">${cat.name}</span>
                  <span style="background:${tc}22;color:${tc};padding:2px 8px;border-radius:99px;font-size:11px;">${e.type === "investigation" ? "Investigation" : e.type.charAt(0).toUpperCase()+e.type.slice(1)}</span>
                </div>
              </div>
              <button onclick="deleteLogEntry('${e.id}')" style="background:transparent;border:none;color:#374151;font-size:18px;cursor:pointer;padding:0 4px;">x</button>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("") : `<p style="color:#94A3B8;text-align:center;padding:40px 0;">No entries yet - tap + to add</p>`}

  <button onclick="addLogEntry()" style="
    position:fixed;
    right:24px;
    bottom:110px;
    width:72px;
    height:72px;
    border-radius:50%;
    border:none;
    background:linear-gradient(135deg,#3B82F6,#8B5CF6);
    color:white;
    font-size:42px;
    cursor:pointer;
  ">+</button>

</div>
```

`;
}

function addLogEntry() {
const catOpts = state.categories.map(c =>
`<option value="${c.id}" ${c.id === "work" ? "selected" : ""}>${c.name}</option>`
).join(””);

showModal(`<h3 style="margin-bottom:18px;font-size:20px;">Log Work Entry</h3> <input type="date" id="le_date" value="${new Date().toISOString().slice(0,10)}" style="${modalInput()}"> <textarea id="le_text" placeholder="What did you work on?" style="${modalInput()}height:90px;resize:none;"></textarea> <select id="le_cat" style="${modalInput()}">${catOpts}</select> <select id="le_type" style="${modalInput()}"> <option value="bau">BAU Activity</option> <option value="project">Project Work</option> <option value="investigation">Investigation</option> <option value="agentic">Agentic / Idea</option> </select> <button onclick="submitLogEntry()" style="${modalButton()}">Save Entry</button>`);
}

function submitLogEntry() {
const text = document.getElementById(“le_text”).value.trim();
if (!text) { alert(“Please describe what you worked on”); return; }
state.worklog.unshift({
id:       Date.now().toString(),
date:     document.getElementById(“le_date”).value,
text,
category: document.getElementById(“le_cat”).value,
type:     document.getElementById(“le_type”).value,
createdAt:new Date().toISOString()
});
debSave(“wl”, “sb-worklog.json”, state.worklog);
closeModal();
openLog();
}

function deleteLogEntry(id) {
if (!confirm(“Delete this entry?”)) return;
state.worklog = state.worklog.filter(e => e.id !== id);
debSave(“wl”, “sb-worklog.json”, state.worklog);
openLog();
}

// ── WEEKLY REPORT ─────────────────────────────────────────────────────────────

function openReport() {
const wk = weekRange();

app.innerHTML = `
<div style="
background:#020617;
min-height:100vh;
color:white;
padding:20px;
font-family:sans-serif;
padding-bottom:120px;
">

```
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
    <button onclick="renderHome()" style="${circleButton()}">&#8592;</button>
    <div style="font-size:28px;font-weight:bold;">Weekly Report</div>
    <div></div>
  </div>

  <div style="background:#081225;border:1px solid #1E293B;border-radius:24px;padding:24px;margin-bottom:20px;">
    <div style="font-size:18px;font-weight:700;margin-bottom:6px;">${wk.label}</div>
    <div style="font-size:14px;color:#94A3B8;margin-bottom:16px;">AI reads your worklog and tasks to draft your weekly email</div>
    <button onclick="buildReport()" id="repBtn" style="${modalButton()}">Generate Weekly Report</button>
  </div>

  <div id="repOut" style="display:none;">
    <div style="display:flex;gap:10px;margin-bottom:16px;">
      <button onclick="copyReport()" style="
        flex:1;padding:14px;
        background:#081225;border:1px solid #1E293B;
        border-radius:14px;color:#94A3B8;font-size:15px;cursor:pointer;
      ">Copy</button>
      <button onclick="dlReport()" style="
        flex:1;padding:14px;
        background:#081225;border:1px solid #1E293B;
        border-radius:14px;color:#94A3B8;font-size:15px;cursor:pointer;
      ">Download</button>
    </div>
    <div style="background:#081225;border-radius:20px;padding:20px;overflow-x:auto;">
      <pre id="repText" style="color:#C8D6E5;font-size:12px;line-height:1.8;white-space:pre-wrap;font-family:monospace;"></pre>
    </div>
  </div>

</div>
```

`;
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

const wk   = weekRange();
const logs  = state.worklog.filter(e => e.date >= wk.start && e.date <= wk.end);
const allTasks = [];
state.categories.forEach(cat => {
(state.data[cat.id] || []).forEach(t => {
allTasks.push({title:t.title, notes:t.notes, priority:t.priority, status:t.status, done:t.done, category:cat.name});
});
});

const prompt = “Generate weekly work update email in this EXACT format:\n\nHi Sir,\n\nPlease find below my weekly work update:\n\n—\n\nAgentic Solutions / Ideas\n\n| Issue | Summary | Next Steps |\n|——|———|————|\n\n—\n\nProjects\n\n| Project | Status | Summary | Next Steps |\n|––––|––––|———|————|\n\n—\n\nTroubleshooting / Investigation\n\n| Issue | Summary | Next Steps |\n|——|———|————|\n\n—\n\nPlease let me know if you would like additional details.\n\nThanks,\nAbhi Kapoor\n\nWEEK: “ + wk.label + “\n\nWORKLOG THIS WEEK:\n” + (logs.map(e => “[” + e.date + “][” + e.type + “] “ + e.text).join(”\n”) || “(none)”) + “\n\nACTIVE TASKS:\n” + (allTasks.filter(t => !t.done).map(t => “[” + t.category + “][” + (t.priority||“normal”) + “] “ + t.title + (t.notes ? “ - “ + t.notes : “”)).join(”\n”) || “(none)”);

try {
const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method: “POST”,
headers: {
“Content-Type”:    “application/json”,
“x-api-key”:       key,
“anthropic-version”:“2023-06-01”
},
body: JSON.stringify({
model:      “claude-sonnet-4-20250514”,
max_tokens: 2000,
system:     “You are a professional email writer. Follow the exact format provided. Return ONLY the email text.”,
messages:   [{role:“user”, content:prompt}]
})
});

```
const data = await res.json();
const text = (data.content || [])
  .filter(b => b.type === "text")
  .map(b => b.text)
  .join("") || "Error generating report.";

window._reportText = text;

const out = document.getElementById("repOut");
const pre = document.getElementById("repText");
if (out) out.style.display = "block";
if (pre) pre.textContent   = text;
```

} catch(e) {
alert(“Error: “ + e.message);
}

if (btn) btn.textContent = “Generate Weekly Report”;
}

function copyReport() {
navigator.clipboard.writeText(window._reportText || “”).then(function() {
alert(“Copied!”);
});
}

function dlReport() {
const a = document.createElement(“a”);
a.href = “data:text/plain;charset=utf-8,” + encodeURIComponent(window._reportText || “”);
a.download = “Weekly-Report-” + new Date().toISOString().slice(0,10) + “.txt”;
a.click();
}

// ── CATEGORY MANAGEMENT ───────────────────────────────────────────────────────

function addCategory() {
const name = prompt(“Category name”);
if (!name) return;

const id   = name.toLowerCase().replace(/\s+/g,”-”);
const file = id + “.json”;

const category = {
id,
name,
file,
icon:  name.slice(0,2).toUpperCase(),
color: “#” + Math.floor(Math.random()*16777215).toString(16).padStart(6,“0”)
};

state.categories.push(category);
state.data[id] = [];
renderHome();
}

// ── TOKEN & SYNC ──────────────────────────────────────────────────────────────

async function setToken() {
const token = prompt(“Enter GitHub Token”, state.token || “”);
if (!token) return;
state.token = token;
localStorage.setItem(“github_token”, token);
alert(“Token saved”);
}

async function syncAll() {
if (!state.token) { alert(“Add token first”); return; }
for (const cat of state.categories) {
await saveFile(cat.file, state.data[cat.id]);
}
await saveFile(“sb-categories.json”, state.categories);
await saveFile(“sb-worklog.json”,    state.worklog);
alert(“Sync complete”);
}

async function syncCategory(id) {
if (!state.token) { alert(“Add token first”); return; }
const cat = state.categories.find(c => c.id === id);
await saveFile(cat.file, state.data[id]);
alert(“Saved”);
}

async function saveFile(file,data) {
const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}/${file}`;

let sha = null;
try {
const existing     = await fetch(url, {headers:{Authorization:`token ${state.token}`}});
const existingJson = await existing.json();
sha = existingJson.sha;
} catch {}

const content = btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2))));

await fetch(url, {
method:  “PUT”,
headers: {
Authorization:  `token ${state.token}`,
“Content-Type”: “application/json”
},
body: JSON.stringify({
message: `update ${file}`,
content,
sha
})
});
}

// ── AUTO-SAVE (debounced) ─────────────────────────────────────────────────────

const _saveTimers = {};

function debSave(key, file, data) {
clearTimeout(_saveTimers[key]);
_saveTimers[key] = setTimeout(async function() {
if (!state.token) return;
await saveFile(file, data);
}, 1500);
}

// ── MODAL HELPERS ─────────────────────────────────────────────────────────────

function showModal(html) {
let mc = document.getElementById(”_mc”);
if (!mc) {
mc = document.createElement(“div”);
mc.id = “_mc”;
document.body.appendChild(mc);
}
mc.innerHTML = `<div onclick="if(event.target===this)closeModal()" style=" position:fixed;inset:0; background:rgba(0,0,0,.8); display:flex;align-items:flex-end; justify-content:center;z-index:200; "> <div style=" background:#111827; border-radius:24px 24px 0 0; padding:24px; width:100%;max-width:430px; max-height:88vh;overflow-y:auto; "> <div style="width:36px;height:4px;background:#374151;border-radius:99px;margin:0 auto 20px;"></div> ${html} <button onclick="closeModal()" style=" margin-top:10px;width:100%; padding:14px;border:none; border-radius:14px; background:#1E293B;color:#94A3B8; font-size:16px;cursor:pointer; ">Cancel</button> </div> </div>`;
}

function closeModal() {
const mc = document.getElementById(”_mc”);
if (mc) mc.innerHTML = “”;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function fmtDate(iso) {
if (!iso) return “”;
const today = new Date(); today.setHours(0,0,0,0);
const dt    = new Date(iso); dt.setHours(0,0,0,0);
const d     = Math.round((dt-today)/86400000);
if (d === 0)  return “Today”;
if (d === 1)  return “Tomorrow”;
if (d === -1) return “Yesterday”;
if (d < 0)   return Math.abs(d) + “d ago”;
if (d < 8)   return new Date(iso).toLocaleDateString(“en-US”,{weekday:“short”});
return new Date(iso).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”});
}

function weekRange() {
const d   = new Date(), day = d.getDay();
const mon = new Date(d); mon.setDate(d.getDate()-((day+6)%7));
const sun = new Date(mon); sun.setDate(mon.getDate()+6);
function fmt(x) {
return x.toLocaleDateString(“en-GB”,{day:“2-digit”,month:“short”,year:“numeric”});
}
return {
start: mon.toISOString().slice(0,10),
end:   sun.toISOString().slice(0,10),
label: fmt(mon) + “ - “ + fmt(sun)
};
}

function buttonStyle() {
return “background:#081225;color:white;border:none;padding:12px 16px;border-radius:14px;cursor:pointer;font-size:14px;”;
}

function circleButton() {
return “width:54px;height:54px;border-radius:50%;border:none;background:#081225;color:white;font-size:24px;cursor:pointer;”;
}

function modalInput() {
return “width:100%;background:#1E293B;border:none;color:white;padding:14px;border-radius:14px;margin-bottom:12px;font-size:16px;font-family:inherit;display:block;outline:none;”;
}

function modalButton() {
return “width:100%;padding:16px;border:none;border-radius:14px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);color:white;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;”;
}

// ── GLOBALS ───────────────────────────────────────────────────────────────────

window.renderHome      = renderHome;
window.openCategory    = openCategory;
window.toggleTask      = toggleTask;
window.toggleSubtask   = toggleSubtask;
window.addTask         = addTask;
window.submitAddTask   = submitAddTask;
window.editTask        = editTask;
window.submitEditTask  = submitEditTask;
window.deleteTask      = deleteTask;
window.addCategory     = addCategory;
window.setToken        = setToken;
window.syncAll         = syncAll;
window.syncCategory    = syncCategory;
window.openLog         = openLog;
window.addLogEntry     = addLogEntry;
window.submitLogEntry  = submitLogEntry;
window.deleteLogEntry  = deleteLogEntry;
window.openReport      = openReport;
window.buildReport     = buildReport;
window.copyReport      = copyReport;
window.dlReport        = dlReport;
window.closeModal      = closeModal;
