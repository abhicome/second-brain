function renderProjectCard(project){

  const completed =
    project.subtasks
      ? project.subtasks.filter(
          s => s.done
        ).length
      : 0;

  const total =
    project.subtasks
      ? project.subtasks.length
      : 0;

  return `

    <div style="
      background:#081225;
      padding:24px;
      border-radius:28px;
      margin-bottom:24px;
      border:1px solid #13203A;
    ">

      <div style="
        font-size:34px;
        font-weight:800;
        margin-bottom:12px;
      ">
        ${project.title}
      </div>

      <div style="
        color:#94A3B8;
        line-height:1.5;
        margin-bottom:18px;
      ">
        ${project.notes || ""}
      </div>

      <div style="
        color:#8B5CF6;
        margin-bottom:14px;
        font-weight:700;
      ">
        ${project.date || ""}
      </div>

      ${renderProgressBar(
        completed,
        total
      )}

    </div>

  `;

}
