const root =
  document.getElementById("root");

let state = {

  token:
    localStorage.getItem(
      "github_token"
    ) || "",

  data:{},

  raw:{},

  current:null

};
