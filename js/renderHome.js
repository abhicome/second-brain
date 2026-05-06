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
          font-size:72px;
          font-weight:bold;
        ">
          Second Brain
        </div>

        <button
          id="tokenBtn"
          style="
            ${buttonStyle()}
          "
        >
          Key
        </button>

      </div>

      <div style="
        display:grid;
        gap:28px;
      ">

        <div
          id="tasksCard"
          style="
            background:#081225;
            padding:40px;
            border-radius:36px;
            cursor:pointer;
          "
        >

          <div style="
            font-size:64px;
            font-weight:bold;
            color:#3B82F6;
          ">
            Tasks
          </div>

        </div>

        <div
          id="projectsCard"
          style="
            background:#081225;
            padding:40px;
            border-radius:36px;
            cursor:pointer;
          "
        >

          <div style="
            font-size:64px;
            font-weight:bold;
            color:#8B5CF6;
          ">
            Projects
          </div>

        </div>

      </div>

    </div>

  `;

  document
    .getElementById(
      "tokenBtn"
    )
    .onclick = setToken;

  document
    .getElementById(
      "tasksCard"
    )
    .onclick = renderTasks;

  document
    .getElementById(
      "projectsCard"
    )
    .onclick = renderProjects;

}
