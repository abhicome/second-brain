function groupSection(
  title,
  items,
  type
){

  if(!items.length)
    return "";

  return `

    <div style="
      margin-bottom:40px;
    ">

      <div style="
        font-size:28px;
        font-weight:bold;
        margin-bottom:20px;
      ">
        ${title}
      </div>

      ${items.map(item =>
        renderCard(type,item)
      ).join("")}

    </div>

  `;

}

function renderCard(
  type,
  item
){

  if(type === "tasks"){

    const status =
      item.status || "todo";

    const badgeColor =
      status === "done"
      ? "#10B981"
      : status === "inprogress"
      ? "#F59E0B"
      : "#3B82F6";

    const badgeText =
      status === "done"
      ? "Completed"
      : status === "inprogress"
      ? "In Progress"
      : "Pending";

    return `

      <div style="
        background:#081225;
        border-radius:28px;
        padding:24px;
        margin-bottom:18px;
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:20px;
        ">

          <div style="
            display:flex;
            gap:16px;
            flex:1;
          ">

            <input
              type="checkbox"
              ${status === "done" ? "checked" : ""}
            >

            <div style="flex:1;">

              <div style="
                font-size:32px;
                font-weight:bold;
              ">
                ${item.title || ""}
              </div>

              <div style="
                margin-top:10px;
                color:#94A3B8;
                font-size:20px;
              ">
                ${item.notes || ""}
              </div>

              <div style="
                margin-top:16px;
                color:#94A3B8;
              ">
                ${item.date || ""}
              </div>

            </div>

          </div>

          <div style="
            background:${badgeColor}22;
            color:${badgeColor};
            padding:8px 14px;
            border-radius:14px;
            font-size:14px;
            font-weight:bold;
          ">
            ${badgeText}
          </div>

        </div>

      </div>

    `;

  }

  if(type === "projects"){

    return `

      <div style="
        background:#081225;
        border-radius:28px;
        padding:24px;
        margin-bottom:24px;
      ">

        <div style="
          font-size:42px;
          font-weight:bold;
          margin-bottom:16px;
        ">
          ${item.title}
        </div>

        <div style="
          color:#94A3B8;
          line-height:1.5;
          font-size:22px;
          margin-bottom:20px;
        ">
          ${item.notes || ""}
        </div>

        <div style="
          color:#8B5CF6;
          margin-bottom:24px;
        ">
          ${item.status || "inprogress"}
        </div>

        ${(item.subtasks || []).map(sub => `

          <div style="
            display:flex;
            gap:14px;
            margin-bottom:14px;
          ">

            <input
              type="checkbox"
              ${sub.done ? "checked" : ""}
            >

            <div style="
              font-size:20px;
            ">
              ${sub.title}
            </div>

          </div>

        `).join("")}

      </div>

    `;

  }

  return "";

}
