const OWNER = "abhicome";
const REPO = "second-brain";
const BRANCH = "main";

let GITHUB_TOKEN =
localStorage.getItem("sb_token") || "";

let tasks = [];
let worklogs = [];
let categories = [];

let currentTab = "home";

const DEFAULT_CATEGORIES = [
  {id:"work",name:"Work",icon:"💼"},
  {id:"projects",name:"Projects",icon:"🚀"},
  {id:"health",name:"Health",icon:"❤️"},
  {id:"personal",name:"Personal",icon:"👤"}
];

function $(id){
  return document.getElementById(id);
}

function statusText(t,c){
  $("status").innerHTML=t;
  $("status").style.color=c||"#34D399";
}

function saveToken(){

  const existing =
  localStorage.getItem("sb_token") || "";

  const t =
  prompt(
    "Enter GitHub Personal Access Token",
    existing
  );

  if(!t) return;

  GITHUB_TOKEN = t.trim();

  localStorage.setItem(
    "sb_token",
    GITHUB_TOKEN
  );

  statusText(
    "Token Saved",
    "#34D399"
  );

  alert(
    "Token saved successfully"
  );

}

async function githubRequest(url,options={}){

  if(!GITHUB_TOKEN){
    throw new Error("No token");
  }

  const res = await fetch(url,{
    ...options,
    headers:{
      "Authorization":"token "+GITHUB_TOKEN,
      "Accept":"application/vnd.github+json",
      ...(options.headers||{})
    }
  });

  if(!res.ok){

    const txt = await res.text();

    throw new Error(txt);
  }

  return await res.json();
}

async function readJSON(path){

  try{

    const url =
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/data/${path}`;

    const res = await fetch(url+"?t="+Date.now());

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
    return;
  }

  const api =
  `https://api.github.com/repos/${OWNER}/${REPO}/contents/data/${path}`;

  let sha = null;

  try{

    const existing =
    await githubRequest(api);

    sha = existing.sha;

  }catch(e){}

  const body = {
    message:"Update "+path,
    content:btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify(data,null,2)
        )
      )
    ),
    branch:BRANCH
  };

  if(sha){
    body.sha = sha;
  }

  await githubRequest(api,{
    method:"PUT",
    body:JSON.stringify(body)
  });
}

async function loadData(){

  statusText("Loading...","#FBBF24");

  let catData =
  await readJSON("categories.json");

  if(!catData){

    catData = DEFAULT_CATEGORIES;

    if(GITHUB_TOKEN){
      await writeJSON(
        "categories.json",
        catData
      );
    }
  }

  categories = catData;

  tasks = [];

  for(const cat of categories){

    const file =
    cat.id+".json";

    let data =
    await readJSON(file);

    if(!data){

      data = [];

      if(GITHUB_TOKEN){
        await writeJSON(file,data);
      }
    }

    data.forEach(x=>{
      x.category = cat.id;
    });

    tasks = tasks.concat(data);
  }

  let wl =
  await readJSON("worklog.json");

  if(!wl){

    wl = [];

    if(GITHUB_TOKEN){
      await writeJSON(
        "worklog.json",
        wl
      );
    }
  }

  worklogs = wl;

  render();

  statusText(
    "Synced",
    "#34D399"
  );
}

function saveCategoryTasks(catId){

  const data =
  tasks.filter(x=>x.category===catId);

  writeJSON(
    catId+".json",
    data
  );
}

function render(){

  const body = $("body");

  if(currentTab==="home"){
    renderHome(body);
  }

  if(currentTab==="work"){
    renderCategory(body,"work");
  }

  if(currentTab==="projects"){
    renderCategory(body,"projects");
  }

  if(currentTab==="health"){
    renderCategory(body,"health");
  }

  if(currentTab==="personal"){
    renderCategory(body,"personal");
  }

  if(currentTab==="log"){
    renderLogs(body);
  }
}

function renderHome(body){

  const total = tasks.length;

  const done =
  tasks.filter(x=>x.done).length;

  body.innerHTML = `
  <div class="hero">
    <div class="heroTitle">
      Your Second Brain
    </div>

    <div class="heroDate">
      ${new Date().toLocaleDateString()}
    </div>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="num">${total}</div>
      <div class="lbl">TOTAL</div>
    </div>

    <div class="stat">
      <div class="num green">${done}</div>
      <div class="lbl">DONE</div>
    </div>

    <div class="stat">
      <div class="num yellow">
      ${worklogs.length}
      </div>
      <div class="lbl">LOGS</div>
    </div>

    <div class="stat">
      <div class="num red">
      ${total-done}
      </div>
      <div class="lbl">ACTIVE</div>
    </div>
  </div>

  <div class="sectionTitle">
    Categories
  </div>

  <div class="catGrid">
    ${
      categories.map(c=>`

      <div class="catCard"
      onclick="openCategory('${c.id}')">

        <div class="catIcon">
        ${c.icon||"📁"}
        </div>

        <div class="catName">
        ${c.name}
        </div>

        <div class="catCount">
        ${
          tasks.filter(
            x=>x.category===c.id
          ).length
        } tasks
        </div>

      </div>

      `).join("")
    }
  </div>
  `;
}

function renderCategory(body,catId){

  const cat =
  categories.find(x=>x.id===catId);

  const list =
  tasks.filter(x=>x.category===catId);

  body.innerHTML = `
  <div class="sectionTitle">
    ${cat.icon} ${cat.name}
  </div>

  ${
    list.map(t=>`

    <div class="task">

      <div class="taskTop">

        <div class="taskTitle">
        ${t.title}
        </div>

        <div class="taskBtns">

          <button onclick="toggleTask('${t.id}')">
          ${t.done?"✅":"⭕"}
          </button>

          <button onclick="editTask('${t.id}')">
          ✏️
          </button>

          <button onclick="deleteTask('${t.id}')">
          🗑️
          </button>

        </div>

      </div>

      <div class="taskMeta">
        ${t.priority||"normal"}
      </div>

    </div>

    `).join("")
  }

  <div style="height:120px"></div>
  `;
}

function renderLogs(body){

  body.innerHTML = `
  <div class="sectionTitle">
    📋 Worklog
  </div>

  ${
    worklogs.map(w=>`

    <div class="task">

      <div class="taskTitle">
      ${w.text}
      </div>

      <div class="taskMeta">
      ${w.date}
      </div>

    </div>

    `).join("")
  }
  `;
}

function openCategory(id){

  currentTab = id;

  render();
}

function toggleTask(id){

  const t =
  tasks.find(x=>x.id===id);

  if(!t) return;

  t.done = !t.done;

  saveCategoryTasks(
    t.category
  );

  render();
}

function editTask(id){

  const t =
  tasks.find(x=>x.id===id);

  if(!t) return;

  const nt =
  prompt(
    "Edit task",
    t.title
  );

  if(!nt) return;

  t.title = nt;

  saveCategoryTasks(
    t.category
  );

  render();
}

function deleteTask(id){

  const t =
  tasks.find(x=>x.id===id);

  if(!t) return;

  if(!confirm("Delete task?")){
    return;
  }

  tasks =
  tasks.filter(x=>x.id!==id);

  saveCategoryTasks(
    t.category
  );

  render();
}

function addTask(){

  const title =
  prompt("Task title");

  if(!title) return;

  const cat =
  prompt(
    "Category ID (work/projects/health/personal)"
  );

  if(!cat) return;

  const task = {
    id:"t"+Date.now(),
    title:title,
    done:false,
    priority:"normal",
    category:cat
  };

  tasks.push(task);

  saveCategoryTasks(cat);

  render();
}

function addCategory(){

  const name =
  prompt("Category name");

  if(!name) return;

  const id =
  name.toLowerCase()
  .replace(/\s+/g,"-");

  const icon =
  prompt("Emoji icon","📁");

  const cat = {
    id:id,
    name:name,
    icon:icon
  };

  categories.push(cat);

  writeJSON(
    "categories.json",
    categories
  );

  writeJSON(
    id+".json",
    []
  );

  render();
}

$("homeBtn").onclick = ()=>{
  currentTab="home";
  render();
};

$("workBtn").onclick = ()=>{
  currentTab="work";
  render();
};

$("projectsBtn").onclick = ()=>{
  currentTab="projects";
  render();
};

$("healthBtn").onclick = ()=>{
  currentTab="health";
  render();
};

$("personalBtn").onclick = ()=>{
  currentTab="personal";
  render();
};

$("logBtn").onclick = ()=>{
  currentTab="log";
  render();
};

$("syncBtn").onclick = ()=>{
  loadData();
};

$("tokenBtn").onclick = ()=>{
  saveToken();
};

$("addBtn").onclick = ()=>{

  const a =
  prompt(
    "1 = Add Task\n2 = Add Category"
  );

  if(a==="1"){
    addTask();
  }

  if(a==="2"){
    addCategory();
  }

};

loadData();
