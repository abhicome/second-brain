// ── DATA ──────────────────────────────────────────────────────────────────────
var CATS = [
{id:‘work’,      label:‘Work’,      icon:‘W’,  color:’#4F8EF7’},
{id:‘projects’,  label:‘Projects’,  icon:‘P’,  color:’#A78BFA’},
{id:‘personal’,  label:‘Personal’,  icon:‘Me’, color:’#34D399’},
{id:‘knowledge’, label:‘Knowledge’, icon:‘K’,  color:’#FBBF24’},
{id:‘bills’,     label:‘Bills’,     icon:’$’,  color:’#F87171’},
{id:‘watchlist’, label:‘Watchlist’, icon:‘TV’, color:’#38BDF8’},
{id:‘health’,    label:‘Health’,    icon:‘H’,  color:’#FB923C’}
];

var PRI = [
{id:‘urgent’, label:‘Urgent’,    color:’#F87171’},
{id:‘high’,   label:‘High’,      color:’#FBBF24’},
{id:‘normal’, label:‘Normal’,    color:’#94A3B8’},
{id:‘low’,    label:‘Low’,       color:’#475569’}
];

var STAT = [
{id:‘todo’,       label:‘To Do’,       color:’#94A3B8’},
{id:‘inprogress’, label:‘In Progress’, color:’#FBBF24’},
{id:‘done’,       label:‘Done’,        color:’#34D399’},
{id:‘blocked’,    label:‘Blocked’,     color:’#F87171’},
{id:‘someday’,    label:‘Someday’,     color:’#A78BFA’}
];

var TC = {bau:’#94A3B8’, project:’#A78BFA’, investigation:’#F87171’, agentic:’#34D399’};
var TL = {bau:‘BAU’, project:‘Project’, investigation:‘Investigation’, agentic:‘Agentic’};

var DRIVE_IDS = {
tasks:      ‘1OWIXMe5PvrXOZXDVFDxVfylXQ8Kml_IE’,
worklog:    ‘1w6jQLE48kmnSQ3kXn5TDiafhfYe2y4tQ’,
categories: ‘14zFd-GoGYRGdbjr76ySlRNb-pqZrNSyK’
};

var DMCP  = ‘https://drivemcp.googleapis.com/mcp/v1’;
var MODEL = ‘claude-sonnet-4-20250514’;

var ITASKS = [
{id:‘1’,  title:‘DHCP Scope Failover UAT’,               category:‘work’,     priority:‘urgent’, status:‘inprogress’, dueDate:‘2026-05-09’, notes:‘Network team using solution to assign IP on switch interface. Next: Discuss feasibility with Vikas Maurya’,        tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘2’,  title:‘Fix Packet Fence Auto Enrolment Issue’,  category:‘work’,     priority:‘high’,   status:‘inprogress’, dueDate:‘2026-05-06’, notes:’’,                                                                                                               tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘3’,  title:‘Discuss feasibility with Vikas Maurya’,  category:‘work’,     priority:‘high’,   status:‘todo’,       dueDate:‘2026-05-06’, notes:‘Sub-task of DHCP Scope Failover UAT’,                                                                            tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘4’,  title:‘PacketFence Patching’,                   category:‘work’,     priority:‘high’,   status:‘inprogress’, dueDate:‘2026-05-25’, notes:‘Patching planned for PFE01; rescheduled for 3rd May’,                                                             tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘5’,  title:‘SailPoint Pre Migration Activities’,     category:‘projects’, priority:‘urgent’, status:‘inprogress’, dueDate:‘2026-05-08’, notes:‘DC resource updates, backups, replication changes pending’,                                                       tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘6’,  title:‘SailPoint Post Migration Activities’,    category:‘projects’, priority:‘urgent’, status:‘inprogress’, dueDate:‘2026-05-11’, notes:‘Next: Power on DCs, Verify AD replication, Validate group membership’,                                            tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘7’,  title:‘AD Transformation (AD-Less Roadmap)’,    category:‘projects’, priority:‘high’,   status:‘inprogress’, dueDate:‘2026-05-08’, notes:‘Discussion initiated with Microsoft. Await response.’,                                                             tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘8’,  title:‘DHCP 50/50 Failover Dashboard’,         category:‘projects’, priority:‘normal’, status:‘inprogress’, dueDate:‘2026-05-11’, notes:‘PEG team working on dashboard.’,                                                                                   tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘9’,  title:‘DNS Block for corp.ad (Zscaler)’,        category:‘projects’, priority:‘high’,   status:‘inprogress’, dueDate:‘2026-05-22’, notes:‘Solution discussion completed with Zscaler vendor.’,                                                               tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘10’, title:‘Arista AGNI Implementation’,             category:‘projects’, priority:‘high’,   status:‘inprogress’, dueDate:‘2026-09-30’, notes:‘Port validation done; Infosec approval pending.’,                                                                  tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘11’, title:‘DHCP Scope Creation Automation’,         category:‘projects’, priority:‘normal’, status:‘inprogress’, dueDate:‘2026-06-30’, notes:‘BRD update in progress.’,                                                                                          tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘12’, title:‘DNS Catalogue Modification’,             category:‘projects’, priority:‘normal’, status:‘inprogress’, dueDate:‘2026-06-30’, notes:‘DNS database updated with most domain owners.’,                                                                    tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’},
{id:‘13’, title:‘SailPoint Migration Scripts’,            category:‘projects’, priority:‘normal’, status:‘done’,       dueDate:‘2026-05-03’, notes:‘All scripts prepared and shared.’,                                                                                 tags:[], updatedAt:‘2026-05-05T18:00:00Z’, createdAt:‘2026-05-05T18:00:00Z’}
];

var IWL = [
{id:‘w1’,  date:‘2026-05-05’, text:‘AD transformation discussion with MS’,                        category:‘projects’, type:‘project’},
{id:‘w2’,  date:‘2026-05-01’, text:‘DHCP incident RCA’,                                           category:‘projects’, type:‘investigation’},
{id:‘w3’,  date:‘2026-05-01’, text:‘Arista Agni port allow discussion with Rajesh’,               category:‘projects’, type:‘project’},
{id:‘w4’,  date:‘2026-05-01’, text:‘DNS database update’,                                         category:‘work’,     type:‘bau’},
{id:‘w5’,  date:‘2026-04-30’, text:‘Prepared all scripts for SailPoint migration’,                category:‘projects’, type:‘project’},
{id:‘w6’,  date:‘2026-04-30’, text:‘DHCP scope mismatch script’,                                 category:‘projects’, type:‘bau’},
{id:‘w7’,  date:‘2026-04-30’, text:‘KB article for DHCP INC’,                                    category:‘projects’, type:‘bau’},
{id:‘w8’,  date:‘2026-04-29’, text:‘AD replication script’,                                      category:‘work’,     type:‘bau’},
{id:‘w9’,  date:‘2026-04-28’, text:‘Password expiry report for SP migration’,                    category:‘work’,     type:‘project’},
{id:‘w10’, date:‘2026-04-28’, text:‘DHCP 50/50 failover dashboard use cases’,                    category:‘projects’, type:‘project’},
{id:‘w11’, date:‘2026-04-28’, text:‘Discussed agentic use cases with HA’,                        category:‘work’,     type:‘agentic’},
{id:‘w12’, date:‘2026-04-26’, text:‘Updated agentic AI use case with manual and proposed steps’, category:‘work’,     type:‘agentic’},
{id:‘w13’, date:‘2026-04-26’, text:‘DNS catalog discussion with Subir’,                          category:‘work’,     type:‘bau’},
{id:‘w14’, date:‘2026-04-25’, text:‘Training on AI builder’,                                     category:‘work’,     type:‘bau’},
{id:‘w15’, date:‘2026-04-24’, text:‘Arista AGNI explaining to PM’,                               category:‘projects’, type:‘project’},
{id:‘w16’, date:‘2026-04-22’, text:‘DNS leakage solutioning with Zscaler vendor’,                category:‘projects’, type:‘bau’},
{id:‘w17’, date:‘2026-04-16’, text:‘Cloud AD architecture review’,                               category:‘work’,     type:‘bau’},
{id:‘w18’, date:‘2026-04-15’, text:‘DNS database creation’,                                      category:‘work’,     type:‘bau’},
{id:‘w19’, date:‘2026-04-14’, text:‘Troubleshooting cloud.ad account issue’,                     category:‘work’,     type:‘investigation’},
{id:‘w20’, date:‘2026-04-13’, text:‘SSL 3.0 disable vulnerability’,                              category:‘work’,     type:‘investigation’},
{id:‘w21’, date:‘2026-04-09’, text:‘DHCP 50/50 failover use case discussion’,                    category:‘projects’, type:‘project’},
{id:‘w22’, date:‘2026-04-07’, text:‘DHCP scope creation BRD’,                                    category:‘projects’, type:‘bau’},
{id:‘w23’, date:‘2026-04-06’, text:‘AD less road map transformation’,                            category:‘work’,     type:‘project’}
];

// ── STATE ─────────────────────────────────────────────────────────────────────
var S = {
tasks:      null,
worklog:    null,
cats:       null,
apiKey:     ‘’,
tab:        ‘home’,
showLog:    false,
fStatus:    ‘all’,
expId:      null,
report:     ‘’,
repLoading: false,
copied:     false
};

var saveTimers = {};

// ── UTILS ─────────────────────────────────────────────────────────────────────
function uid()    { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function nowISO() { return new Date().toISOString(); }
function todayStr(){ return new Date().toISOString().slice(0,10); }

function esc(s) {
return (s || ‘’)
.replace(/&/g, ‘&’)
.replace(/</g, ‘<’)
.replace(/>/g, ‘>’)
.replace(/”/g, ‘"’);
}

function setSyncDot(color, msg) {
document.getElementById(‘sdot’).style.background = color;
document.getElementById(‘stxt’).textContent = msg;
}

function weekRange() {
var d = new Date(), day = d.getDay();
var mon = new Date(d);
mon.setDate(d.getDate() - ((day + 6) % 7));
var sun = new Date(mon);
sun.setDate(mon.getDate() + 6);
function fmt(x) {
return x.toLocaleDateString(‘en-GB’, {day:‘2-digit’, month:‘short’, year:‘numeric’});
}
return {
start: mon.toISOString().slice(0,10),
end:   sun.toISOString().slice(0,10),
label: fmt(mon) + ’ - ’ + fmt(sun)
};
}

function fdate(iso) {
if (!iso) return ‘’;
var today = new Date(); today.setHours(0,0,0,0);
var dt    = new Date(iso); dt.setHours(0,0,0,0);
var diff  = Math.round((dt - today) / 86400000);
if (diff === 0)  return ‘Today’;
if (diff === 1)  return ‘Tomorrow’;
if (diff === -1) return ‘Yesterday’;
if (diff < 0)   return Math.abs(diff) + ‘d ago’;
if (diff < 8)   return new Date(iso).toLocaleDateString(‘en-US’, {weekday:‘short’});
return new Date(iso).toLocaleDateString(‘en-US’, {month:‘short’, day:‘numeric’});
}

function isOv(t) {
return t.dueDate && t.status !== ‘done’ && new Date(t.dueDate) < new Date(new Date().toDateString());
}

function getC(id) { return S.cats.find(function(c){ return c.id === id; }) || S.cats[0]; }
function getP(id) { return PRI.find(function(p){ return p.id === id; }) || PRI[2]; }
function getS(id) { return STAT.find(function(s){ return s.id === id; }) || STAT[0]; }

// ── LOCAL STORAGE ─────────────────────────────────────────────────────────────
function lsave() {
try {
localStorage.setItem(‘sb_t’, JSON.stringify(S.tasks));
localStorage.setItem(‘sb_w’, JSON.stringify(S.worklog));
localStorage.setItem(‘sb_c’, JSON.stringify(S.cats));
} catch(e) {}
}

function lload() {
try {
var t = localStorage.getItem(‘sb_t’);
var w = localStorage.getItem(‘sb_w’);
var c = localStorage.getItem(‘sb_c’);
var k = localStorage.getItem(‘sb_k’);
if (t) S.tasks   = JSON.parse(t);
if (w) S.worklog = JSON.parse(w);
if (c) S.cats    = JSON.parse(c);
if (k) S.apiKey  = k;
} catch(e) {}
if (!S.tasks   || !S.tasks.length)   S.tasks   = ITASKS;
if (!S.worklog || !S.worklog.length) S.worklog = IWL;
if (!S.cats    || !S.cats.length)    S.cats    = JSON.parse(JSON.stringify(CATS));
}

// ── API KEY ───────────────────────────────────────────────────────────────────
function toggleApi() {
var p = document.getElementById(‘apanel’);
if (p.classList.contains(‘on’)) {
p.classList.remove(‘on’);
} else {
p.classList.add(‘on’);
document.getElementById(‘akey’).value = S.apiKey;
}
}

function saveKey() {
var k = document.getElementById(‘akey’).value.trim();
S.apiKey = k;
try { localStorage.setItem(‘sb_k’, k); } catch(e) {}
toggleApi();
if (k) syncDrive();
}

// ── DRIVE API ─────────────────────────────────────────────────────────────────
async function callAI(sys, usr, mx, useMCP) {
var body = {
model:      MODEL,
max_tokens: mx || 1000,
system:     sys,
messages:   [{role:‘user’, content:usr}]
};
if (useMCP) {
body.mcp_servers = [{type:‘url’, url:DMCP, name:‘gdrive’}];
}
var r = await fetch(‘https://api.anthropic.com/v1/messages’, {
method:  ‘POST’,
headers: {
‘Content-Type’:    ‘application/json’,
‘x-api-key’:       S.apiKey,
‘anthropic-version’: ‘2023-06-01’,
‘anthropic-beta’:  ‘mcp-client-2025-04-04’
},
body: JSON.stringify(body)
});
return r.json();
}

async function driveRead(fid) {
if (!S.apiKey) return null;
try {
var d = await callAI(
‘You have Google Drive access. Read file ID “’ + fid + ‘”. Return ONLY raw JSON, no markdown.’,
‘Read file, return JSON only.’,
4000, true
);
var blocks = d.content || [];
for (var i = 0; i < blocks.length; i++) {
if (blocks[i].type === ‘mcp_tool_result’) {
var t = (blocks[i].content && blocks[i].content[0] && blocks[i].content[0].text) || ‘’;
try { return JSON.parse(t); } catch(e) {}
}
}
for (var j = 0; j < blocks.length; j++) {
if (blocks[j].type === ‘text’) {
var m = blocks[j].text.match(/{[\s\S]*}/);
if (m) { try { return JSON.parse(m[0]); } catch(e) {} }
}
}
} catch(e) {}
return null;
}

async function driveWrite(fid, obj) {
if (!S.apiKey) return;
try {
obj.lastUpdated = nowISO();
await callAI(
‘You have Google Drive access. Overwrite file ID “’ + fid + ‘” with exact JSON provided. Reply: saved’,
‘Save:\n’ + JSON.stringify(obj, null, 2),
200, true
);
} catch(e) {}
}

function debSave(key, fid, data) {
clearTimeout(saveTimers[key]);
saveTimers[key] = setTimeout(async function() {
setSyncDot(’#FBBF24’, ‘Saving…’);
await driveWrite(fid, data);
setSyncDot(’#34D399’, ‘Saved’);
}, 1200);
}

function saveTasks()  { lsave(); debSave(‘t’, DRIVE_IDS.tasks,   {version:1, items:   S.tasks});   }
function saveWL()     { lsave(); debSave(‘w’, DRIVE_IDS.worklog, {version:1, entries: S.worklog}); }

async function syncDrive() {
setSyncDot(’#FBBF24’, ‘Syncing…’);
try {
var res = await Promise.all([
driveRead(DRIVE_IDS.tasks),
driveRead(DRIVE_IDS.worklog),
driveRead(DRIVE_IDS.categories)
]);
if (res[0] && res[0].items   && res[0].items.length)      S.tasks   = res[0].items;
if (res[1] && res[1].entries && res[1].entries.length)    S.worklog = res[1].entries;
if (res[2] && res[2].categories && res[2].categories.length) S.cats = res[2].categories;
lsave();
setSyncDot(’#34D399’, ‘Synced with Drive’);
} catch(e) {
setSyncDot(’#F87171’, ‘Sync failed’);
}
render();
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function setTab(t)   { S.tab = t; S.showLog = false; S.fStatus = ‘all’; render(); }
function toggleLog() { S.showLog = !S.showLog; render(); }
function onFab()     { if (S.showLog || S.tab === ‘home’) showLogModal(); else showTaskModal(null, S.tab); }

// ── TASK CRUD ─────────────────────────────────────────────────────────────────
function cycleStatus(id) {
var ord = [‘todo’,‘inprogress’,‘done’,‘blocked’,‘someday’];
S.tasks = S.tasks.map(function(t) {
if (t.id !== id) return t;
var next = ord[(ord.indexOf(t.status) + 1) % ord.length];
return Object.assign({}, t, {status:next, updatedAt:nowISO()});
});
saveTasks(); render();
}

function delTask(id) {
if (!confirm(‘Delete this task?’)) return;
S.tasks = S.tasks.filter(function(t){ return t.id !== id; });
saveTasks(); render();
}

function togExp(id) { S.expId = (S.expId === id) ? null : id; render(); }
function editTask(id) { showTaskModal(S.tasks.find(function(t){ return t.id === id; })); }

function delLog(id) {
S.worklog = S.worklog.filter(function(e){ return e.id !== id; });
saveWL(); render();
}

// ── WEEKLY REPORT ─────────────────────────────────────────────────────────────
async function buildReport() {
if (!S.apiKey) { alert(‘Add your API key first (Key button)’); return; }
S.repLoading = true; S.report = ‘’; render();
var wk   = weekRange();
var logs = S.worklog.filter(function(e){ return e.date >= wk.start && e.date <= wk.end; });
var wt   = S.tasks.filter(function(t){ return t.category === ‘work’ || t.category === ‘projects’; });
var prompt = [
‘Generate weekly work update email in this EXACT format:’,
‘’,
‘Hi Sir,’,
‘’,
‘Please find below my weekly work update:’,
‘’,
‘—’,
‘’,
‘Agentic Solutions / Ideas’,
‘’,
‘| Issue | Summary | Next Steps |’,
‘|——|———|————|’,
‘[agentic rows]’,
‘’,
‘—’,
‘’,
‘Projects’,
‘’,
‘| Project | Status | Summary | Next Steps |’,
‘|––––|––––|———|————|’,
‘[project rows]’,
‘’,
‘—’,
‘’,
‘Troubleshooting / Investigation’,
‘’,
‘| Issue | Summary | Next Steps |’,
‘|——|———|————|’,
‘[investigation rows]’,
‘’,
‘—’,
‘’,
‘Please let me know if you would like additional details.’,
‘’,
‘Thanks,’,
‘Abhi Kapoor’,
‘’,
‘WEEK: ’ + wk.label,
‘’,
‘WORKLOG:’,
logs.map(function(e){ return ‘[’ + e.date + ‘][’ + e.type + ‘] ’ + e.text; }).join(’\n’) || ‘(none)’,
‘’,
‘TASKS:’,
wt.map(function(t){ return ‘[’ + t.category + ‘][’ + t.status + ‘] ’ + t.title + (t.notes ? ’ - ’ + t.notes : ‘’); }).join(’\n’) || ‘(none)’
].join(’\n’);

try {
var d = await callAI(
‘You are a professional email writer. Follow the format exactly. Return ONLY the email text.’,
prompt, 2000, false
);
S.report = (d.content || [])
.filter(function(b){ return b.type === ‘text’; })
.map(function(b){ return b.text; })
.join(’’) || ‘Error generating report.’;
} catch(e) {
S.report = ’Error: ’ + e.message;
}
S.repLoading = false; render();
}

function copyRep() {
navigator.clipboard.writeText(S.report).then(function() {
S.copied = true; render();
setTimeout(function(){ S.copied = false; render(); }, 2000);
});
}

function dlRep() {
var a = document.createElement(‘a’);
a.href     = ‘data:text/plain;charset=utf-8,’ + encodeURIComponent(S.report);
a.download = ‘Report-’ + todayStr() + ‘.txt’;
a.click();
}

// ── TASK MODAL ────────────────────────────────────────────────────────────────
var tmd = null;

function showTaskModal(task, dc) {
tmd = task
? JSON.parse(JSON.stringify(task))
: {id:uid(), createdAt:nowISO(), updatedAt:nowISO(), title:’’, notes:’’, category:dc||‘personal’, priority:‘normal’, status:‘todo’, dueDate:’’, tags:[]};
renderTM();
}

function renderTM() {
var t   = tmd;
var isE = S.tasks.some(function(x){ return x.id === t.id; });

var ccsHtml = S.cats.map(function(c) {
var sel = t.category === c.id;
var style = sel ? (‘background:’ + c.color + ‘22;border-color:’ + c.color + ‘;color:’ + c.color) : ‘’;
return ‘<button class="cc" data-catid="' + c.id + '" style="' + style + '">’ + esc(c.label) + ‘</button>’;
}).join(’’);

var tagsHtml = (t.tags || []).map(function(tg) {
return ‘<span class="tb2">’ + esc(tg) + ‘<button class="tx" data-rmtag="' + esc(tg) + '">x</button></span>’;
}).join(’’);

var priOpts = PRI.map(function(p) {
return ‘<option value=”’ + p.id + ‘”’ + (t.priority === p.id ? ’ selected’ : ‘’) + ‘>’ + p.label + ‘</option>’;
}).join(’’);

var statOpts = STAT.map(function(s) {
return ‘<option value=”’ + s.id + ‘”’ + (t.status === s.id ? ’ selected’ : ‘’) + ‘>’ + s.label + ‘</option>’;
}).join(’’);

var html = ‘<div class="ovl" id="tmovl">’
+ ‘<div class="mdl">’
+ ‘<div class="mhdl"></div>’
+ ‘<div class="mhd"><span class="mttl">’ + (isE ? ‘Edit Task’ : ‘New Task’) + ‘</span>’
+ ‘<button class="mclb" id="tmClose">X</button></div>’
+ ‘<div class="fld"><span class="flbl">Category</span><div class="ccs" id="tmCats">’ + ccsHtml + ‘</div></div>’
+ ‘<div class="fld"><span class="flbl">Title</span><input class="inp" id="ft" value="' + esc(t.title) + '" placeholder="What needs to be done?"/></div>’
+ ‘<div class="fld"><span class="flbl">Notes</span><textarea class="inpta" id="fn" placeholder="Details...">’ + esc(t.notes || ‘’) + ‘</textarea></div>’
+ ‘<div class="r2"><div><span class="flbl">Priority</span><select class="sel" id="fp">’ + priOpts + ‘</select></div>’
+ ‘<div><span class="flbl">Status</span><select class="sel" id="fs">’ + statOpts + ‘</select></div></div>’
+ ‘<div class="fld"><span class="flbl">Due Date</span><input type="date" class="inp" id="fd" value="' + (t.dueDate || '') + '"/></div>’
+ ‘<div class="fld"><span class="flbl">Tags</span>’
+ ‘<div class="tagrow"><input class="inp" id="ftag" placeholder="Add tag..." style="flex:1"/>’
+ ‘<button class="tadd" id="tmAddTag">Add</button></div>’
+ ‘<div class="tw" id="tmTags">’ + tagsHtml + ‘</div></div>’
+ ‘<button class="svbtn" id="tmSave">’ + (isE ? ‘Update Task’ : ‘Add Task’) + ‘</button>’
+ ‘</div></div>’;

showM(html);

// Wire events using addEventListener — no inline handlers
document.getElementById(‘tmClose’).addEventListener(‘click’, closeM);
document.getElementById(‘tmovl’).addEventListener(‘click’, function(e) {
if (e.target === document.getElementById(‘tmovl’)) closeM();
});
document.getElementById(‘tmAddTag’).addEventListener(‘click’, function() {
var v = document.getElementById(‘ftag’).value.trim();
if (v && !(tmd.tags || []).includes(v)) { tmd.tags = (tmd.tags || []).concat([v]); }
renderTM();
});
document.getElementById(‘tmSave’).addEventListener(‘click’, function() { subTask(isE); });

// Category chips
document.getElementById(‘tmCats’).addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-catid]’);
if (btn) { tmd.category = btn.dataset.catid; renderTM(); }
});

// Tag remove
document.getElementById(‘tmTags’).addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-rmtag]’);
if (btn) {
var tg = btn.dataset.rmtag;
tmd.tags = (tmd.tags || []).filter(function(x){ return x !== tg; });
renderTM();
}
});
}

function subTask(isE) {
var title = document.getElementById(‘ft’).value.trim();
if (!title) { alert(‘Title is required’); return; }
tmd.title    = title;
tmd.notes    = document.getElementById(‘fn’).value;
tmd.priority = document.getElementById(‘fp’).value;
tmd.status   = document.getElementById(‘fs’).value;
tmd.dueDate  = document.getElementById(‘fd’).value;
tmd.updatedAt = nowISO();
if (isE) {
S.tasks = S.tasks.map(function(x){ return x.id === tmd.id ? tmd : x; });
} else {
S.tasks = [tmd].concat(S.tasks);
}
saveTasks(); closeM(); render();
}

// ── LOG MODAL ─────────────────────────────────────────────────────────────────
var lmd = null;

function showLogModal() {
lmd = {id:uid(), date:todayStr(), text:’’, category:‘work’, type:‘bau’, taskId:’’};
renderLM();
}

function renderLM() {
var f = lmd;
var catOpts = S.cats.map(function(c) {
return ‘<option value=”’ + c.id + ‘”’ + (f.category === c.id ? ’ selected’ : ‘’) + ‘>’ + esc(c.label) + ‘</option>’;
}).join(’’);
var typeOpts = [[‘bau’,‘BAU’],[‘project’,‘Project’],[‘investigation’,‘Investigation’],[‘agentic’,‘Agentic’]].map(function(x) {
return ‘<option value=”’ + x[0] + ‘”’ + (f.type === x[0] ? ’ selected’ : ‘’) + ‘>’ + x[1] + ‘</option>’;
}).join(’’);
var wt = S.tasks.filter(function(t){ return t.category === ‘work’ || t.category === ‘projects’; });
var taskOpts = ‘<option value="">– None –</option>’ + wt.map(function(t) {
return ‘<option value="' + t.id + '">’ + esc(t.title.slice(0,45)) + ‘</option>’;
}).join(’’);

var html = ‘<div class="ovl" id="lmovl">’
+ ‘<div class="mdl">’
+ ‘<div class="mhdl"></div>’
+ ‘<div class="mhd"><span class="mttl">Log Work Entry</span>’
+ ‘<button class="mclb" id="lmClose">X</button></div>’
+ ‘<div class="fld"><span class="flbl">Date</span><input type="date" class="inp" id="ld" value="' + f.date + '"/></div>’
+ ‘<div class="fld"><span class="flbl">What did you work on?</span>’
+ ‘<textarea class="inpta" id="lt" style="height:90px" placeholder="e.g. Worked on DHCP failover UAT...">’ + esc(f.text) + ‘</textarea></div>’
+ ‘<div class="r2"><div><span class="flbl">Category</span><select class="sel" id="lc">’ + catOpts + ‘</select></div>’
+ ‘<div><span class="flbl">Type</span><select class="sel" id="ltp">’ + typeOpts + ‘</select></div></div>’
+ ‘<div class="fld"><span class="flbl">Link to Task (optional)</span><select class="sel" id="ltk">’ + taskOpts + ‘</select></div>’
+ ‘<button class="svbtn" id="lmSave">Save Entry</button>’
+ ‘</div></div>’;

showM(html);

document.getElementById(‘lmClose’).addEventListener(‘click’, closeM);
document.getElementById(‘lmovl’).addEventListener(‘click’, function(e) {
if (e.target === document.getElementById(‘lmovl’)) closeM();
});
document.getElementById(‘lmSave’).addEventListener(‘click’, subLog);
}

function subLog() {
var text = document.getElementById(‘lt’).value.trim();
if (!text) { alert(‘Please describe what you worked on’); return; }
lmd.date    = document.getElementById(‘ld’).value;
lmd.text    = text;
lmd.category = document.getElementById(‘lc’).value;
lmd.type    = document.getElementById(‘ltp’).value;
lmd.taskId  = document.getElementById(‘ltk’).value;
lmd.createdAt = nowISO();
S.worklog = [lmd].concat(S.worklog);
saveWL(); closeM(); render();
}

// ── CATEGORY MODAL ────────────────────────────────────────────────────────────
var ncd  = {label:’’, icon:‘Pin’, color:’#8B5CF6’};
var ICONS = [‘Pin’,‘Goal’,‘Idea’,‘Shop’,‘Book’,‘Music’,‘Gym’,‘Travel’,‘Food’,‘Game’,‘Photo’,‘World’,‘Team’,‘Bank’,‘Art’];

function showCats() {
ncd = {label:’’, icon:‘Pin’, color:’#8B5CF6’};
renderCM();
}

function renderCM() {
var rows = S.cats.map(function(c) {
var cnt = S.tasks.filter(function(t){ return t.category === c.id; }).length;
var bg  = S.tab === c.id ? ‘background:’ + c.color + ‘18’ : ‘’;
return ‘<button class="crb" data-goto="' + c.id + '" style="' + bg + '">’
+ ‘<span style="font-size:18px">’ + esc(c.icon) + ‘</span>’
+ ‘<span style="flex:1;color:#E2E8F0;font-size:14px;font-weight:500">’ + esc(c.label) + ‘</span>’
+ ‘<span style="color:#4B5563;font-size:12px">’ + cnt + ‘</span>’
+ ‘</button>’;
}).join(’’);

var igrid = ICONS.map(function(ic) {
return ‘<button class="ibtn' + (ncd.icon === ic ? ' picked' : '') + '" data-icon="' + ic + '">’ + ic + ‘</button>’;
}).join(’’);

var html = ‘<div class="ovl" id="cmovl">’
+ ‘<div class="mdl">’
+ ‘<div class="mhdl"></div>’
+ ‘<div class="mhd"><span class="mttl">All Categories</span>’
+ ‘<button class="mclb" id="cmClose">X</button></div>’
+ ‘<div class="crow" id="cmRows">’ + rows + ‘</div>’
+ ‘<div class="acb">’
+ ‘<span class="flbl">New Category</span>’
+ ‘<div class="igrid" id="cmIcons">’ + igrid + ‘</div>’
+ ‘<input class="inp" id="ncl" value="' + esc(ncd.label) + '" placeholder="Category name" style="margin-bottom:8px"/>’
+ ‘<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">’
+ ‘<span class="flbl" style="margin:0">Color</span>’
+ ‘<input type="color" id="nccolor" value="' + ncd.color + '" style="width:36px;height:30px;border:none;border-radius:6px;cursor:pointer"/>’
+ ‘</div>’
+ ‘<button class="svbtn" id="cmSave">Create Category</button>’
+ ‘</div></div></div>’;

showM(html);

document.getElementById(‘cmClose’).addEventListener(‘click’, closeM);
document.getElementById(‘cmovl’).addEventListener(‘click’, function(e) {
if (e.target === document.getElementById(‘cmovl’)) closeM();
});
document.getElementById(‘cmRows’).addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-goto]’);
if (btn) { setTab(btn.dataset.goto); closeM(); }
});
document.getElementById(‘cmIcons’).addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-icon]’);
if (btn) { ncd.icon = btn.dataset.icon; renderCM(); }
});
document.getElementById(‘nccolor’).addEventListener(‘input’, function(e) {
ncd.color = e.target.value;
});
document.getElementById(‘ncl’).addEventListener(‘input’, function(e) {
ncd.label = e.target.value;
});
document.getElementById(‘cmSave’).addEventListener(‘click’, subCat);
}

function subCat() {
var l = document.getElementById(‘ncl’).value.trim();
if (!l) { alert(‘Name required’); return; }
var nc = {
id:    l.toLowerCase().replace(/\s+/g, ‘-’) + ‘-’ + Date.now().toString(36),
label: l,
icon:  ncd.icon,
color: ncd.color
};
S.cats = S.cats.concat([nc]);
lsave();
if (S.apiKey) driveWrite(DRIVE_IDS.categories, {version:1, categories:S.cats});
closeM(); render();
}

// ── MODAL HELPERS ─────────────────────────────────────────────────────────────
function showM(html)  { document.getElementById(‘mc’).innerHTML = html; }
function closeM()     { document.getElementById(‘mc’).innerHTML = ‘’; }

// ── NAV UPDATE ────────────────────────────────────────────────────────────────
function updNav() {
var tabs = [‘home’,‘work’,‘projects’,‘log’,‘report’];
tabs.forEach(function(t, i) {
var el = document.getElementById(‘nt’ + i);
if (!el) return;
var active = (t === ‘log’ && S.showLog) || (t !== ‘log’ && S.tab === t && !S.showLog);
el.className = ‘ntab’ + (active ? ’ on’ : ‘’);
});

function setBdg(id, cnt) {
var el = document.getElementById(id);
if (!el) return;
el.textContent = cnt > 9 ? ‘9+’ : String(cnt);
el.style.display = cnt > 0 ? ‘flex’ : ‘none’;
}
setBdg(‘nb1’, S.tasks.filter(function(t){ return t.category === ‘work’     && t.status !== ‘done’; }).length);
setBdg(‘nb2’, S.tasks.filter(function(t){ return t.category === ‘projects’ && t.status !== ‘done’; }).length);
setBdg(‘nb3’, S.worklog.filter(function(e){ return e.date === todayStr(); }).length);
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function render() {
updNav();
var b = document.getElementById(‘body’);
if (!b) return;
try {
if (S.showLog)          { b.innerHTML = renderLog();  return; }
if (S.tab === ‘home’)   { b.innerHTML = renderHome(); return; }
if (S.tab === ‘report’) { b.innerHTML = renderRep();  return; }
b.innerHTML = renderList();
} catch(e) {
b.innerHTML = ’<div style="padding:20px;color:#F87171;font-size:13px">Error: ’ + esc(e.message) + ‘</div>’;
}
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function renderHome() {
var tasks  = S.tasks;
var done   = tasks.filter(function(t){ return t.status === ‘done’; }).length;
var ovList = tasks.filter(isOv);
var inp    = tasks.filter(function(t){ return t.status === ‘inprogress’; }).length;
var pct    = tasks.length ? Math.round(done / tasks.length * 100) : 0;
var wk     = weekRange();
var urg    = tasks.filter(function(t){ return (t.priority===‘urgent’||t.priority===‘high’) && t.status!==‘done’; }).slice(0,3);

var oal = ovList.length
? ‘<div class="al"><span style="color:#F87171;font-size:15px">!</span>’
+ ‘<span style="flex:1;color:#F87171;font-size:13px;font-weight:600">’ + ovList.length + ’ overdue task’ + (ovList.length > 1 ? ‘s’ : ‘’) + ‘</span>’
+ ‘<button class="ab" id="homeOvBtn">View</button></div>’
: ‘’;

var uc = urg.map(function(t) {
var c = getC(t.category), p = getP(t.priority), ov = isOv(t);
return ‘<div class="mc2" data-gotab="' + t.category + '">’
+ ‘<div class="ma" style="background:' + c.color + '"></div>’
+ ‘<span style="flex:1;font-size:13px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">’ + esc(t.title) + ‘</span>’
+ ‘<span class="bdg" style="background:' + p.color + '22;color:' + p.color + '">’ + p.label + ‘</span>’
+ (t.dueDate ? ‘<span style="font-size:10px;color:' + (ov ? '#F87171' : '#6B7280') + '">’ + fdate(t.dueDate) + ‘</span>’ : ‘’)
+ ‘</div>’;
}).join(’’);

var cg = S.cats.map(function(c) {
var cnt = tasks.filter(function(t){ return t.category === c.id && t.status !== ‘done’; }).length;
return ‘<button class="ct" data-gotab="' + c.id + '" style="border-color:' + c.color + '44">’
+ ‘<span style="font-size:20px">’ + esc(c.icon) + ‘</span>’
+ ‘<span style="font-size:11px;color:#6B7280;font-weight:500">’ + esc(c.label) + ‘</span>’
+ (cnt > 0 ? ‘<span class="cba" style="background:' + c.color + '">’ + cnt + ‘</span>’ : ‘’)
+ ‘</button>’;
}).join(’’);

var html = ‘<div class="pg">’
+ ‘<div class="hero">’
+ ‘<div class="hdate">’ + new Date().toLocaleDateString(‘en-US’,{weekday:‘long’,month:‘long’,day:‘numeric’}) + ‘</div>’
+ ‘<div class="htitle">Your Second Brain</div>’
+ ‘<div class="hsub">’ + (tasks.length - done) + ’ open - ’ + pct + ‘% complete</div>’
+ ‘<div class="bt"><div class="bf" style="width:' + pct + '%"></div></div>’
+ ‘</div>’
+ ‘<div class="sg">’
+ ‘<div class="sc"><div class="sv" style="color:#4F8EF7">’ + tasks.length + ‘</div><div class="sl">Total</div></div>’
+ ‘<div class="sc"><div class="sv" style="color:#34D399">’ + done + ‘</div><div class="sl">Done</div></div>’
+ ‘<div class="sc"><div class="sv" style="color:#FBBF24">’ + inp + ‘</div><div class="sl">Active</div></div>’
+ ‘<div class="sc"><div class="sv" style="color:#F87171">’ + ovList.length + ‘</div><div class="sl">Overdue</div></div>’
+ ‘</div>’
+ oal
+ (urg.length ? ‘<span class="stl">Urgent & High Priority</span>’ + uc : ‘’)
+ ‘<div class="wb">’
+ ‘<div><div class="wl">’ + wk.label + ‘</div><div class="ws">Tap to generate report</div></div>’
+ ‘<button class="wbtn" id="homeRepBtn">Generate</button>’
+ ‘</div>’
+ ‘<span class="stl">Categories</span>’
+ ‘<div class="cg" id="homeCatGrid">’ + cg + ‘</div>’
+ ‘</div>’;

// Set HTML first then wire events
setTimeout(function() {
var ovb = document.getElementById(‘homeOvBtn’);
if (ovb) ovb.addEventListener(‘click’, function(){ setTab(‘work’); });
var rb = document.getElementById(‘homeRepBtn’);
if (rb) rb.addEventListener(‘click’, function(){ setTab(‘report’); });
var cgg = document.getElementById(‘homeCatGrid’);
if (cgg) cgg.addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-gotab]’);
if (btn) setTab(btn.dataset.gotab);
});
var urg2 = document.querySelector(’.pg’);
if (urg2) urg2.addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-gotab]’);
if (btn && !e.target.closest(’#homeCatGrid’)) setTab(btn.dataset.gotab);
});
}, 0);

return html;
}

// ── LIST ──────────────────────────────────────────────────────────────────────
function renderList() {
var c    = getC(S.tab);
var list = S.tasks.filter(function(t){ return t.category === S.tab; });
if (S.fStatus !== ‘all’) list = list.filter(function(t){ return t.status === S.fStatus; });
list = list.sort(function(a, b) {
var p = [‘urgent’,‘high’,‘normal’,‘low’];
return p.indexOf(a.priority) - p.indexOf(b.priority) || new Date(b.updatedAt) - new Date(a.updatedAt);
});

var chips = [{id:‘all’,label:‘All’}].concat(STAT).map(function(s) {
var sc  = STAT.find(function(x){ return x.id === s.id; });
var on  = S.fStatus === s.id;
var sty = on && sc ? (‘background:’ + sc.color + ‘22;color:’ + sc.color + ‘;border-color:’ + sc.color) : ‘’;
return ‘<button class="chip" data-fstatus="' + s.id + '" style="' + sty + '">’ + s.label + ‘</button>’;
}).join(’’);

var cards = list.length
? list.map(renderTC).join(’’)
: ‘<div style="text-align:center;padding:40px 0;color:#374151">Nothing here - tap + to add</div>’;

var html = ‘<div class="pg">’
+ ‘<div class="lh">’
+ ‘<span style="font-size:20px">’ + esc(c.icon) + ‘</span>’
+ ‘<span class="lt">’ + esc(c.label) + ‘</span>’
+ ‘<span class="lc2">’ + list.filter(function(t){ return t.status !== ‘done’; }).length + ’ open</span>’
+ ‘</div>’
+ ‘<div class="chips" id="listChips">’ + chips + ‘</div>’
+ ‘<div id="listCards">’ + cards + ‘</div>’
+ ‘<div style="height:20px"></div>’
+ ‘</div>’;

setTimeout(function() {
var chipsEl = document.getElementById(‘listChips’);
if (chipsEl) chipsEl.addEventListener(‘click’, function(e) {
var btn = e.target.closest(’[data-fstatus]’);
if (btn) { S.fStatus = btn.dataset.fstatus; render(); }
});
var cardsEl = document.getElementById(‘listCards’);
if (cardsEl) {
cardsEl.addEventListener(‘click’, function(e) {
var cs = e.target.closest(’[data-cycle]’);
if (cs) { e.stopPropagation(); cycleStatus(cs.dataset.cycle); return; }
var ed = e.target.closest(’[data-edit]’);
if (ed) { e.stopPropagation(); editTask(ed.dataset.edit); return; }
var dl = e.target.closest(’[data-del]’);
if (dl) { e.stopPropagation(); delTask(dl.dataset.del); return; }
var tc = e.target.closest(’[data-expand]’);
if (tc) togExp(tc.dataset.expand);
});
}
}, 0);

return html;
}

function renderTC(t) {
var c   = getC(t.category), p = getP(t.priority), s = getS(t.status);
var ov  = isOv(t), exp = S.expId === t.id;
var ic  = {todo:‘O’, inprogress:’>’, done:‘OK’, blocked:‘X’, someday:’~’}[t.status] || ‘O’;
var tags = (t.tags || []).map(function(tg){
return ‘<span class="bdg" style="background:#0F1829;color:#4B5563">#’ + esc(tg) + ‘</span>’;
}).join(’’);

return ‘<div class="tc' + (ov ? ' ov' : '') + '" data-expand="' + t.id + '">’
+ ‘<div class="tac" style="background:' + c.color + '"></div>’
+ ‘<div class="tb">’
+ ‘<div class="tr2">’
+ ‘<button class="sbtn" data-cycle="' + t.id + '" style="background:' + s.color + '22;color:' + s.color + '">’ + ic + ‘</button>’
+ ‘<div style="flex:1;min-width:0">’
+ ‘<div class="tt' + (t.status === 'done' ? ' dn' : '') + '">’ + esc(t.title) + ‘</div>’
+ (exp && t.notes ? ‘<div class="tn">’ + esc(t.notes) + ‘</div>’ : ‘’)
+ ‘</div>’
+ (t.dueDate ? ‘<span class="td' + (ov ? ' ov' : '') + '">’ + fdate(t.dueDate) + ‘</span>’ : ‘’)
+ ‘</div>’
+ ‘<div class="mr">’
+ ‘<span class="bdg" style="background:' + p.color + '22;color:' + p.color + '">’ + p.label + ‘</span>’
+ ‘<span class="bdg" style="background:' + s.color + '22;color:' + s.color + '">’ + s.label + ‘</span>’
+ ‘<span class="bdg" style="background:' + c.color + '22;color:' + c.color + '">’ + esc(c.label) + ‘</span>’
+ tags
+ ‘</div>’
+ (exp ? ‘<div class="tact"><button class="eb" data-edit="' + t.id + '">Edit</button><button class="db" data-del="' + t.id + '">Delete</button></div>’ : ‘’)
+ ‘</div></div>’;
}

// ── WORKLOG ───────────────────────────────────────────────────────────────────
function renderLog() {
var grouped = {};
S.worklog.forEach(function(e) {
if (!grouped[e.date]) grouped[e.date] = [];
grouped[e.date].push(e);
});
var days = Object.keys(grouped).sort(function(a,b){ return b.localeCompare(a); });
var cnt  = {bau:0, project:0, investigation:0, agentic:0};
S.worklog.forEach(function(e){ if (cnt[e.type] !== undefined) cnt[e.type]++; });

var abar = ‘<div class="abar">’
+ [[‘project’,’#A78BFA’,‘Project’],[‘bau’,’#94A3B8’,‘BAU’],[‘investigation’,’#F87171’,‘Invest.’],[‘agentic’,’#34D399’,‘Agentic’]]
.map(function(x) {
return ‘<div class="ap" style="background:' + x[1] + '18">’
+ ‘<div style="font-size:18px;font-weight:700;color:' + x[1] + '">’ + cnt[x[0]] + ‘</div>’
+ ‘<div style="font-size:9px;color:' + x[1] + '">’ + x[2] + ‘</div>’
+ ‘</div>’;
}).join(’’)
+ ‘</div>’;

var dh = days.map(function(date) {
var es = grouped[date];
var eh = es.map(function(e) {
var c  = getC(e.category);
var tc = TC[e.type] || ‘#94A3B8’;
var tl = TL[e.type] || e.type;
return ‘<div class="lce">’
+ ‘<div class="la" style="background:' + c.color + '"></div>’
+ ‘<div style="flex:1;min-width:0">’
+ ‘<div class="ltx">’ + esc(e.text) + ‘</div>’
+ ‘<div style="display:flex;gap:5px;flex-wrap:wrap">’
+ ‘<span class="bdg" style="background:' + c.color + '22;color:' + c.color + '">’ + esc(c.label) + ‘</span>’
+ ‘<span class="bdg" style="background:' + tc + '22;color:' + tc + '">’ + tl + ‘</span>’
+ ‘</div></div>’
+ ‘<button class="ldel" data-dellog="' + e.id + '">x</button>’
+ ‘</div>’;
}).join(’’);
return ‘<div style="margin-bottom:16px">’
+ ‘<div class="dh"><span class="dlb">’ + fdate(date) + ‘</span><span class="ddt">’ + date + ‘</span><span class="dc">’ + es.length + ‘</span></div>’
+ eh
+ ‘</div>’;
}).join(’’);

var html = ‘<div class="pg">’
+ ‘<div class="lh"><span style="font-size:20px">Log</span><span class="lt">Worklog</span>’
+ ‘<span class="lc2">’ + S.worklog.length + ’ entries</span></div>’
+ abar
+ (days.length ? dh : ‘<div style="text-align:center;padding:40px 0;color:#374151">No entries - tap + to log</div>’)
+ ‘<div style="height:20px"></div></div>’;

setTimeout(function() {
var body = document.getElementById(‘body’);
if (body) body.addEventListener(‘click’, function handler(e) {
var btn = e.target.closest(’[data-dellog]’);
if (btn) { delLog(btn.dataset.dellog); body.removeEventListener(‘click’, handler); }
});
}, 0);

return html;
}

// ── REPORT ────────────────────────────────────────────────────────────────────
function renderRep() {
var wk = weekRange();
var rbody = S.report
? ‘<div class="racts">’
+ ‘<button class="rab" id="repCopy">’ + (S.copied ? ‘Copied!’ : ‘Copy Email’) + ‘</button>’
+ ‘<button class="rab" id="repDl">Download</button>’
+ ‘</div>’
+ ‘<div class="rbox"><pre class="rpre">’ + esc(S.report) + ‘</pre></div>’
: ‘<div style="text-align:center;padding:32px 0;color:#374151;font-size:13px">’
+ (S.apiKey ? ‘Tap Generate to build your weekly report’ : ‘Add API key first (Key button)’) + ‘</div>’;

var html = ‘<div class="pg">’
+ ‘<div class="lh"><span style="font-size:20px">Report</span><span class="lt">Weekly Report</span></div>’
+ ‘<div class="rh">’
+ ‘<div class="rw">’ + wk.label + ‘</div>’
+ ‘<div class="rs">AI reads your worklog and tasks to draft your email</div>’
+ ‘<button class=“gbtn” id=“repGenBtn”’ + (S.repLoading ? ’ disabled’ : ‘’) + ‘>’
+ (S.repLoading ? ‘Generating…’ : ‘Generate Weekly Report’) + ‘</button>’
+ ‘</div>’
+ rbody
+ ‘<div style="height:20px"></div></div>’;

setTimeout(function() {
var gb = document.getElementById(‘repGenBtn’);
if (gb) gb.addEventListener(‘click’, buildReport);
var cp = document.getElementById(‘repCopy’);
if (cp) cp.addEventListener(‘click’, copyRep);
var dl = document.getElementById(‘repDl’);
if (dl) dl.addEventListener(‘click’, dlRep);
}, 0);

return html;
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener(‘DOMContentLoaded’, function() {
// Wire static buttons
document.getElementById(‘keyBtn’).addEventListener(‘click’,  toggleApi);
document.getElementById(‘logBtn’).addEventListener(‘click’,  toggleLog);
document.getElementById(‘aSaveBtn’).addEventListener(‘click’, saveKey);
document.getElementById(‘aCancBtn’).addEventListener(‘click’, toggleApi);
document.getElementById(‘fab’).addEventListener(‘click’,     onFab);
document.getElementById(‘nt0’).addEventListener(‘click’, function(){ setTab(‘home’); });
document.getElementById(‘nt1’).addEventListener(‘click’, function(){ setTab(‘work’); });
document.getElementById(‘nt2’).addEventListener(‘click’, function(){ setTab(‘projects’); });
document.getElementById(‘nt3’).addEventListener(‘click’, toggleLog);
document.getElementById(‘nt4’).addEventListener(‘click’, function(){ setTab(‘report’); });
document.getElementById(‘nt5’).addEventListener(‘click’, showCats);

// Load data
lload();

// Show status
if (S.apiKey) {
setSyncDot(’#FBBF24’, ‘Syncing with Drive…’);
} else {
setSyncDot(’#F87171’, ‘Tap Key to add API key’);
}

// Render immediately
render();

// Sync drive in background
if (S.apiKey) syncDrive();
});
