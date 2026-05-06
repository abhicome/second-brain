function renderProjects(){

  const items =
    state.data.projects || [];

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
          color:#8B5CF6;
        ">
          Projects
        </div>

        <button
          onclick="syncData()"
          style="${circleButton()}"
        >
          ⟳
        </button>

      </div>

      ${items.map(item =>
        renderCard(
          "projects",
          item
        )
      ).join("")}

    </div>

  `;

}
