function progressBar(value = 0, color = '#3B82F6'){

  return `
    <div style="width:100%;height:10px;background:#0F172A;border-radius:999px;overflow:hidden;">
      <div style="width:${value}%;height:100%;background:${color};border-radius:999px;"></div>
    </div>
  `;

}