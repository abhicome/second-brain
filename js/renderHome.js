function renderHome(){

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

        <div style="
          font-size:52px;
          font-weight:bold;
        ">
          Second Brain
        </div>

        <button
          onclick="setToken()"
          style="${buttonStyle()}"
        >
          Key
        </button>

      </div>

      <div style="
        display:grid;
        gap:20px;
      ">

        <div
          onclick="renderTasks()"
          style="
            background:#081225;
            padding:28px;
            border-radius:28px;
            cursor:pointer;
          "
        >

          <div style="
            font-size:42px;
            color:#3B82F6;
            font-weight:bold;
          ">
            Tasks
          </div>

        </div>

        <div
          onclick="renderProjects()"
          style="
            background:#081225;
            padding:28px;
            border-radius:28px;
            cursor:pointer;
          "
        >

          <div style="
            font-size:42px;
            color:#8B5CF6;
            font-weight:bold;
          ">
            Projects
          </div>

        </div>

      </div>

    </div>

  `;

}
