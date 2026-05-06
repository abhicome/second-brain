function renderTaskCard(task){

  const status =
    task.done
      ? "DONE"
      : "IN PROGRESS";

  const color =
    task.done
      ? "#34D399"
      : "#FBBF24";

  return `

    <div style="
      background:#081225;
      padding:24px;
      border-radius:26px;
      margin-bottom:18px;
      border:1px solid #13203A;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:12px;
      ">

        <div style="
          font-size:30px;
          font-weight:700;
          flex:1;
        ">
          ${task.title}
        </div>

        <div style="
          background:${color}22;
          color:${color};
          padding:8px 14px;
          border-radius:14px;
          font-size:13px;
          font-weight:700;
        ">
          ${status}
        </div>

      </div>

      <div style="
        color:#64748B;
        font-size:16px;
      ">
        ${task.date || ""}
      </div>

    </div>

  `;

}
