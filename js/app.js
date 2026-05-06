async function init(){

  root.innerHTML = `
    <div style="
      padding:24px;
      font-size:28px;
    ">
      Loading...
    </div>
  `;

  await loadAllData();

  renderHome();

}

function syncData(){

  init();

}

init();
