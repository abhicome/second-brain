function renderTasks(){

  const items = state.tasks || [];

  const grouped = {
    inprogress: [],
    todo: [],
    done: []
  };

  items.forEach(item => {

    const status = (item.status || "todo").toLowerCase();

    if(grouped[status]){
      grouped[status].push(item);
    }else{
      grouped.todo.push(item);
    }

  });

  root.innerHTML = `

    <div style="
      padding:24px;
      padding-bottom:120px;
      max-width:1400px;
      margin:auto;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:40px;
      ">

        <button
          onclick="renderHome()"
          style="
            background:#081225;
            border:none;
            color:white;
            width:52px;
            height:52px;
            border-radius:999px;
            font-size:22px;
            cursor:pointer;
          "
        >
          ←
        </button>

        <div style="
          font-size:48px;
          font-weight:800;
          color:#3B82F6;
        ">
          Tasks
        </div>

        <button
          onclick="renderHome()"
          style="
            background:#081225;
            border:none;
            color:white;
            width:52px;
            height:52px;
            border-radius:999px;
            font-size:20px;
            cursor:pointer;
          "
        >
          🏠
        </button>

      </div>

      ${taskSection("🔥 In Progress", grouped.inprogress)}
      ${taskSection("⏳ Pending", grouped.todo)}
      ${taskSection("✅ Completed", grouped.done)}

    </div>

  `;

}

function taskSection(title, items){

  return `

    <div style="margin-bottom:40px;">

      <div style="
        font-size:24px;
        font-weight:700;
        margin-bottom:20px;
      ">
        ${title}
      </div>

      <div style="display:grid;gap:16px;">

        ${items.map(item => `

          <div style="
            background:#081225;
            border-radius:22px;
            padding:20px;
            border:1px solid #1E293B;
          ">

            <div style="
              font-size:20px;
              font-weight:700;
              margin-bottom:10px;
            ">
              ${item.title || "Untitled Task"}
            </div>

            <div style="
              color:#94A3B8;
              margin-bottom:12px;
            ">
              ${item.summary || item.description || ""}
            </div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;">

              <span style="
                background:#1E293B;
                padding:6px 12px;
                border-radius:999px;
                font-size:12px;
              ">
                ${item.priority || "normal"}
              </span>

              <span style="
                background:#1E293B;
                padding:6px 12px;
                border-radius:999px;
                font-size:12px;
              ">
                ${item.context || item.category || "general"}
              </span>

            </div>

          </div>

        `).join("")}

      </div>

    </div>

  `;

}