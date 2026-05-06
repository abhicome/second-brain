function projectCard(project){

  return `
    <div style="background:#081225;padding:20px;border-radius:20px;border:1px solid #312E81;">
      <div style="font-size:22px;font-weight:700;margin-bottom:10px;">
        ${project.title}
      </div>
      <div style="color:#94A3B8;">
        ${project.summary || ''}
      </div>
    </div>
  `;

}