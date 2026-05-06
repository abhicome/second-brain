function renderHeader(){

  return `

    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:30px;
    ">

      <div>

        <div style="
          font-size:18px;
          color:#64748B;
          margin-bottom:6px;
        ">
          ● Live Preview • GitHub Drive ✓
        </div>

        <div style="
          font-size:52px;
          font-weight:800;
        ">
          Second Brain
        </div>

      </div>

      <div style="
        display:flex;
        gap:12px;
      ">

        <button
          onclick="setToken()"
          style="${buttonStyle()}"
        >
          🔑
        </button>

      </div>

    </div>

  `;

}