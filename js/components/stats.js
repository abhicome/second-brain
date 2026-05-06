function renderStats(tasks, projects){

  return `

    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:20px;
      margin-bottom:40px;
    ">

      ${statCard("Tasks", tasks.length, "#3B82F6")}
      ${statCard("Projects", projects.length, "#8B5CF6")}
      ${statCard("Completed", tasks.filter(t => t.status === 'done').length, "#22C55E")}

    </div>

  `;

}

function statCard(title, value, color){

  return `

    <div style="
      background:#081225;
      border-radius:24px;
      padding:24px;
      border:1px solid ${color}55;
    ">

      <div style="
        color:#94A3B8;
        margin-bottom:10px;
      ">
        ${title}
      </div>

      <div style="
        font-size:42px;
        font-weight:800;
        color:${color};
      ">
        ${value}
      </div>

    </div>

  `;

}