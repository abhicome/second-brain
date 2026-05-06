const REPO_OWNER = "abhicome";
const REPO_NAME = "second-brain";
const DATA_PATH = "data";

const app =
  document.getElementById("root") ||
  document.getElementById("app");

const CATEGORY_CONFIG = {
  tasks: {
    file: "tasks.json",
    key: "tasks",
    color: "#3B82F6",
    icon: "✅",
    title: "Tasks"
  },

  projects: {
    file: "projects.json",
    key: "projects",
    color: "#8B5CF6",
    icon: "🚀",
    title: "Projects"
  },

  logs: {
    file: "logs.json",
    key: "logs",
    color: "#10B981",
    icon: "📝",
    title: "Logs"
  },

  knowledge: {
    file: "knowledge.json",
    key: "notes",
    color: "#2563EB",
    icon: "📘",
    title: "Knowledge"
  },

  watchlist: {
    file: "watchlist.json",
    key: "items",
    color: "#D946EF",
    icon: "🎬",
    title: "Watchlist"
  },

  finance: {
    file: "finance.json",
    key: "bills",
    color: "#F59E0B",
    icon: "💳",
    title: "Finance"
  },

  health: {
    file: "health.json",
    key: "reports",
    color: "#EF4444",
    icon: "❤️",
    title: "Health"
  }
};

let state = {
  token: localStorage.getItem("github_token") || "",
  data: {},
  raw: {},
  current: null
};

init();

async function init() {
  renderLoading();

  await loadAllData();

  renderHome();
}

function renderLoading() {
  app.innerHTML = `
    <div style="
      background:#020617;
      color:white;
      min-height:100vh;
      padding:40px;
      font-size:22px;
      font-family:sans-serif;
    ">
      Loading Second Brain...
    </div>
  `;
}

function rawUrl(file) {
  return `./data/${file}?v=${Date.now()}`;
}

async function loadAllData() {

  for (const id in CATEGORY_CONFIG) {

    const cat = CATEGORY_CONFIG[id];

    try {

      const res =
        await fetch(rawUrl(cat.file));

      const text =
        await res.text();

      const json =
        JSON.parse(text);

      state.raw[id] = json;

      state.data[id] =
        json[cat.key] || [];

    } catch (e) {

      console.error(cat.file,e);

      state.raw[id] = {};

      state.data[id] = [];
    }
  }
}

function renderHome() {

  let total = 0;

  Object.keys(state.data)
    .forEach(k => {
      total += state.data[k].length;
    });

  app.innerHTML = `
    <div style="
      background:#020617;
      color:white;
      min-height:100vh;
      padding:20px;
      padding-bottom:120px;
      font-family:sans-serif;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
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

          <button
            onclick="setToken()"
            style="${buttonStyle()}">
            Key
          </button>

          <button
            onclick="syncAll()"
            style="${buttonStyle()}">
            Sync
          </button>

        </div>

      </div>

      <div style="
        margin-top:30px;
        font-size:44px;
        font-weight:bold;
      ">
        Your Second Brain
      </div>

      <div style="
        margin-top:8px;
        color:#94A3B8;
      ">
        ${new Date().toDateString()}
      </div>

      <div style="
        margin-top:30px;
        background:#081225;
        border-radius:24px;
        padding:30px;
      ">

        <div style="
          color:#94A3B8;
        ">
          TOTAL ITEMS
        </div>

        <div style="
          margin-top:10px;
          font-size:52px;
          font-weight:bold;
        ">
          ${total}
        </div>

      </div>

      <div style="
        margin-top:40px;
        margin-bottom:20px;
        font-size:24px;
        font-weight:bold;
      ">
        Categories
      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
      ">

        ${Object.keys(CATEGORY_CONFIG)
          .map(id => {

            const cat =
              CATEGORY_CONFIG[id];

            return `
              <div
                onclick="openCategory('${id}')"
                style="
                  background:#081225;
                  border:2px solid ${cat.color};
                  border-radius:24px;
                  padding:20px;
                  cursor:pointer;
                "
              >

                <div style="
                  font-size:34px;
                ">
                  ${cat.icon}
                </div>

                <div style="
                  margin-top:16px;
                  font-size:26px;
                  font-weight:bold;
                ">
                  ${cat.title}
                </div>

                <div style="
                  margin-top:10px;
                  color:#94A3B8;
                ">
                  ${state.data[id].length} items
                </div>

              </div>
            `;
          }).join("")}

      </div>

    </div>
  `;
}

function openCategory(id) {

  state.current = id;

  const cat =
    CATEGORY_CONFIG[id];

  const items =
    state.data[id];

  app.innerHTML = `
    <div style="
      background:#020617;
      color:white;
      min-height:100vh;
      padding:20px;
      padding-bottom:120px;
      font-family:sans-serif;
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
          font-size:34px;
          font-weight:bold;
          color:${cat.color};
        ">
          ${cat.title}
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

        ${items.map(item => {

          return renderCard(id,item);

        }).join("")}

      </div>

    </div>
  `;
}

function renderCard(type,item) {

  if (type === "projects") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:28px;
          font-weight:bold;
        ">
          ${item.title || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#94A3B8;
        ">
          ${item.summary || ""}
        </div>

        <div style="
          margin-top:14px;
          color:#8B5CF6;
        ">
          ${item.status || ""}
        </div>

        ${item.subtasks ?
          `
          <div style="
            margin-top:20px;
          ">

            ${item.subtasks.map(sub => `
              <div style="
                display:flex;
                gap:10px;
                margin-bottom:10px;
              ">

                <input
                  type="checkbox"
                  ${sub.status === "done"
                    ? "checked"
                    : ""}
                >

                <div>
                  ${sub.title}
                </div>

              </div>
            `).join("")}

          </div>
          `
          : ""
        }

      </div>
    `;
  }

  if (type === "tasks") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          display:flex;
          gap:14px;
        ">

          <input
            type="checkbox"
            ${item.status === "done"
              ? "checked"
              : ""}
          >

          <div>

            <div style="
              font-size:24px;
              font-weight:bold;
            ">
              ${item.title || ""}
            </div>

            <div style="
              margin-top:8px;
              color:#94A3B8;
            ">
              ${item.dueDate || ""}
            </div>

          </div>

        </div>

      </div>
    `;
  }

  if (type === "logs") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${item.title || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#94A3B8;
        ">
          ${item.summary || ""}
        </div>

        <div style="
          margin-top:12px;
          color:#10B981;
        ">
          Next: ${item.nextStep || ""}
        </div>

      </div>
    `;
  }

  if (type === "knowledge") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${item.title || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#94A3B8;
        ">
          ${item.type || ""}
        </div>

      </div>
    `;
  }

  if (type === "watchlist") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${item.title || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#94A3B8;
        ">
          ${item.type || ""}
        </div>

      </div>
    `;
  }

  if (type === "finance") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${item.name || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#F59E0B;
        ">
          ₹${item.amount || ""}
        </div>

      </div>
    `;
  }

  if (type === "health") {

    return `
      <div style="
        background:#081225;
        border-radius:24px;
        padding:20px;
        margin-bottom:16px;
      ">

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${item.type || ""}
        </div>

        <div style="
          margin-top:10px;
          color:#94A3B8;
        ">
          ${item.date || ""}
        </div>

      </div>
    `;
  }

  return "";
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

  alert("Token Saved");
}

async function syncAll() {

  alert(
    "Database sync architecture ready"
  );
}

async function syncCategory(id) {

  alert(
    CATEGORY_CONFIG[id].title +
    " synced"
  );
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
window.setToken = setToken;
window.syncAll = syncAll;
window.syncCategory = syncCategory;
