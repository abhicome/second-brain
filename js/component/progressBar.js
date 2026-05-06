function renderProgressBar(
  completed,
  total
){

  const percent =
    total === 0
      ? 0
      : Math.round(
          completed /
          total * 100
        );

  return `

    <div style="
      margin-top:14px;
    ">

      <div style="
        height:10px;
        background:#0F172A;
        border-radius:999px;
        overflow:hidden;
      ">

        <div style="
          width:${percent}%;
          height:100%;
          background:#8B5CF6;
        "></div>

      </div>

      <div style="
        margin-top:8px;
        color:#64748B;
        font-size:14px;
      ">
        ${percent}% Complete
      </div>

    </div>

  `;

}