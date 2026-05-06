function taskCard(task){

  return `
    <div style="background:#081225;padding:20px;border-radius:20px;border:1px solid #1E293B;">
      <div style="font-size:20px;font-weight:700;margin-bottom:8px;">
        ${task.title}
      </div>
      <div style="color:#94A3B8;">
        ${task.summary || ''}
      </div>
    </div>
  `;

}