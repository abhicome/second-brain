const root =
  document.getElementById(
    "root"
  );

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

    if(
      typeof renderHome ===
      "function"
    ){

      renderHome();

    }

    else{

      root.innerHTML = `
        <div style="
          padding:40px;
          color:red;
          font-size:24px;
        ">
          renderHome missing
        </div>
      `;

    }

  }

  catch(err){

    console.log(err);

    root.innerHTML = `

      <div style="
        padding:40px;
        color:red;
        font-size:20px;
        white-space:pre-wrap;
      ">

        ${err}

      </div>

    `;

  }

}

async function loadData(){

  async function loadFile(path){

    try{

      const res =
        await fetch(
          path +
          "?v=" +
          Date.now()
        );

      return await res.json();

    }

    catch{

      return [];

    }

  }

  state.tasks =
    await loadFile(
      "./data/work.json"
    );

  state.projects =
    await loadFile(
      "./data/projects.json"
    );

  state.knowledge =
    await loadFile(
      "./data/knowledge.json"
    );

  state.watchlist =
    await loadFile(
      "./data/watchlist.json"
    );

  state.finance =
    await loadFile(
      "./data/bills.json"
    );

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

  const token =
    prompt(
      "Enter GitHub Token"
    );

  if(token){

    localStorage.setItem(
      "github_token",
      token
    );

    alert(
      "Token Saved"
    );

  }

}

init();
