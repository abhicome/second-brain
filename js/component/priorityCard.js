function renderPrioritySection(tasks){

  const urgent =
    tasks
      .filter(
        t => !t.done
      )
      .slice(0,4);

  return `

    <div style="
      margin-bottom:30px;
    ">

      <div style="
        font-size:18px;
        font-weight:700;
        margin-bottom:16px;
        color:#F97316;
      ">
        🔥 Urgent & High Priority
      </div>

      ${urgent.map(task => `

        <div style="
          background:#081225;
          padding:20px;
          border-radius:20px;
          margin-bottom:14px;
          border:1px solid #13203A;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
          ">

            <div style="
              font-size:22px;
              font-weight:600;
            ">
              ${task.title}
            </div>

            <div style="
              background:#3B82F620;
              color:#3B82F6;
              padding:6px 12px;
              border-radius:12px;
              font-size:12px;
            ">
              HIGH
            </div>

          </div>

          <div style="
            margin-top:10px;
            color:#64748B;
            font-size:15px;
          ">
            ${task.date || ""}
          </div>

        </div>

      `).join("")}

    </div>

  `;

}