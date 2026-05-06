const root = document.getElementById("root");

const state = {
  tasks: [],
  projects: [],
  knowledge: [],
  watchlist: [],
  finance: [],
  health: []
};

async function init(){

  try{

    await loadData();

    if(typeof renderHome === "function"){
      renderHome();
    }
    else{
      root.innerHTML = `
        <div style="padding:40px;color:red;font-size:24px;">
          renderHome missing
        </div>
      `;
    }

  }
  catch(err){

    console.log(err);

    root.innerHTML = `
      <div style="padding:40px;color:red;font-size:20px;white-space:pre-wrap;">
        ${err}
      </div>
    `;

  }

}

async function loadData(){

  async function loadFile(path){

    try{

      const res = await fetch(
        path + "?v=" + Date.now()
      );

      return await res.json();

    }
    catch(err){
      console.log(err);
      return [];
    }

  }

  const tasksData = await loadFile("./data/work.json");
  const projectsData = await loadFile("./data/projects.json");
  const knowledgeData = await loadFile("./data/knowledge.json");
  const watchlistData = await loadFile("./data/watchlist.json");
  const financeData = await loadFile("./data/bills.json");

  state.tasks = tasksData.tasks || tasksData || [];
  state.projects = projectsData.projects || projectsData || [];
  state.knowledge = knowledgeData.knowledge || knowledgeData || [];
  state.watchlist = watchlistData.watchlist || watchlistData || [];
  state.finance = financeData.bills || financeData || [];

}

function buttonStyle(){

  return `
    background:#081225;
    border:none;
    color:white;
    padding:14px 20px;
    border-radius:18px;
    font-size:18px;
    cursor:pointer;
  `;

}

function setToken(){

  const token = prompt("Enter GitHub Token");

  if(token){

    localStorage.setItem(
      "github_token",
      token
    );

    alert("Token Saved");

  }

}

init();