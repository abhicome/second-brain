function rawUrl(file){

  return `./data/${file}?v=${Date.now()}`;

}

function buttonStyle(){

  return `
    background:#081225;
    color:white;
    border:none;
    padding:14px 18px;
    border-radius:14px;
    cursor:pointer;
  `;

}

function circleButton(){

  return `
    width:54px;
    height:54px;
    border-radius:50%;
    border:none;
    background:#081225;
    color:white;
    font-size:24px;
    cursor:pointer;
  `;

}
