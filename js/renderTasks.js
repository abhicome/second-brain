function renderTasks(){

  const items =
    state.data.tasks || [];

  const grouped = {

    inprogress:[],
    todo:[],
    done:[]

  };

  items.forEach(item => {

    const status =
      item.status || "todo";

    if(grouped[status]){

      grouped[status].push(item);

    }else{

      grouped.todo.push(item);

    }

  });

  root.innerHTML = `

    <div style="
      padding:24px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:40px;
      ">

        <button
          onclick="renderHome()"
          style="${circleButton()}"
        >
          ←
        </button>

        <div style="
          font-size:64px;
          font-weight:bold;
          color:#3B82F6;
        ">
          Tasks
        </div>

        <button
          onclick="syncData()"
          style="${circleButton()}"
        >
          ⟳
        </button>

      </div>

      ${groupSection(
        "🔥 In Progress",
        grouped.inprogress,
        "tasks"
      )}

      ${groupSection(
        "⏳ Pending",
        grouped.todo,
        "tasks"
      )}

      ${groupSection(
        "✅ Completed",
        grouped.done,
        "tasks"
      )}

    </div>

  `;

}
