const GITHUB_USER = "abhicome";
const GITHUB_REPO = "second-brain";
const GITHUB_BRANCH = "main";

let GITHUB_TOKEN = localStorage.getItem("sb_token") || "";

const API_BASE =
`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;

const RAW_BASE =
`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/data`;

let categories = [];
let currentCategory = null;
let currentView = "home";
let TASKS = {};
let WORKLOG = [];

const app = document.getElementById("appBody");

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function saveToken(){
  const val = prompt("Enter GitHub Personal Access Token", GITHUB_TOKEN || "");
  if(!val) return;
  GITHUB_TOKEN = val.trim();
  localStorage.setItem("sb_token", GITHUB_TOKEN);
  statusText("GitHub token saved", "#34D399");
}

function statusText(t,c){
  const s = document.getElementById("stxt");
  if(!s) return;
  s.innerText = t;
  s.style.color = c || "#34D399";
}

async function githubRequest(url, method="GET", body=null){

  const headers = {
    "Accept":"application/vnd.github+json"
  };

  if(GITHUB_TOKEN){
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  if(body){
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url,{
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if(!res.ok){
    throw new Error("GitHub API Error");
  }

  return res.json();
}

async function fetchJSON(path){

  try{

    const res = await fetch(`${RAW_BASE}/${path}?t=${Date.now()}`);

    if(!res.ok){
      return null;
    }

    return await res.json();

  }catch(e){

    return null;

  }

}

async function writeJSON(path,data){

  if(!GITHUB_TOKEN){
    alert("Add GitHub token first");
    return;
  }

  statusText("Saving...", "#FBBF24");

  const fileUrl = `${API_BASE}/data/${path}`;

  let sha = null;

  try{
    const existing = await githubRequest(fileUrl);
    sha = existing.sha;
  }catch(e){}

  const content =
  btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify(data,null,2)
      )
    )
  );

  await githubRequest(
    fileUrl,
    "PUT",
    {
      message:`update ${path}`,
      content,
      sha,
      branch:GITHUB_BRANCH
    }
  );

  statusText("Synced", "#34D399");

}

async function init(){

  statusText("Loading...", "#FBBF24");

  let catData = await fetchJSON("categories.json");

  if(!catData){

    catData = [
      {id:"work",label:"Work",color:"#4F8EF7"},
      {id:"projects",label:"Projects",color:"#A78BFA"},
      {id:"personal",label:"Personal",color:"#34D399"},
      {id:"health",label:"Health",color:"#FB923C"},
      {id:"knowledge",label:"Knowledge",color:"#FBBF24"},
      {id:"bills",label:"Bills",color:"#F87171"},
      {id:"watchlist",label:"Watchlist",color:"#38BDF8"}
    ];

    await writeJSON("categories.json",catData);

  }

  categories = catData;

  for(const c of categories){

    const file = `${c.id}.json`;

    let data = await fetchJSON(file);

    if(!data){

      data = [];

      await writeJSON(file,data);

    }

    TASKS[c.id] = data;

  }

  let wl = await fetchJSON("worklog.json");

  if(!wl){

    wl = [];

    await writeJSON("worklog.json",wl);

  }

  WORKLOG = wl;

  renderHome();

  statusText("Ready", "#34D399");

}

function setTab(t){

  currentView = t;

  if(t === "home"){
    renderHome();
    return;
  }

  openCategory(t);

}

function renderHome(){

  let total = 0;
  let overdue = 0;
  let active = 0;

  categories.forEach(c=>{

    const arr = TASKS[c.id] || [];

    total += arr.length;

    arr.forEach(t=>{

      if(t.status !== "Done"){
        active++;
      }

      if(
        t.dueDate &&
        t.status !== "Done" &&
        new Date(t.dueDate) < new Date()
      ){
        overdue++;
      }

    });

  });

  let html = `

  <div class="hero">

    <h1>
      Second Brain
    </h1>

    <p>
      Everything synced with GitHub
    </p>

  </div>

  <div class="stats">

    <div class="card">
      <div class="num">${total}</div>
      <div class="lbl">Tasks</div>
    </div>

    <div class="card">
      <div class="num">${active}</div>
      <div class="lbl">Active</div>
    </div>

    <div class="card">
      <div class="num">${overdue}</div>
      <div class="lbl">Overdue</div>
    </div>

  </div>

  <div class="section-title">
    Categories
  </div>

  <div class="grid">

  `;

  categories.forEach(c=>{

    const count = (TASKS[c.id] || []).length;

    html += `

    <button
      class="cat"
      onclick="openCategory('${c.id}')"
      style="border-color:${c.color};"
    >

      <div class="cat-title">
        ${c.label}
      </div>

      <div class="cat-count">
        ${count} items
      </div>

    </button>

    `;

  });

  html += `

  <button class="cat addcat" onclick="showAddCategory()">

    +

    <div class="cat-title">
      Add Category
    </div>

  </button>

  </div>

  `;

  app.innerHTML = html;

}

function openCategory(id){

  currentCategory = id;

  const cat =
  categories.find(x=>x.id===id);

  const tasks =
  TASKS[id] || [];

  let html = `

  <div class="hero">

    <h2>
      ${cat.label}
    </h2>

    <p>
      ${tasks.length} tasks
    </p>

  </div>

  <button class="primary" onclick="showAddTask()">
    Add Task
  </button>

  <div style="height:16px;"></div>

  `;

  tasks.forEach((t,index)=>{

    html += `

    <div class="task">

      <div style="flex:1;">

        <div class="task-title">
          ${t.title || ""}
        </div>

        <div class="task-notes">
          ${t.notes || ""}
        </div>

        <div class="task-status">
          ${t.status || "Open"}
        </div>

      </div>

      <div>

        <div class="badge ${String(t.priority || "").toLowerCase()}">
          ${t.priority || "Normal"}
        </div>

        <button
          class="editbtn"
          onclick="editTask(${index})"
        >
          Edit
        </button>

      </div>

    </div>

    `;

  });

  app.innerHTML = html;

}

function closeModal(){

  const m = document.getElementById("modal");

  if(m){
    m.remove();
  }

}

function showAddCategory(){

  document.body.insertAdjacentHTML(
    "beforeend",
    `

    <div class="modal" id="modal">

      <div class="modal-box">

        <h3>Add Category</h3>

        <input id="c_name" placeholder="Category name">

        <input id="c_color" placeholder="#4F8EF7">

        <button onclick="createCategory()">
          Create
        </button>

        <button onclick="closeModal()">
          Cancel
        </button>

      </div>

    </div>

    `
  );

}

async function createCategory(){

  const name =
  document.getElementById("c_name").value.trim();

  const color =
  document.getElementById("c_color").value.trim() || "#4F8EF7";

  if(!name){
    return;
  }

  const id =
  name
  .toLowerCase()
  .replace(/\s+/g,"-");

  const obj = {
    id,
    label:name,
    color
  };

  categories.push(obj);

  TASKS[id] = [];

  await writeJSON("categories.json",categories);

  await writeJSON(`${id}.json`,[]);

  closeModal();

  renderHome();

}

function showAddTask(){

  document.body.insertAdjacentHTML(
    "beforeend",
    `

    <div class="modal" id="modal">

      <div class="modal-box">

        <h3>Add Task</h3>

        <input id="t_title" placeholder="Task title">

        <textarea id="t_notes" placeholder="Notes"></textarea>

        <input type="date" id="t_due">

        <select id="t_priority">

          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Urgent</option>

        </select>

        <button onclick="createTask()">
          Save
        </button>

        <button onclick="closeModal()">
          Cancel
        </button>

      </div>

    </div>

    `
  );

}

async function createTask(){

  const obj = {

    id:uid(),

    title:
    document.getElementById("t_title").value,

    notes:
    document.getElementById("t_notes").value,

    dueDate:
    document.getElementById("t_due").value,

    priority:
    document.getElementById("t_priority").value,

    status:"Open"

  };

  TASKS[currentCategory].unshift(obj);

  await writeJSON(
    `${currentCategory}.json`,
    TASKS[currentCategory]
  );

  closeModal();

  openCategory(currentCategory);

}

function editTask(index){

  const t =
  TASKS[currentCategory][index];

  document.body.insertAdjacentHTML(
    "beforeend",
    `

    <div class="modal" id="modal">

      <div class="modal-box">

        <h3>Edit Task</h3>

        <input id="e_title" value="${t.title || ""}">

        <textarea id="e_notes">${t.notes || ""}</textarea>

        <input type="date" id="e_due" value="${t.dueDate || ""}">

        <select id="e_priority">

          <option ${t.priority==="Low"?"selected":""}>Low</option>
          <option ${t.priority==="Normal"?"selected":""}>Normal</option>
          <option ${t.priority==="High"?"selected":""}>High</option>
          <option ${t.priority==="Urgent"?"selected":""}>Urgent</option>

        </select>

        <select id="e_status">

          <option ${t.status==="Open"?"selected":""}>Open</option>
          <option ${t.status==="In Progress"?"selected":""}>In Progress</option>
          <option ${t.status==="Done"?"selected":""}>Done</option>

        </select>

        <button onclick="saveTask(${index})">
          Save Changes
        </button>

        <button onclick="deleteTask(${index})">
          Delete
        </button>

      </div>

    </div>

    `
  );

}

async function saveTask(index){

  const t =
  TASKS[currentCategory][index];

  t.title =
  document.getElementById("e_title").value;

  t.notes =
  document.getElementById("e_notes").value;

  t.dueDate =
  document.getElementById("e_due").value;

  t.priority =
  document.getElementById("e_priority").value;

  t.status =
  document.getElementById("e_status").value;

  await writeJSON(
    `${currentCategory}.json`,
    TASKS[currentCategory]
  );

  closeModal();

  openCategory(currentCategory);

}

async function deleteTask(index){

  TASKS[currentCategory].splice(index,1);

  await writeJSON(
    `${currentCategory}.json`,
    TASKS[currentCategory]
  );

  closeModal();

  openCategory(currentCategory);

}

window.setTab = setTab;
window.saveToken = saveToken;
window.openCategory = openCategory;
window.showAddCategory = showAddCategory;
window.createCategory = createCategory;
window.showAddTask = showAddTask;
window.createTask = createTask;
window.editTask = editTask;
window.saveTask = saveTask;
window.deleteTask = deleteTask;
window.closeModal = closeModal;

init();
