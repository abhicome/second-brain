console.log("APP STARTED");

const app=document.getElementById("app");
const statusTxt=document.getElementById("status");

let tab="home";

let tasks=[
{
id:"1",
title:"DHCP Failover UAT",
category:"work",
priority:"high",
status:"todo",
notes:"Discuss with Vikas"
},
{
id:"2",
title:"AD Transformation",
category:"projects",
priority:"urgent",
status:"inprogress",
notes:"Awaiting Microsoft response"
}
];

let worklog=[
{
id:"1",
text:"Worked on DHCP issue",
date:"2026-05-06"
}
];

function setStatus(t,c){
statusTxt.innerText=t;
statusTxt.style.color=c||"#34D399";
}

function render(){

if(tab==="home"){

app.innerHTML=`
<h1 style="font-size:28px;font-weight:700;margin-bottom:6px;">
Your Second Brain
</h1>

<div class="small" style="margin-bottom:18px;">
${new Date().toLocaleDateString()}
</div>

<div class="grid">

<div class="stat">
<div class="sv" style="color:#4F8EF7;">
${tasks.length}
</div>
<div class="sl">TOTAL</div>
</div>

<div class="stat">
<div class="sv" style="color:#34D399;">
${tasks.filter(t=>t.status==="done").length}
</div>
<div class="sl">DONE</div>
</div>

<div class="stat">
<div class="sv" style="color:#FBBF24;">
${worklog.length}
</div>
<div class="sl">LOGS</div>
</div>

<div class="stat">
<div class="sv" style="color:#F87171;">
${tasks.filter(t=>t.status!=="done").length}
</div>
<div class="sl">OPEN</div>
</div>

</div>
`;

return;
}

if(tab==="work" || tab==="projects"){

const list=tasks.filter(t=>t.category===tab);

app.innerHTML=`
<h2 style="font-size:24px;margin-bottom:18px;">
${tab==="work"?"Work":"Projects"}
</h2>

${list.map(t=>`
<div class="card">

<div style="font-size:15px;font-weight:700;">
${t.title}
</div>

<div class="small" style="margin-top:6px;">
${t.notes}
</div>

<div>
<span class="badge">${t.priority}</span>
<span class="badge">${t.status}</span>
</div>

</div>
`).join("")}
`;

return;
}

if(tab==="log"){

app.innerHTML=`
<h2 style="font-size:24px;margin-bottom:18px;">
Worklog
</h2>

${worklog.map(l=>`
<div class="card">

<div style="font-size:14px;">
${l.text}
</div>

<div class="small" style="margin-top:8px;">
${l.date}
</div>

</div>
`).join("")}
`;

}

}

document.querySelectorAll(".ntab").forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".ntab").forEach(x=>{
x.classList.remove("on");
});

btn.classList.add("on");

tab=btn.dataset.tab;

render();

});

});

document.getElementById("fab").addEventListener("click",()=>{

alert("FAB WORKING");

});

document.getElementById("syncBtn").addEventListener("click",()=>{

setStatus("Synced","#34D399");

alert("SYNC WORKING");

});

document.getElementById("tokenBtn").addEventListener("click",()=>{

alert("TOKEN BUTTON WORKING");

});

render();

setStatus("Ready","#34D399");
