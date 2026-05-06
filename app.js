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

function statusText(t){
document.getElementById('status').innerText=t;
}

function setToken(){
const t = prompt('GitHub Personal Access Token');
if(t){
localStorage.setItem('gh_token',t);
alert('Token saved');
}
}

async function fetchJson(path){
const url=`https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/${BRANCH}/${path}`;
const r=await fetch(url+'?t=' + Date.now());
return await r.json();
}

async function syncNow(){
try{
statusText('Syncing...');

TASKS = await fetchJson(FILES.tasks);
WORKLOG = await fetchJson(FILES.worklog);
CATEGORIES = await fetchJson(FILES.categories);

statusText('Synced');

render();

}catch(e){
console.error(e);
statusText('Sync failed');
alert('Database sync failed');
}
}

function setView(v){
currentView=v;
render();
}

function statCard(num,label,color){
return `
<div class="stat">
<div class="num ${color}">${num}</div>
<div class="label">${label}</div>
</div>
`;
}

function renderHome(){

const total=TASKS.length;
const done=TASKS.filter(x=>x.status==='Done').length;
const active=TASKS.filter(x=>x.status!=='Done').length;
const overdue=TASKS.filter(x=>x.overdue).length;

const urgent=TASKS.filter(x=>
x.priority==='Urgent' || x.priority==='High'
).slice(0,3);

let html=`
<div class="hero">
<h2>Your Second Brain</h2>
<p>${new Date().toDateString()}</p>
</div>

<div class="stats">
${statCard(total,'TOTAL','blue')}
${statCard(done,'DONE','green')}
${statCard(active,'ACTIVE','yellow')}
${statCard(overdue,'OVERDUE','red')}
</div>

<div class="section-title">
URGENT & HIGH PRIORITY
</div>
`;

urgent.forEach(t=>{
html+=`
<div class="task">
<div>
<div class="task-title">${t.title}</div>
</div>

<div class="badge ${t.priority.toLowerCase()}">
${t.priority}
</div>
</div>
`;
});

html+=`
<div class="section-title">
CATEGORIES
</div>

<div class="categories">
`;

CATEGORIES.forEach(c=>{

const count=TASKS.filter(x=>x.category===c.name && x.status!=='Done').length;

html+=`
<div class="cat" onclick="openCategory('${c.name}')">
<h3>${c.name}</h3>
<p>${count} open</p>
</div>
`;
});

html+=`</div>`;

content.innerHTML=html;
}

function openCategory(cat){

const tasks=TASKS.filter(x=>x.category===cat);

let html=`
<div class="hero">
<h2>${cat}</h2>
<p>${tasks.length} tasks</p>
</div>
`;

tasks.forEach(t=>{

html+=`
<div class="task">
<div>
<div class="task-title">${t.title}</div>
<div style="margin-top:8px;color:#94A3B8;">
${t.status}
</div>
</div>

<div class="badge ${t.priority.toLowerCase()}">
${t.priority}
</div>
</div>
`;

});

content.innerHTML=html;
}

function openAddTask(){

document.body.insertAdjacentHTML('beforeend',`
<div class="modal" id="modal">
<div class="modal-box">

<h3>Add Task</h3>

<input id="t_title" placeholder="Task title">

<select id="t_cat">
${CATEGORIES.map(c=>`
<option>${c.name}</option>
`).join('')}
</select>

<select id="t_priority">
<option>Low</option>
<option>Medium</option>
<option>High</option>
<option>Urgent</option>
</select>

<button onclick="saveTask()">Save Task</button>

</div>
</div>
`);

}

function closeModal(){
const m=document.getElementById('modal');
if(m)m.remove();
}

async function saveTask(){

const title=document.getElementById('t_title').value;
const category=document.getElementById('t_cat').value;
const priority=document.getElementById('t_priority').value;

if(!title)return;

TASKS.unshift({
id:Date.now(),
title,
category,
priority,
status:'Open'
});

closeModal();

render();

alert('Task added locally');

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

content.innerHTML=`
<div class="hero">
<h2>Worklog</h2>
<p>${WORKLOG.length} entries</p>
</div>
`;

return;
}

if(currentView==='report'){

content.innerHTML=`
<div class="hero">
<h2>Weekly Report</h2>
<p>Generation coming next</p>
</div>
`;

return;
}

}

syncNow();
