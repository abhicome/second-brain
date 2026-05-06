async function loadAllData(){

  for(const id in CATEGORY_CONFIG){

    const cat =
      CATEGORY_CONFIG[id];

    try{

      const res =
        await fetch(
          rawUrl(cat.file)
        );

      const text =
        await res.text();

      const json =
        JSON.parse(text);

      state.raw[id] = json;

      state.data[id] =
        json[cat.key] || [];

    }catch(e){

      console.error(cat.file,e);

      state.raw[id] = {};

      state.data[id] = [];

    }

  }

}

async function setToken(){

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
