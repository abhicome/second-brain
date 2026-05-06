function renderNavbar(){

  return `

    <div style="
      position:fixed;
      bottom:0;
      left:0;
      right:0;
      background:#020617;
      border-top:1px solid #13203A;
      display:flex;
      justify-content:space-around;
      padding:14px 0;
      z-index:999;
    ">

      <div
        onclick="renderHome()"
        style="
          text-align:center;
          cursor:pointer;
        "
      >
        <div style="font-size:24px;">🏠</div>
        <div style="font-size:12px;">Home</div>
      </div>

      <div
        onclick="renderTasks()"
        style="
          text-align:center;
          cursor:pointer;
        "
      >
        <div style="font-size:24px;">💼</div>
        <div style="font-size:12px;">Work</div>
      </div>

      <div
        onclick="renderProjects()"
        style="
          text-align:center;
          cursor:pointer;
        "
      >
        <div style="font-size:24px;">🚀</div>
        <div style="font-size:12px;">Projects</div>
      </div>

      <div style="
        text-align:center;
      ">
        <div style="font-size:24px;">📊</div>
        <div style="font-size:12px;">Report</div>
      </div>

    </div>

  `;

}