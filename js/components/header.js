function renderHeader(){
  return `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:40px;
    ">

      <div>
        <div style="font-size:18px;color:#64748B;">
          Welcome back
        </div>

        <div style="font-size:32px;font-weight:800;">
          Second Brain
        </div>
      </div>

      <button
        onclick="renderHome()"
        style="
          background:#081225;
          border:none;
          color:white;
          padding:14px 18px;
          border-radius:18px;
          cursor:pointer;
        "
      >
        Dashboard
      </button>

    </div>
  `;
}