function renderProjects(){

  const items = state.projects || [];

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
          color:#8B5CF6;
        ">
          Projects
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

      <div style="display:grid;gap:20px;">

        ${items.map(project => `

          <div style="
            background:#081225;
            border-radius:28px;
            padding:24px;
            border:1px solid #312E81;
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              gap:20px;
              margin-bottom:16px;
            ">

              <div>

                <div style="
                  font-size:28px;
                  font-weight:700;
                  margin-bottom:10px;
                ">
                  ${project.title || "Untitled Project"}
                </div>

                <div style="
                  color:#94A3B8;
                  line-height:1.5;
                ">
                  ${project.summary || project.description || ""}
                </div>

              </div>

              <div style="
                background:#8B5CF6;
                padding:10px 14px;
                border-radius:999px;
                font-size:14px;
                font-weight:700;
                white-space:nowrap;
              ">
                ${project.status || "active"}
              </div>

            </div>

            <div style="margin-top:20px;">

              <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
                font-size:14px;
                color:#94A3B8;
              ">

                <span>Priority</span>

                <span>
                  ${project.priority || "medium"}
                </span>

              </div>

              <div style="
                width:100%;
                height:12px;
                background:#0F172A;
                border-radius:999px;
                overflow:hidden;
              ">

                <div style="
                  width:${project.status === "done" ? "100" : project.status === "inprogress" ? "65" : "20"}%;
                  height:100%;
                  background:#8B5CF6;
                  border-radius:999px;
                ">
                </div>

              </div>

            </div>

          </div>

        `).join("")}

      </div>

    </div>

  `;

}