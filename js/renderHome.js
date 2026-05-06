function renderHome(){

  const tasks =
    state.data.tasks || [];

  const projects =
    state.data.projects || [];

  const knowledge =
    state.data.knowledge || [];

  const watchlist =
    state.data.watchlist || [];

  const finance =
    state.data.finance || [];

  const health =
    state.data.health || [];

  const total =
    tasks.length +
    projects.length;

  const done =
    tasks.filter(
      t => t.status === "done"
    ).length;

  const active =
    tasks.filter(
      t => t.status === "inprogress"
    ).length;

  root.innerHTML = `

    <div style="
      padding:24px;
      padding-bottom:120px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:30px;
      ">

        <div style="
          font-size:64px;
          font-weight:bold;
        ">
          Second Brain
        </div>

        <div style="
          display:flex;
          gap:14px;
          align-items:center;
        ">

          <div style="
            color:#10B981;
            font-size:18px;
          ">
            Ready
          </div>

          <button
            id="tokenBtn"
            style="${buttonStyle()}"
          >
            Key
          </button>

        </div>

      </div>

      <div style="
        font-size:72px;
        font-weight:bold;
        margin-bottom:10px;
      ">
        Your Second Brain
      </div>

      <div style="
        color:#94A3B8;
        font-size:24px;
        margin-bottom:40px;
      ">
        ${new Date().toDateString()}
      </div>

      <div style="
        display:grid;
        grid-template-columns:
          repeat(4,1fr);
        gap:20px;
        margin-bottom:40px;
      ">

        ${statCard(
          total,
          "TOTAL",
          "#3B82F6"
        )}

        ${statCard(
          done,
          "DONE",
          "#10B981"
        )}

        ${statCard(
          active,
          "ACTIVE",
          "#F59E0B"
        )}

        ${statCard(
          0,
          "OVERDUE",
          "#EF4444"
        )}

      </div>

      <div style="
        font-size:32px;
        font-weight:bold;
        margin-bottom:20px;
      ">
        CATEGORIES
      </div>

      <div style="
        display:grid;
        grid-template-columns:
          repeat(2,1fr);
        gap:22px;
      ">

        ${homeTile(
          "tasks",
          "Tasks",
          "#3B82F6",
          tasks.length
        )}

        ${homeTile(
          "projects",
          "Projects",
          "#8B5CF6",
          projects.length
        )}

        ${homeTile(
          "knowledge",
          "Knowledge",
          "#2563EB",
          knowledge.length
        )}

        ${homeTile(
          "watchlist",
          "Watchlist",
          "#D946EF",
          watchlist.length
        )}

        ${homeTile(
          "finance",
          "Bills",
          "#F59E0B",
          finance.length
        )}

        ${homeTile(
          "health",
          "Health",
          "#EF4444",
          health.length
        )}

      </div>

    </div>

  `;

  document
    .getElementById(
      "tokenBtn"
    )
    .onclick = setToken;

  bindTile("tasks");
  bindTile("projects");

}

function statCard(
  value,
  label,
  color
){

  return `

    <div style="
      background:#081225;
      border-radius:28px;
      padding:26px;
      text-align:center;
    ">

      <div style="
        font-size:52px;
        font-weight:bold;
        color:${color};
      ">
        ${value}
      </div>

      <div style="
        margin-top:10px;
        color:#94A3B8;
        font-size:18px;
      ">
        ${label}
      </div>

    </div>

  `;

}

function homeTile(
  id,
  title,
  color,
  count
){

  return `

    <div
      id="tile-${id}"
      style="
        background:#081225;
        border-radius:32px;
        padding:28px;
        cursor:pointer;
      "
    >

      <div style="
        font-size:42px;
        font-weight:bold;
        color:${color};
        margin-bottom:16px;
      ">
        ${title}
      </div>

      <div style="
        color:#94A3B8;
        font-size:22px;
      ">
        ${count} items
      </div>

    </div>

  `;

}

function bindTile(id){

  const el =
    document.getElementById(
      `tile-${id}`
    );

  if(!el) return;

  if(id === "tasks")
    el.onclick = renderTasks;

  if(id === "projects")
    el.onclick = renderProjects;

}
