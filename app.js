const REPO_OWNER = "abhicome";
const REPO_NAME = "second-brain";
const DATA_PATH = "data";

const DEFAULT_CATEGORIES = [
  { id: "work", name: "Work", color: "#3B82F6", file: "work.json", icon: "💼" },
  { id: "projects", name: "Projects", color: "#8B5CF6", file: "projects.json", icon: "🚀" },
  { id: "personal", name: "Personal", color: "#EF4444", file: "personal.json", icon: "👤" },
  { id: "knowledge", name: "Knowledge", color: "#2563EB", file: "knowledge.json", icon: "📘" },
  { id: "bills", name: "Bills", color: "#F59E0B", file: "bills.json", icon: "💳" },
  { id: "watchlist", name: "Watchlist", color: "#D946EF", file: "watchlist.json", icon: "🎬" }
];

let state = {
  categories: [],
  data: {},
  current: null,
  token: localStorage.getItem("github_token") || ""
};

const app = document.getElementById("app");

init();

async function init() {
  renderLoading();

  try {
    await loadCategories();
    await loadAllFiles();
    renderHome();
  } catch (e) {
    console.error(e);
    app.innerHTML = `
      <div style="padding:30px;color:white">
        Failed to load data
      </div>
    `;
  }
}

function renderLoading() {
  app.innerHTML = `
    <div class="loading-screen">
      Loading...
    </div>
  `;
}

async function loadCategories() {
  try {
    const res = await fetch(rawUrl("sb-categories.json"));
    const data = await res.json();
    state.categories = data.length ? data : DEFAULT_CATEGORIES;
  } catch {
    state.categories = DEFAULT_CATEGORIES;
  }
}

async function loadAllFiles() {
  for (const cat of state.categories) {
    try {
      const res = await fetch(rawUrl(cat.file));
      const json = await res.json();
      state.data[cat.id] = json;
    } catch {
      state.data[cat.id] = [];
    }
  }
}

function rawUrl(file) {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${DATA_PATH}/${file}?t=${Date.now()}`;
}

function renderHome() {
  let total = 0;
  let done = 0;

  state.categories.forEach(cat => {
    const tasks = state.data[cat.id] || [];
    total += tasks.length;
    done += tasks.filter(t => t.done).length;
  });

  app.innerHTML = `
    <div class="screen">

      <div class="topbar">
        <div class="logo">Second Brain</div>

        <div class="top-actions">
          <button class="btn" onclick="setToken()">Key</button>
          <button class="btn" onclick="syncAll()">Sync</button>
        </div>
      </div>

      <div class="hero">
        <h1>Your Second Brain</h1>
        <div class="date">${new Date().toDateString()}</div>
      </div>

      <div class="stats">
        <div class="card">
          <div class="num">${total}</div>
          <div class="label">TOTAL</div>
        </div>

        <div class="card">
          <div class="num green">${done}</div>
          <div class="label">DONE</div>
        </div>

        <div class="card">
          <div class="num yellow">${total - done}</div>
          <div class="label">ACTIVE</div>
        </div>

        <div class="card">
          <div class="num red">0</div>
          <div class="label">OVERDUE</div>
        </div>
      </div>

      <div class="section-title">CATEGORIES</div>

      <div class="categories">
        ${state.categories.map(cat => {
          const count = (state.data[cat.id] || []).filter(x => !x.done).length;

          return `
            <div class="category-card"
              onclick="openCategory('${cat.id}')"
              style="border-color:${cat.color}">
              
              <div class="cat-icon">${cat.icon}</div>

              <div class="cat-name">${cat.name}</div>

              <div class="cat-count">${count} open</div>
            </div>
          `;
        }).join("")}
      </div>

      <button class="fab" onclick="addCategory()">+</button>

    </div>
  `;
}

function openCategory(id) {
  state.current = id;

  const category = state.categories.find(c => c.id === id);
  const tasks = state.data[id] || [];

  app.innerHTML = `
    <div class="screen">

      <div class="category-header">
        <button class="back-btn" onclick="renderHome()">←</button>

        <div class="category-title"
          style="color:${category.color}">
          ${category.name}
        </div>

        <button class="share-btn"
          onclick="syncCategory('${id}')">
          ⟳
        </button>
      </div>

      <div class="task-list">

        ${tasks.map((task, index) => `
          <div class="task-item">

            <div class="task-top">

              <input
                type="checkbox"
                ${task.done ? "checked" : ""}
                onchange="toggleTask('${id}',${index})"
              >

              <div class="task-main">

                <div class="task-title ${task.done ? "done" : ""}"
                  onclick="editTask('${id}',${index})">
                  ${task.title}
                </div>

                ${task.notes ? `
                  <div class="task-notes">
                    ${task.notes}
                  </div>
                ` : ""}

                ${task.date ? `
                  <div class="task-date">
                    ${task.date}
                  </div>
                ` : ""}

                ${task.subtasks ? `
                  <div class="subtasks">
                    ${task.subtasks.map((s,si) => `
                      <div class="subtask">
                        <input type="checkbox"
                          ${s.done ? "checked" : ""}
                          onchange="toggleSubtask('${id}',${index},${si})">
                        <span>${s.title}</span>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}

              </div>

            </div>

          </div>
        `).join("")}

      </div>

      <button class="fab"
        onclick="addTask('${id}')">
        +
      </button>

    </div>
  `;
}

function toggleTask(cat,index) {
  state.data[cat][index].done =
    !state.data[cat][index].done;

  openCategory(cat);
}

function toggleSubtask(cat,index,si) {
  const sub =
    state.data[cat][index].subtasks[si];

  sub.done = !sub.done;

  openCategory(cat);
}

function addTask(cat) {
  const title = prompt("Task title");

  if (!title) return;

  const notes = prompt("Notes") || "";
  const date = prompt("Date") || "";

  const subtasks = [];

  while (true) {
    const s = prompt("Add subtask (cancel to stop)");

    if (!s) break;

    subtasks.push({
      title: s,
      done: false
    });
  }

  state.data[cat].push({
    title,
    notes,
    date,
    done: false,
    subtasks
  });

  openCategory(cat);
}

function editTask(cat,index) {
  const task = state.data[cat][index];

  const title =
    prompt("Edit title", task.title);

  if (!title) return;

  task.title = title;

  task.notes =
    prompt("Edit notes", task.notes || "") || "";

  task.date =
    prompt("Edit date", task.date || "") || "";

  openCategory(cat);
}

function addCategory() {
  const name = prompt("Category name");

  if (!name) return;

  const id =
    name.toLowerCase().replace(/\s+/g,"-");

  const file = `${id}.json`;

  const color =
    "#" + Math.floor(Math.random()*16777215)
      .toString(16);

  const cat = {
    id,
    name,
    color,
    file,
    icon: "📁"
  };

  state.categories.push(cat);
  state.data[id] = [];

  renderHome();
}

async function setToken() {
  const token = prompt(
    "Enter GitHub Token",
    state.token || ""
  );

  if (!token) return;

  state.token = token;

  localStorage.setItem(
    "github_token",
    token
  );

  alert("Token saved");
}

async function syncAll() {
  for (const cat of state.categories) {
    await syncCategory(cat.id);
  }

  await syncCategories();

  alert("Synced");
}

async function syncCategories() {
  await saveFile(
    "sb-categories.json",
    state.categories
  );
}

async function syncCategory(id) {
  const cat =
    state.categories.find(c => c.id === id);

  await saveFile(
    cat.file,
    state.data[id]
  );
}

async function saveFile(file,data) {
  if (!state.token) {
    alert("Add GitHub token first");
    return;
  }

  const url =
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}/${file}`;

  let sha = null;

  try {
    const existing = await fetch(url,{
      headers:{
        Authorization:`token ${state.token}`
      }
    });

    const json = await existing.json();

    sha = json.sha;
  } catch {}

  const content =
    btoa(unescape(
      encodeURIComponent(
        JSON.stringify(data,null,2)
      )
    ));

  await fetch(url,{
    method:"PUT",
    headers:{
      Authorization:`token ${state.token}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:`update ${file}`,
      content,
      sha
    })
  });
}

window.openCategory = openCategory;
window.renderHome = renderHome;
window.toggleTask = toggleTask;
window.toggleSubtask = toggleSubtask;
window.addTask = addTask;
window.editTask = editTask;
window.syncAll = syncAll;
window.syncCategory = syncCategory;
window.setToken = setToken;
window.addCategory = addCategory;
