function renderPrioritySection(tasks){

  const priorityTasks = (tasks || [])
    .filter(t => t.priority === 'high' && t.status !== 'done')
    .slice(0,3);

  return `
    <div style="margin-top:30px;margin-bottom:40px;">

      <div style="font-size:18px;color:#64748B;margin-bottom:18px;letter-spacing:2px;">
        PRIORITY TASKS
      </div>

      <div style="display:grid;gap:16px;">

        ${priorityTasks.map(task => `
          <div style="background:#081225;border-radius:24px;padding:20px;border:1px solid #EF444455;">
            <div style="font-size:22px;font-weight:700;margin-bottom:8px;">
              ${task.title}
            </div>
            <div style="color:#94A3B8;">
              ${task.summary || ''}
            </div>
          </div>
        `).join('')}

      </div>

    </div>
  `;
}