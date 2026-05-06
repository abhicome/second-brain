const REPO_OWNER = "abhicome";
const REPO_NAME = "second-brain";
const DATA_PATH = "data";

const app =
  document.getElementById("root") ||
  document.getElementById("app");

if (!app) {
  document.body.innerHTML = `
    <div style="
      background:#020617;
      color:white;
      min-height:100vh;
      padding:40px;
      font-family:sans-serif;
    ">
      Root container missing
    </div>
  `;
  throw new Error("Root container missing");
}

const DEFAULT_CATEGORIES = [
  {
    id: "work",
    name: "Work",
    color: "#3B82F6",
    file: "work.json",
    icon: "💼"
  },
  {
    id: "projects",
    name: "Projects",
    color: "#8B5CF6",
    file: "projects.json",
    icon: "🚀"
  },
  {
    id: "personal",
    name: "Personal",
    color: "#EF4444",
    file: "personal.json",
    icon: "👤"
  },
  {
    id: "knowledge",
    name: "Knowledge",
    color: "#2563EB",
    file: "knowledge.json",
    icon: "📘"
  },
  {
    id: "bills",
    name: "Bills",
    color: "#F59E0B",
    file: "bills.json",
    icon: "💳"
  },
  {
    id: "watchlist",
    name: "Watchlist",
    color: "#D946EF",
    file: "watchlist.json",
    icon: "🎬"
  }
];

let state = {
  token: localStorage.getItem("github_token") || "",
  categories: [],
  data: {},
  current: null
};

init();

async function init() {
  try {
    renderLoading();

    await loadCategories();
    await loadAllData();

    renderHome();
  } catch (e) {
    console.error(e);

    app.innerHTML = `
      <div style="
        color:white;
        padding:30px;
        font-family:sans-serif;
      ">
        Failed to load app
      </div>
    `;
  }
}

function renderLoading() {
  app.innerHTML = `
    <div style="
      color:white;
      padding:30px;
      font-size:20px;
    ">
      Loading...
    </div>
  `;
}

function rawUrl(file) {
  return `./data/${file}?v=${Date.now()}`;
}

async function loadCategories() {
  try {
    const res = await fetch(rawUrl("sb-categories.json"));

    const text = await res.text();

    const json = JSON.parse(text);

    state.categories =
      Array.isArray(json) && json.length
        ? json
        : DEFAULT_CATEGORIES;

  } catch (e) {
    console.error("Category load error", e);

    state.categories = DEFAULT_CATEGORIES;
  }
}

async function loadAllData() {
  for (const cat of state.categories) {
    try {
      const res = await fetch(rawUrl(cat.file));

      const text = await res.text();

      const json = JSON.parse(text);

      state.data[cat.id] =
        Array.isArray(json)
          ? json
          : [];

    } catch (e) {
      console.error("Failed loading", cat.file, e);

      state.data[cat.id] = [];
    }
  }
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
    <div style="
      background:#020617;
      min-height:100vh;
      color:white;
      padding:20px;
      font-family:sans-serif;
      padding-bottom:120px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      ">

        <div style="
          font-size:34px;
          font-weight:bold;
        ">
          Second Brain
        </div>

        <div style="
          display:flex;
          gap:10px;
        ">

          <button onclick="setToken()"
            style="${buttonStyle()}">
            Key
          </button>

          <button onclick="syncAll()"
            style="${buttonStyle()}">
            Sync
          </button>

        </div>
      </div>

      <div style="
        font-size:44px;
        font-weight:bold;
      ">
        Your Second Brain
      </div>

      <div style="
        margin-top:10px;
        color:#94A3B8;
      ">
        ${new Date().toDateString()}
      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
        margin-top:30px;
      ">

        ${statCard(total,"TOTAL","#3B82F6")}
        ${statCard(done,"DONE","#10B981")}
        ${statCard(total-done,"ACTIVE","#F59E0B")}
        ${statCard(0,"OVERDUE","#EF4444")}

      </div>

      <div style="
        margin-top:40px;
        margin-bottom:20px;
        font-size:22px;
        font-weight:bold;
      ">
        Categories
      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
      ">

        ${state.categories.map(cat => {

          const count =
            (state.data[cat.id] || [])
              .filter(t => !t.done).length;

          return `
            <div
              onclick="openCategory('${cat.id}')"
              style="
                background:#081225;
                border:2px solid ${cat.color};
                border-radius:24px;
                padding:20px;
                cursor:pointer;
              "
            >

              <div style="
                font-size:32px;
              ">
                ${cat.icon}
              </div>

              <div style="
                margin-top:14px;
                font-size:28px;
                font-weight:bold;
              ">
                ${cat.name}
              </div>

              <div style="
                margin-top:10px;
                color:#94A3B8;
              ">
                ${count} open
              </div>

            </div>
          `;
        }).join("")}

      </div>

      <button
        onclick="addCategory()"
        style="
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
        "
      >
        +
      </button>

    </div>
  `;
}

function statCard(value,label,color) {
  return `
    <div style="
      background:#081225;
      border-radius:22px;
      padding:30px;
      text-align:center;
    ">

      <div style="
        color:${color};
        font-size:42px;
        font-weight:bold;
      ">
        ${value}
      </div>

      <div style="
        margin-top:10px;
        color:#94A3B8;
      ">
        ${label}
      </div>

    </div>
  `;
}

function openCategory(id) {

  state.current = id;

  const category =
    state.categories.find(c => c.id === id);

  const tasks =
    state.data[id] || [];

  app.innerHTML = `
    <div style="
      background:#020617;
      min-height:100vh;
      color:white;
      padding:20px;
      font-family:sans-serif;
      padding-bottom:120px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">

        <button
          onclick="renderHome()"
          style="${circleButton()}">
          ←
        </button>

        <div style="
          font-size:40px;
          font-weight:bold;
          color:${category.color};
        ">
          ${category.name}
        </div>

        <button
          onclick="syncCategory('${id}')"
          style="${circleButton()}">
          ⟳
        </button>

      </div>

      <div style="
        margin-top:30px;
      ">

        ${tasks.map((task,index)=>`

          <div style="
            background:#081225;
            border-radius:22px;
            padding:20px;
            margin-bottom:16px;
          ">

            <div style="
              display:flex;
              gap:16px;
            ">

              <input
                type="checkbox"
                ${task.done ? "checked" : ""}
                onchange="toggleTask('${id}',${index})"
                style="
                  width:24px;
                  height:24px;
                  margin-top:5px;
                "
              >

              <div style="flex:1">

                <div
                  onclick="editTask('${id}',${index})"
                  style="
                    font-size:28px;
                    font-weight:bold;
                    cursor:pointer;
                    text-decoration:
                      ${task.done
                        ? "line-through"
                        : "none"};
                  "
                >
                  ${task.title || ""}
                </div>

                ${task.notes ? `
                  <div style="
                    margin-top:12px;
                    color:#94A3B8;
                    line-height:1.5;
                  ">
                    ${task.notes}
                  </div>
                ` : ""}

                ${task.date ? `
                  <div style="
                    margin-top:12px;
                    color:#94A3B8;
                  ">
                    ${task.date}
                  </div>
                ` : ""}

                ${task.subtasks &&
                  task.subtasks.length ? `

                  <div style="
                    margin-top:18px;
                  ">

                    ${task.subtasks.map((s,si)=>`

                      <div style="
                        display:flex;
                        gap:10px;
                        margin-bottom:10px;
                      ">

                        <input
                          type="checkbox"
                          ${s.done ? "checked" : ""}
                          onchange="
                            toggleSubtask(
                              '${id}',
                              ${index},
                              ${si}
                            )
                          "
                        >

                        <div>
                          ${s.title}
                        </div>

                      </div>

                    `).join("")}

                  </div>

                ` : ""}

              </div>

            </div>

          </div>

        `).join("")}

      </div>

      <button
        onclick="addTask('${id}')"
        style="
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
        "
      >
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

  state.data[cat][index]
    .subtasks[si].done =
    !state.data[cat][index]
      .subtasks[si].done;

  openCategory(cat);
}

function addTask(cat) {

  const title =
    prompt("Task title");

  if (!title) return;

  const notes =
    prompt("Notes") || "";

  const date =
    prompt("Date") || "";

  const subtasks = [];

  while(true) {

    const sub =
      prompt(
        "Add subtask (Cancel to stop)"
      );

    if (!sub) break;

    subtasks.push({
      title:sub,
      done:false
    });
  }

  state.data[cat].push({
    title,
    notes,
    date,
    done:false,
    subtasks
  });

  openCategory(cat);
}

function editTask(cat,index) {

  const task =
    state.data[cat][index];

  const title =
    prompt(
      "Edit title",
      task.title
    );

  if (!title) return;

  task.title = title;

  task.notes =
    prompt(
      "Edit notes",
      task.notes || ""
    ) || "";

  task.date =
    prompt(
      "Edit date",
      task.date || ""
    ) || "";

  openCategory(cat);
}

function addCategory() {

  const name =
    prompt("Category name");

  if (!name) return;

  const id =
    name.toLowerCase()
      .replace(/\s+/g,"-");

  const file =
    `${id}.json`;

  const category = {
    id,
    name,
    file,
    icon:"📁",
    color:
      "#"+Math.floor(
        Math.random()*16777215
      ).toString(16)
  };

  state.categories.push(category);

  state.data[id] = [];

  renderHome();
}

async function setToken() {

  const token =
    prompt(
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

  if (!state.token) {
    alert("Add token first");
    return;
  }

  for (const cat of state.categories) {

    await saveFile(
      cat.file,
      state.data[cat.id]
    );
  }

  await saveFile(
    "sb-categories.json",
    state.categories
  );

  alert("Sync complete");
}

async function syncCategory(id) {

  if (!state.token) {
    alert("Add token first");
    return;
  }

  const cat =
    state.categories.find(
      c => c.id === id
    );

  await saveFile(
    cat.file,
    state.data[id]
  );

  alert("Saved");
}

async function saveFile(file,data) {

  const url =
`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}/${file}`;

  let sha = null;

  try {

    const existing =
      await fetch(url,{
        headers:{
          Authorization:
            `token ${state.token}`
        }
      });

    const existingJson =
      await existing.json();

    sha = existingJson.sha;

  } catch {}

  const content =
    btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify(data,null,2)
        )
      )
    );

  await fetch(url,{
    method:"PUT",
    headers:{
      Authorization:
        `token ${state.token}`,
      "Content-Type":
        "application/json"
    },
    body:JSON.stringify({
      message:`update ${file}`,
      content,
      sha
    })
  });
}

function buttonStyle() {
  return `
    background:#081225;
    color:white;
    border:none;
    padding:14px 18px;
    border-radius:14px;
    cursor:pointer;
  `;
}

function circleButton() {
  return `
    width:54px;
    height:54px;
    border-radius:50%;
    border:none;
    background:#081225;
    color:white;
    font-size:24px;
    cursor:pointer;
  `;
}

window.renderHome = renderHome;
window.openCategory = openCategory;
window.toggleTask = toggleTask;
window.toggleSubtask = toggleSubtask;
window.addTask = addTask;
window.editTask = editTask;
window.addCategory = addCategory;
window.setToken = setToken;
window.syncAll = syncAll;
window.syncCategory = syncCategory;
