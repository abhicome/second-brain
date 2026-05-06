const GITHUB_USER = 'abhicome';
const REPO = 'second-brain';
const BRANCH = 'main';

const FILES = {
tasks:'data/sb-tasks.json',
worklog:'data/sb-worklog.json',
categories:'data/sb-categories.json'
};

let TASKS = [];
let WORKLOG = [];
let CATEGORIES = [];

let currentView = 'home';

const content = document.getElementById('content');

function statusText(t,color){
const s=document.getElementById('status');
s.innerText=t;
if(color) s.style.color=color;
}

function setToken(){

const existing =
localStorage.getItem('gh_token') || '';

const t =
prompt(
'GitHub Personal Access Token',
existing
);

if(t){

localStorage.setItem('gh_token',t);

alert('Token saved locally');

}

}

async function fetchJson(path){

const url =
`https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/${BRANCH}/${path}?t=${Date.now()}`;

const r = await fetch(url);

if(!r.ok){

throw new Error(
'Failed to fetch: ' + path
);

}

return await r.json();

}

async function syncNow(){

try{

statusText(
'Syncing...',
'#FBBF24'
);

const tData =
await fetchJson(FILES.tasks);

const wData =
await fetchJson(FILES.worklog);

const cData =
await fetchJson(FILES.categories);

TASKS =
tData.items ||
tData.tasks ||
tData.data ||
tData ||
[];

WORKLOG =
wData.entries ||
wData.worklog ||
wData.items ||
wData ||
[];

CATEGORIES =
cData.categories ||
cData.items ||
cData.data ||
cData ||
[];

if(!Array.isArray(TASKS))
TASKS=[];

if(!Array.isArray(WORKLOG))
WORKLOG=[];

if(!Array.isArray(CATEGORIES))
CATEGORIES=[];

statusText(
'Synced: ' +
TASKS.length +
' tasks',
'#34D399'
);

render();

}catch(e){

console.error(e);

statusText(
'Sync failed',
'#F87171'
);

alert(
'Sync failed\n\n' +
e.message
);

}

}

function setView(v){

currentView=v;

render();

}

function statCard(
num,
label,
color
){

return `

<div class="stat">

<div class="num ${color}">
${num}
</div>

<div class="label">
${label}
</div>

</div>

`;

}

function renderHome(){

const total =
TASKS.length;

const done =
TASKS.filter(x =>
(x.status||'')
.toLowerCase()==='done'
).length;

const active =
TASKS.filter(x =>
(x.status||'')
.toLowerCase()!=='done'
).length;

const overdue =
TASKS.filter(x =>
x.overdue===true
).length;

const urgent =
TASKS.filter(x => {

const p =
(x.priority||'')
.toLowerCase();

return (
p==='urgent' ||
p==='high'
);

}).slice(0,5);

let html = `

<div class="hero">

<h2>
Your Second Brain
</h2>

<p>
${new Date().toDateString()}
</p>

</div>

<div class="stats">

${statCard(
total,
'TOTAL',
'blue'
)}

${statCard(
done,
'DONE',
'green'
)}

${statCard(
active,
'ACTIVE',
'yellow'
)}

${statCard(
overdue,
'OVERDUE',
'red'
)}

</div>

<div class="section-title">
URGENT & HIGH PRIORITY
</div>

`;

urgent.forEach(t => {

const pri =
(t.priority||'normal')
.toLowerCase();

html += `

<div class="task">

<div>

<div class="task-title">
${t.title || 'Untitled'}
</div>

<div style="
margin-top:8px;
color:#94A3B8;
font-size:14px;
">
${t.status || 'Open'}
</div>

</div>

<div class="badge ${pri}">
${t.priority || 'Normal'}
</div>

</div>

`;

});

html += `

<div class="section-title">
CATEGORIES
</div>

<div class="categories">

`;

CATEGORIES.forEach(c => {

const cname =
c.name ||
c.label ||
'Unknown';

const count =
TASKS.filter(x => {

const taskCat =
(
x.category ||
x.Category ||
x.type ||
''
)
.toString()
.trim()
.toLowerCase();

return (
taskCat ===
cname
.toLowerCase()
);

}).length;

html += `

<div class="cat"
onclick="openCategory('${cname}')">

<h3>
${cname}
</h3>

<p>
${count} tasks
</p>

</div>

`;

});

html += `
</div>
`;

content.innerHTML = html;

}

function openCategory(cat){

currentView = cat;

const tasks =
TASKS.filter(x => {

const taskCat =
(
x.category ||
x.Category ||
x.type ||
''
)
.toString()
.trim()
.toLowerCase();

const selected =
cat
.toString()
.trim()
.toLowerCase();

return (
taskCat === selected
);

});

let html = `

<div class="hero">

<h2>
${cat}
</h2>

<p>
${tasks.length} tasks
</p>

</div>

`;

tasks.forEach(t => {

const pri =
(t.priority || 'normal')
.toLowerCase();

const status =
t.status ||
'Open';

const notes =
t.notes ||
t.description ||
'';

html += `

<div class="task">

<div style="flex:1;">

<div class="task-title">
${t.title || 'Untitled'}
</div>

<div style="
margin-top:8px;
color:#94A3B8;
font-size:14px;
line-height:1.5;
">
${notes}
</div>

<div style="
margin-top:10px;
font-size:13px;
color:#64748B;
">
${status}
</div>

</div>

<div>

<div class="badge ${pri}">
${t.priority || 'Normal'}
</div>

<button
onclick="editTask(${t.id})"
style="
margin-top:10px;
width:100%;
background:#1E293B;
border:none;
color:white;
padding:10px;
border-radius:10px;
font-size:13px;
">
Edit
</button>

</div>

</div>

`;

});

if(tasks.length===0){

html += `

<div style="
margin-top:30px;
color:#94A3B8;
font-size:16px;
">
No tasks in this category
</div>

`;

}

content.innerHTML = html;

}

function openAddTask(){

document.body.insertAdjacentHTML(
'beforeend',

`

<div class="modal" id="modal">

<div class="modal-box">

<h3>
Add Task
</h3>

<input
id="t_title"
placeholder="Task title">

<textarea
id="t_notes"
placeholder="Notes"
style="height:120px;"
></textarea>

<select id="t_cat">

${CATEGORIES.map(c => {

const cname =
c.name ||
c.label ||
'General';

return `
<option>
${cname}
</option>
`;

}).join('')}

</select>

<select id="t_priority">

<option>
Low
</option>

<option>
Medium
</option>

<option>
High
</option>

<option>
Urgent
</option>

</select>

<button onclick="saveTask()">
Save Task
</button>

<br><br>

<button
onclick="closeModal()"
style="
background:#374151;
">
Cancel
</button>

</div>

</div>

`

);

}

function closeModal(){

const m =
document.getElementById('modal');

if(m) m.remove();

}

function saveTask(){

const title =
document.getElementById('t_title').value;

const notes =
document.getElementById('t_notes').value;

const category =
document.getElementById('t_cat').value;

const priority =
document.getElementById('t_priority').value;

if(!title){

alert(
'Title required'
);

return;

}

TASKS.unshift({

id:Date.now(),

title:title,

notes:notes,

category:category,

priority:priority,

status:'Open'

});

closeModal();

render();

alert(
'Task added locally\n\n' +
'GitHub WRITE sync comes next'
);

}

function editTask(id){

const t =
TASKS.find(x =>
x.id == id
);

if(!t) return;

document.body.insertAdjacentHTML(
'beforeend',

`

<div class="modal" id="modal">

<div class="modal-box">

<h3>
Edit Task
</h3>

<input
id="e_title"
value="${t.title || ''}">

<textarea
id="e_notes"
style="height:120px;"
>${t.notes || ''}</textarea>

<select id="e_status">

<option
${t.status==='Open'?'selected':''}>
Open
</option>

<option
${t.status==='In Progress'?'selected':''}>
In Progress
</option>

<option
${t.status==='Done'?'selected':''}>
Done
</option>

</select>

<br><br>

<button onclick="saveEdit(${id})">
Save Changes
</button>

<br><br>

<button
onclick="closeModal()"
style="
background:#374151;
">
Cancel
</button>

</div>

</div>

`

);

}

function saveEdit(id){

const t =
TASKS.find(x =>
x.id == id
);

if(!t) return;

t.title =
document.getElementById(
'e_title'
).value;

t.notes =
document.getElementById(
'e_notes'
).value;

t.status =
document.getElementById(
'e_status'
).value;

closeModal();

render();

alert(
'Task updated locally\n\n' +
'GitHub WRITE sync comes next'
);

}

function render(){

if(currentView==='home'){

renderHome();

return;

}

if(currentView==='work'){

openCategory('Work');

return;

}

if(currentView==='projects'){

openCategory('Projects');

return;

}

if(currentView==='log'){

content.innerHTML = `

<div class="hero">

<h2>
Worklog
</h2>

<p>
${WORKLOG.length} entries
</p>

</div>

`;

return;

}

if(currentView==='report'){

content.innerHTML = `

<div class="hero">

<h2>
Weekly Report
</h2>

<p>
AI generation coming next
</p>

</div>

`;

return;

}

}

syncNow();
