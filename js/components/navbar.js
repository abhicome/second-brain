function renderNavbar(){

  return `

    <div style="
      position:fixed;
      bottom:20px;
      left:50%;
      transform:translateX(-50%);
      background:#081225;
      border:1px solid #1E293B;
      border-radius:999px;
      padding:14px 20px;
      display:flex;
      gap:18px;
      z-index:999;
      box-shadow:0 10px 30px rgba(0,0,0,0.4);
    ">

      <button onclick="renderHome()" style="${navBtn()}">
        🏠
      </button>

      <button onclick="renderTasks()" style="${navBtn()}">
        ✅
      </button>

      <button onclick="renderProjects()" style="${navBtn()}">
        🚀
      </button>

    </div>

  `;

}

function navBtn(){

  return `
    background:none;
    border:none;
    color:white;
    font-size:24px;
    cursor:pointer;
  `;

}