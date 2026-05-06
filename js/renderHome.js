function renderHome(){

  const tasks = state.tasks || [];
  const projects = state.projects || [];

  const openTasks = tasks.filter(t => t.status !== 'done');
  const activeProjects = projects.filter(p => p.status !== 'done');

  const urgentTasks = [
    ...tasks,
    ...projects
  ]
  .filter(item =>
    item.priority === 'high' ||
    item.priority === 'urgent'
  )
  .slice(0,6);

  root.innerHTML = `

    <div style="
      padding:24px;
      padding-bottom:140px;
      max-width:1400px;
      margin:auto;
    ">

      ${renderHeader()}

      <div style="margin-bottom:30px;">

        <div style="
          font-size:20px;
          color:#64748B;
          margin-bottom:10px;
          letter-spacing:2px;
        ">
          YOUR SECOND BRAIN
        </div>

        <div style="
          font-size:64px;
          font-weight:800;
          line-height:1;
          margin-bottom:14px;
        ">
          Dashboard
        </div>

        <div style="
          color:#64748B;
          font-size:18px;
        ">
          ${openTasks.length}
          open tasks ·
          ${activeProjects.length}
          active projects
        </div>

      </div>

      ${renderStats(tasks, projects)}

      <div style="margin-top:40px;">

        <div style="
          font-size:18px;
          color:#64748B;
          margin-bottom:20px;
          letter-spacing:2px;
        ">
          PRIORITY ITEMS
        </div>

        <div style="display:grid;gap:16px;">
          ${urgentTasks.map(task => `
            <div style="
              background:#081225;
              border-radius:22px;
              padding:22px;
              border:1px solid #1E293B;
            ">
              <div style="font-size:24px;font-weight:700;margin-bottom:10px;">
                ${task.title}
              </div>

              <div style="color:#94A3B8;line-height:1.6;">
                ${task.summary || ''}
              </div>

              <div style="margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                <span style="
                  background:${task.priority === 'urgent' ? '#EF444422' : '#F59E0B22'};
                  color:${task.priority === 'urgent' ? '#EF4444' : '#F59E0B'};
                  padding:6px 12px;
                  border-radius:999px;
                  font-size:12px;
                  font-weight:700;
                ">
                  ${task.priority}
                </span>

                <span style="color:#64748B;font-size:13px;">
                  ${task.dueDate || ''}
                </span>
              </div>
            </div>
          `).join('')}
        </div>

      </div>

      <div style="margin-top:40px;">

        <div style="
          font-size:18px;
          color:#64748B;
          margin-bottom:20px;
          letter-spacing:2px;
        ">
          CATEGORIES
        </div>

        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          gap:20px;
        ">

          ${homeCard('💼','Work','#3B82F6','renderTasks()',tasks.length)}
          ${homeCard('🚀','Projects','#8B5CF6','renderProjects()',projects.length)}
          ${homeCard('🧠','Knowledge','#F59E0B','',state.knowledge?.length || 0)}
          ${homeCard('❤️','Health','#EF4444','',state.health?.length || 0)}
          ${homeCard('👁️','Watchlist','#06B6D4','',state.watchlist?.length || 0)}
          ${homeCard('🌿','Personal','#22C55E','',state.personal?.length || 0)}

        </div>

      </div>

      ${renderNavbar()}

    </div>

  `;

}

function homeCard(icon,title,color,click="",count=""){

  return `

    <div
      onclick="${click}"
      style="
        background:#081225;
        border-radius:30px;
        padding:28px;
        min-height:220px;
        border:1px solid ${color}55;
        cursor:pointer;
        position:relative;
        transition:0.2s;
      "
    >

      <div style="
        position:absolute;
        top:18px;
        right:18px;
        background:${color};
        width:34px;
        height:34px;
        border-radius:999px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:14px;
        font-weight:700;
      ">
        ${count}
      </div>

      <div style="font-size:54px;margin-bottom:22px;">
        ${icon}
      </div>

      <div style="font-size:34px;font-weight:700;">
        ${title}
      </div>

    </div>

  `;

}
