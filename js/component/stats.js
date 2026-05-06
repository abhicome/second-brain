function renderStats(tasks, projects){

  const total =
    tasks.length +
    projects.length;

  const done =
    [
      ...tasks,
      ...projects
    ].filter(
      x => x.done
    ).length;

  const active =
    total - done;

  const overdue = 0;

  return `

    <div style="
      display:grid;
      grid-template-columns:
        repeat(4,1fr);
      gap:16px;
      margin-bottom:30px;
    ">

      ${statCard(
        total,
        "TASKS",
        "#3B82F6"
      )}

      ${statCard(
        done,
        "DONE",
        "#34D399"
      )}

      ${statCard(
        active,
        "ACTIVE",
        "#FBBF24"
      )}

      ${statCard(
        overdue,
        "OVERDUE",
        "#FB7185"
      )}

    </div>

  `;

}

function statCard(
  value,
  label,
  color
){

  return `

    <div style="
      background:#081225;
      border-radius:24px;
      padding:22px;
      text-align:center;
      border:1px solid #13203A;
    ">

      <div style="
        font-size:42px;
        font-weight:800;
        color:${color};
      ">
        ${value}
      </div>

      <div style="
        color:#64748B;
        margin-top:8px;
        font-size:14px;
      ">
        ${label}
      </div>

    </div>

  `;

}