async function init(){
  try{
    await loadAllData();

    state.tasks = state.data.tasks || [];
    state.projects = state.data.projects || [];
    state.knowledge = state.data.knowledge || [];
    state.watchlist = state.data.watchlist || [];
    state.finance = state.data.finance || [];
    state.health = state.data.health || [];

    renderHome();
  }
  catch(err){
    console.log(err);

    root.innerHTML = `<div style="padding:40px;color:red;white-space:pre-wrap;">${err}</div>`;
  }
}

init();