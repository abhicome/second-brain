const root =
  document.getElementById(
    "root"
  );

const state = {
  tasks: [],
  projects: []
};

async function init(){

  await loadData();

  renderHome();

}

async function loadData(){

  try{

    const tasksRes =
      await fetch(
        "./data/work.json?v=99"
      );

    const projectsRes =
      await fetch(
        "./data/projects.json?v=99"
      );

    state.tasks =
      await tasksRes.json();

    state.projects =
      await projectsRes.json();

  }

  catch(err){

    console.log(err);

    state.tasks = [];
    state.projects = [];

  }

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
