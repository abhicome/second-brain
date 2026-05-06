async function loadAllData(){

  for(const id in CATEGORY_CONFIG){

    const config =
      CATEGORY_CONFIG[id];

    try{

      const res =
        await fetch(
          rawUrl(config.file)
        );

      const text =
        await res.text();

      const json =
        JSON.parse(text);

      state.raw[id] = json;

      state.data[id] =
        json[config.key] || [];

    }catch(e){

      console.error(e);

      state.data[id] = [];

    }

  }

}

function setToken(){

  const token =
    prompt(
      "Enter GitHub Token",
      state.token || ""
    );

  if(!token) return;

  state.token = token;

  localStorage.setItem(
    "github_token",
    token
  );

  alert("Token Saved");

}
