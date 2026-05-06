import { useMemo, useState } from 'react';
import tasksData from '../data/tasks.json';
import workData from '../data/work.json';
import projectsData from '../data/projects.json';
import worklogData from '../data/sb-worklog.json';

const CATEGORIES = [
  { id:'work', icon:'💼', label:'Work', color:'#4F8EF7' },
  { id:'projects', icon:'🚀', label:'Projects', color:'#A78BFA' },
  { id:'personal', icon:'🌿', label:'Personal', color:'#34D399' },
  { id:'knowledge', icon:'🧠', label:'Knowledge', color:'#FBBF24' },
  { id:'bills', icon:'💳', label:'Bills', color:'#F87171' },
  { id:'watchlist', icon:'👁️', label:'Watchlist', color:'#38BDF8' },
  { id:'health', icon:'❤️', label:'Health', color:'#FB923C' }
];

export default function App(){
  const [tab,setTab] = useState('home');
  const [expanded,setExpanded] = useState(null);

  const TASKS = useMemo(() => {

    const merged = [
      ...(tasksData.tasks || []),
      ...(workData.tasks || workData.work || []),
      ...(projectsData.projects || [])
    ];

    return merged.map((t,index)=>(
      {
        id:t.id || String(index+1),
        title:t.title || t.name || 'Untitled',
        category:t.context || t.category || 'work',
        priority:(t.priority || 'normal').toLowerCase(),
        status:(t.status || 'todo').toLowerCase(),
        dueDate:t.dueDate || '',
        notes:t.notes || t.summary || t.description || ''
      }
    ));

  },[]);

  const WORKLOG = worklogData.worklog || worklogData.entries || [];

  const done = TASKS.filter(t=>t.status==='done').length;
  const open = TASKS.filter(t=>t.status!=='done');
  const progress = TASKS.length ? Math.round((done/TASKS.length)*100) : 0;

  const filtered = tab === 'home'
    ? []
    : TASKS.filter(t=>t.category===tab);

  return (
    <div style={styles.shell}>

      <div style={styles.header}>
        <div>
          <div style={styles.brand}>⬡ Second Brain</div>
          <div style={styles.sub}>Live Database Connected</div>
        </div>
      </div>

      {tab === 'home' && (
        <div style={styles.page}>

          <div style={styles.hero}>Your Second Brain</div>

          <div style={styles.subText}>
            {open.length} open tasks · {progress}% complete
          </div>

          <div style={styles.grid}>
            <Card value={TASKS.length} label='Tasks' color='#4F8EF7'/>
            <Card value={done} label='Done' color='#34D399'/>
            <Card value={TASKS.filter(t=>t.status==='inprogress').length} label='In Progress' color='#FBBF24'/>
            <Card value={TASKS.filter(t=>t.priority==='urgent').length} label='Urgent' color='#F87171'/>
          </div>

          <div style={styles.section}>🔥 PRIORITY TASKS</div>

          {TASKS.filter(t=>['urgent','high'].includes(t.priority)).slice(0,10).map(task=>(
            <TaskCard
              key={task.id}
              task={task}
              expanded={expanded===task.id}
              onClick={()=>setExpanded(expanded===task.id ? null : task.id)}
            />
          ))}

          <div style={styles.section}>CATEGORIES</div>

          <div style={styles.catGrid}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                style={{...styles.cat,border:`1px solid ${cat.color}55`}}
                onClick={()=>setTab(cat.id)}
              >
                <div style={styles.catIcon}>{cat.icon}</div>
                <div>{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'log' && (
        <div style={styles.page}>
          <div style={styles.hero}>Worklog</div>
          {WORKLOG.slice(0,20).map((item,index)=>(
            <div key={index} style={styles.log}>
              {item.text || item.title || JSON.stringify(item)}
            </div>
          ))}
        </div>
      )}

      {tab !== 'home' && tab !== 'log' && (
        <div style={styles.page}>
          <button style={styles.back} onClick={()=>setTab('home')}>← Back</button>
          <div style={styles.hero}>{tab}</div>

          {filtered.map(task=>(
            <TaskCard
              key={task.id}
              task={task}
              expanded={expanded===task.id}
              onClick={()=>setExpanded(expanded===task.id ? null : task.id)}
            />
          ))}
        </div>
      )}

      <div style={styles.nav}>
        <button style={styles.navBtn} onClick={()=>setTab('home')}>🏠</button>
        <button style={styles.navBtn} onClick={()=>setTab('work')}>💼</button>
        <button style={styles.navBtn} onClick={()=>setTab('projects')}>🚀</button>
        <button style={styles.navBtn} onClick={()=>setTab('log')}>📋</button>
      </div>

    </div>
  );
}

function Card({value,label,color}){
  return (
    <div style={styles.card}>
      <div style={{fontSize:36,fontWeight:800,color}}>{value}</div>
      <div style={{color:'#64748B'}}>{label}</div>
    </div>
  );
}

function TaskCard({task,expanded,onClick}){
  return (
    <div style={styles.task} onClick={onClick}>
      <div style={styles.taskTitle}>{task.title}</div>
      <div style={styles.badges}>
        <span>{task.priority}</span>
        <span>{task.dueDate}</span>
      </div>
      {expanded && (
        <div style={styles.notes}>{task.notes}</div>
      )}
    </div>
  );
}

const styles = {
  shell:{background:'#080C14',minHeight:'100vh',color:'#fff',fontFamily:'Inter,sans-serif',paddingBottom:'120px'},
  header:{padding:'20px'},
  brand:{fontSize:'20px',fontWeight:800},
  sub:{color:'#64748B',marginTop:'6px'},
  page:{padding:'20px'},
  hero:{fontSize:'58px',fontWeight:800,lineHeight:1,marginBottom:'12px'},
  subText:{color:'#64748B',marginBottom:'24px'},
  grid:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',marginBottom:'28px'},
  card:{background:'#0F172A',padding:'24px',borderRadius:'22px'},
  section:{marginBottom:'14px',marginTop:'30px',color:'#94A3B8',fontWeight:700,letterSpacing:'2px'},
  task:{background:'#0F172A',padding:'20px',borderRadius:'20px',marginBottom:'12px'},
  taskTitle:{fontSize:'20px',fontWeight:700,marginBottom:'10px'},
  badges:{display:'flex',gap:'12px',color:'#94A3B8',fontSize:'13px'},
  notes:{marginTop:'14px',color:'#CBD5E1',lineHeight:1.6},
  catGrid:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'},
  cat:{background:'#0F172A',borderRadius:'20px',padding:'24px',color:'#fff'},
  catIcon:{fontSize:'32px',marginBottom:'10px'},
  nav:{position:'fixed',bottom:0,left:0,right:0,background:'#080C14',display:'flex',justifyContent:'space-around',padding:'18px',borderTop:'1px solid #1E293B'},
  navBtn:{background:'none',border:'none',color:'#fff',fontSize:'24px'},
  log:{background:'#0F172A',padding:'18px',borderRadius:'16px',marginBottom:'10px'},
  back:{background:'none',border:'none',color:'#4F8EF7',marginBottom:'20px'}
};