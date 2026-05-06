function buttonStyle(){

  return `
    background:#081225;
    color:white;
    border:none;
    padding:14px 20px;
    border-radius:18px;
    font-size:16px;
    cursor:pointer;
  `;

}

function circleButton(){

  return `
    width:60px;
    height:60px;
    border-radius:50%;
    border:none;
    background:#081225;
    color:white;
    font-size:28px;
    cursor:pointer;
  `;

}

function rawUrl(file){

  return `./data/${file}?v=${Date.now()}`;

}
