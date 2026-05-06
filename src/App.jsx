import { useState } from 'react';

const TASKS = [
  {
    id: '1',
    title: 'DHCP Scope Failover UAT',
    category: 'work',
    priority: 'urgent',
    status: 'inprogress',
    dueDate: '2026-05-09',
    notes: 'Network team validating switch interface IP assignment approach.'
  },
  {
    id: '2',
    title: 'Fix Packet Fence Auto Enrolment Issue',
    category: 'work',
    priority: 'high',
    status: 'inprogress',
    dueDate: '2026-05-06',
    notes: 'Need automated unregister date assignment.'
  },
  {
    id: '3',
    title: 'AD Transformation Roadmap',
    category: 'projects',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-05-08',
    notes: 'Discussing Entra-only future architecture.'
  }
];

const WORKLOG = [
  { id:'w1', text:'Worked on PacketFence auto enrolment fix', type:'Investigation' },
  { id:'w2', text:'AD Transformation discussion with Microsoft', type:'Project' },
  { id:'w3', text:'DHCP failover validation discussion', type:'BAU' },
  { id:'w4', text:'DNS security architecture review', type:'Project' }
];

const CATEGORIES = [
  { id: 'work', icon: '💼', label: 'Work', color: '#4F8EF7' },
  { id: 'projects', icon: '🚀', label: 'Projects', color: '#A78BFA' },
  { id: 'personal', icon: '🌿', label: 'Personal', color: '#34D399' },
  { id: 'knowledge', icon: '🧠', label: 'Knowledge', color: '#FBBF24' },
  { id: 'bills', icon: '💳', label: 'Bills', color: '#F87171' },
  { id: 'watchlist', icon: '👁️', label: 'Watchlist', color: '#38BDF8' },
  { id: 'health', icon: '❤️', label: 'Health', color: '#FB923C' }
];

export default function App(){

  const [tab, setTab] = useState('home');
  const [expandedTask, setExpandedTask] = useState(null);

  const done = TASKS.filter(t => t.status === 'done').length;
  const progress = Math.round((done / TASKS.length) * 100);

  const currentCategory = CATEGORIES.find(c => c.id === tab);
  const categoryTasks = TASKS.filter(t => t.category === tab);

  return (
    <div style={styles.shell}>

      <div style={styles.header}>
        <div>
          <div style={styles.brand}>⬡ Second Brain</div>
          <div style={styles.sub}>Live Preview · AI Workspace</div>
        </div>

        <div style={{ display:'flex', gap:10 }}>
          <button style={styles.iconBtn}>📋</button>
          <button style={styles.iconBtn}>🔍</button>
        </div>
      </div>

      {tab === 'home' && (
        <div style={styles.page}>
          <div style={styles.heroTitle}>Your Second Brain</div>

          <div style={styles.heroSub}>
            {TASKS.length - done} open tasks · {progress}% complete
          </div>

          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width:`${progress}%` }}></div>
          </div>

          <div style={styles.statsGrid}>
            <StatCard value={TASKS.length} label="Tasks" color="#4F8EF7" />
            <StatCard value={done} label="Done" color="#34D399" />
            <StatCard value={2} label="In Progress" color="#FBBF24" />
            <StatCard value={0} label="Overdue" color="#F87171" />
          </div>

          <div style={styles.sectionTitle}>🔥 URGENT & HIGH PRIORITY</div>

          {TASKS.filter(t => ['urgent','high'].includes(t.priority)).map(task => (
            <TaskCard
              key={task.id}
              task={task}
              expanded={expandedTask === task.id}
              onToggle={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
            />
          ))}

          <div style={styles.weekBanner}>
            <div>
              <div style={styles.weekTitle}>28 Apr – 4 May 2026</div>
              <div style={styles.weekSub}>AI weekly report ready</div>
            </div>

            <button style={styles.generateBtn} onClick={() => setTab('report')}>Generate →</button>
          </div>

          <div style={styles.sectionTitle}>CATEGORIES</div>

          <div style={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                style={{
                  ...styles.categoryCard,
                  border:`1px solid ${cat.color}55`
                }}
                onClick={() => setTab(cat.id)}
              >
                <div style={styles.categoryIcon}>{cat.icon}</div>
                <div style={styles.categoryLabel}>{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'log' && (
        <div style={styles.page}>
          <div style={styles.pageTitle}>📋 Worklog Timeline</div>
          {WORKLOG.map(item => (
            <div key={item.id} style={styles.logCard}>
              <div style={styles.logDot}></div>
              <div>
                <div style={styles.logText}>{item.text}</div>
                <div style={styles.logType}>{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'report' && (
        <div style={styles.page}>
          <div style={styles.pageTitle}>📊 AI Weekly Report</div>

          <div style={styles.reportCard}>
            <div style={styles.reportTitle}>Executive Summary</div>
            <div style={styles.reportText}>
              Completed migration preparation activities, PacketFence troubleshooting, AD transformation discussions, and DHCP failover validations.
            </div>
          </div>

          <div style={styles.reportCard}>
            <div style={styles.reportTitle}>Projects</div>
            <div style={styles.reportText}>• AD Transformation Roadmap\n• DHCP Failover UAT\n• DNS Security Enhancements</div>
          </div>
        </div>
      )}

      {tab !== 'home' && tab !== 'report' && tab !== 'log' && currentCategory && (
        <div style={styles.page}>
          <button style={styles.backBtn} onClick={() => setTab('home')}>
            ← Back
          </button>

          <div style={styles.categoryPageHeader}>
            <div style={{ fontSize:'42px' }}>{currentCategory.icon}</div>
            <div>
              <div style={styles.categoryPageTitle}>{currentCategory.label}</div>
              <div style={styles.categoryPageSub}>{categoryTasks.length} active tasks</div>
            </div>
          </div>

          {categoryTasks.length > 0 ? (
            categoryTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                expanded={expandedTask === task.id}
                onToggle={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
              />
            ))
          ) : (
            <div style={styles.emptyCard}>
              No tasks available in this category.
            </div>
          )}

        </div>
      )}

      <div style={styles.navbar}>
        <NavButton icon="🏠" active={tab === 'home'} onClick={() => setTab('home')} />
        <NavButton icon="💼" active={tab === 'work'} onClick={() => setTab('work')} />
        <NavButton icon="🚀" active={tab === 'projects'} onClick={() => setTab('projects')} />
        <NavButton icon="📋" active={tab === 'log'} onClick={() => setTab('log')} />
        <NavButton icon="📊" active={tab === 'report'} onClick={() => setTab('report')} />
      </div>

      <button style={styles.fab}>+</button>
    </div>
  );
}

function StatCard({ value, label, color }){
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statValue, color }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function TaskCard({ task, expanded, onToggle }){
  return (
    <div style={styles.taskCard} onClick={onToggle}>
      <div style={styles.taskAccent}></div>
      <div style={{ flex:1 }}>
        <div style={styles.taskTitle}>{task.title}</div>
        <div style={styles.badges}>
          <span style={styles.priorityBadge}>{task.priority}</span>
          <span style={styles.dateText}>{task.dueDate}</span>
        </div>
        {expanded && (
          <div style={styles.notesBox}>{task.notes}</div>
        )}
      </div>
    </div>
  );
}

function NavButton({ icon, active, onClick }){
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navBtn,
        ...(active ? styles.navBtnActive : {})
      }}
    >
      {icon}
    </button>
  );
}

const styles = {
  shell:{ background:'#080C14', minHeight:'100vh', color:'#E2E8F0', maxWidth:'430px', margin:'0 auto', position:'relative', paddingBottom:'120px' },
  header:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px' },
  brand:{ fontSize:'18px', fontWeight:'700' },
  sub:{ fontSize:'12px', color:'#64748B', marginTop:'4px' },
  iconBtn:{ background:'#0F172A', border:'none', borderRadius:'14px', color:'white', padding:'12px' },
  page:{ padding:'0 20px' },
  heroTitle:{ fontSize:'46px', fontWeight:'800', lineHeight:'1', marginBottom:'10px' },
  heroSub:{ color:'#64748B', marginBottom:'12px' },
  progressTrack:{ height:'6px', background:'#111827', borderRadius:'999px', overflow:'hidden', marginBottom:'28px' },
  progressFill:{ height:'100%', background:'linear-gradient(90deg,#4F8EF7,#A78BFA)' },
  statsGrid:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px', marginBottom:'28px' },
  statCard:{ background:'#0F172A', borderRadius:'24px', padding:'22px' },
  statValue:{ fontSize:'38px', fontWeight:'800' },
  statLabel:{ marginTop:'8px', color:'#64748B' },
  sectionTitle:{ fontSize:'13px', fontWeight:'700', color:'#94A3B8', marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' },
  taskCard:{ background:'#0F172A', borderRadius:'18px', padding:'18px', display:'flex', gap:'14px', marginBottom:'10px', cursor:'pointer' },
  taskAccent:{ width:'4px', borderRadius:'999px', background:'#4F8EF7' },
  taskTitle:{ fontSize:'18px', fontWeight:'700', marginBottom:'10px' },
  badges:{ display:'flex', gap:'10px', alignItems:'center' },
  priorityBadge:{ background:'#FBBF2422', color:'#FBBF24', borderRadius:'999px', padding:'6px 12px', fontSize:'12px' },
  dateText:{ color:'#64748B', fontSize:'12px' },
  notesBox:{ marginTop:'14px', color:'#94A3B8', lineHeight:'1.6', fontSize:'14px' },
  weekBanner:{ marginTop:'24px', marginBottom:'28px', background:'linear-gradient(135deg,#4F8EF715,#A78BFA15)', border:'1px solid #4F8EF733', borderRadius:'24px', padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  weekTitle:{ fontWeight:'700', marginBottom:'6px' },
  weekSub:{ color:'#64748B', fontSize:'13px' },
  generateBtn:{ background:'none', border:'none', color:'#4F8EF7', fontWeight:'700' },
  categoryGrid:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'80px' },
  categoryCard:{ background:'#0F172A', borderRadius:'22px', padding:'22px 12px', color:'#E2E8F0' },
  categoryIcon:{ fontSize:'30px', marginBottom:'14px' },
  categoryLabel:{ fontSize:'15px' },
  navbar:{ position:'fixed', bottom:'0', left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:'430px', background:'#080C14', borderTop:'1px solid #111827', display:'flex', justifyContent:'space-around', padding:'14px 0 24px' },
  navBtn:{ background:'none', border:'none', color:'#374151', fontSize:'22px' },
  navBtnActive:{ color:'#4F8EF7' },
  fab:{ position:'fixed', right:'24px', bottom:'90px', width:'58px', height:'58px', borderRadius:'999px', border:'none', background:'linear-gradient(135deg,#4F8EF7,#A78BFA)', color:'white', fontSize:'28px', boxShadow:'0 10px 30px rgba(79,142,247,0.45)' },
  categoryPageHeader:{ display:'flex', alignItems:'center', gap:'18px', marginBottom:'24px' },
  categoryPageTitle:{ fontSize:'28px', fontWeight:'800' },
  categoryPageSub:{ color:'#64748B', marginTop:'6px' },
  emptyCard:{ background:'#0F172A', borderRadius:'18px', padding:'24px', color:'#64748B' },
  backBtn:{ background:'none', border:'none', color:'#4F8EF7', marginBottom:'18px', fontSize:'15px' },
  pageTitle:{ fontSize:'30px', fontWeight:'800', marginBottom:'24px' },
  logCard:{ background:'#0F172A', borderRadius:'18px', padding:'18px', marginBottom:'12px', display:'flex', gap:'14px' },
  logDot:{ width:'10px', height:'10px', borderRadius:'999px', background:'#4F8EF7', marginTop:'8px' },
  logText:{ fontWeight:'600', marginBottom:'6px' },
  logType:{ color:'#64748B', fontSize:'13px' },
  reportCard:{ background:'#0F172A', borderRadius:'18px', padding:'20px', marginBottom:'14px' },
  reportTitle:{ fontSize:'18px', fontWeight:'700', marginBottom:'10px' },
  reportText:{ color:'#94A3B8', lineHeight:'1.7', whiteSpace:'pre-line' }
};