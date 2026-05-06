import { useState } from 'react';

const TASKS = [
  {
    id: '1',
    title: 'DHCP Scope Failover UAT',
    category: 'work',
    priority: 'urgent',
    status: 'inprogress',
    dueDate: '2026-05-09'
  },
  {
    id: '2',
    title: 'Fix Packet Fence Auto Enrolment Issue',
    category: 'work',
    priority: 'high',
    status: 'inprogress',
    dueDate: '2026-05-06'
  },
  {
    id: '3',
    title: 'AD Transformation Roadmap',
    category: 'projects',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-05-08'
  }
];

const CATEGORIES = [
  {
    id: 'work',
    icon: '💼',
    label: 'Work',
    color: '#4F8EF7'
  },
  {
    id: 'projects',
    icon: '🚀',
    label: 'Projects',
    color: '#A78BFA'
  },
  {
    id: 'knowledge',
    icon: '🧠',
    label: 'Knowledge',
    color: '#FBBF24'
  }
];

export default function App(){

  const [tab, setTab] = useState('home');

  const done = TASKS.filter(t => t.status === 'done').length;
  const progress = Math.round((done / TASKS.length) * 100);

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

      <div style={styles.page}>

        <div style={styles.heroTitle}>
          Your Second Brain
        </div>

        <div style={styles.heroSub}>
          {TASKS.length - done} open tasks · {progress}% complete
        </div>

        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width:`${progress}%` }}></div>
        </div>

        <div style={styles.statsGrid}>

          <StatCard value={TASKS.length} label="Tasks" color="#4F8EF7" />

          <StatCard value={done} label="Done" color="#34D399" />

          <StatCard
            value={TASKS.filter(t => t.status === 'inprogress').length}
            label="In Progress"
            color="#FBBF24"
          />

          <StatCard value={0} label="Overdue" color="#F87171" />

        </div>

        <div style={styles.sectionTitle}>
          🔥 Urgent & High Priority
        </div>

        {
          TASKS.filter(t => ['urgent','high'].includes(t.priority))
            .map(task => (
              <TaskCard key={task.id} task={task} />
            ))
        }

        <div style={styles.weekBanner}>

          <div>
            <div style={styles.weekTitle}>
              28 Apr – 4 May 2026
            </div>

            <div style={styles.weekSub}>
              AI weekly report ready
            </div>
          </div>

          <button style={styles.generateBtn}>
            Generate →
          </button>

        </div>

        <div style={styles.sectionTitle}>
          Categories
        </div>

        <div style={styles.categoryGrid}>

          {
            CATEGORIES.map(cat => (
              <button
                key={cat.id}
                style={{
                  ...styles.categoryCard,
                  border:`1px solid ${cat.color}55`
                }}
                onClick={() => setTab(cat.id)}
              >
                <div style={styles.categoryIcon}>
                  {cat.icon}
                </div>

                <div style={styles.categoryLabel}>
                  {cat.label}
                </div>
              </button>
            ))
          }

        </div>

      </div>

      <div style={styles.navbar}>
        <NavButton icon="🏠" active={tab === 'home'} />
        <NavButton icon="💼" active={tab === 'work'} />
        <NavButton icon="🚀" active={tab === 'projects'} />
        <NavButton icon="📊" active={tab === 'report'} />
      </div>

      <button style={styles.fab}>+</button>

    </div>
  );
}

function StatCard({ value, label, color }){
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statValue, color }}>
        {value}
      </div>

      <div style={styles.statLabel}>
        {label}
      </div>
    </div>
  );
}

function TaskCard({ task }){
  return (
    <div style={styles.taskCard}>

      <div style={styles.taskAccent}></div>

      <div style={{ flex:1 }}>

        <div style={styles.taskTitle}>
          {task.title}
        </div>

        <div style={styles.badges}>

          <span style={styles.priorityBadge}>
            {task.priority}
          </span>

          <span style={styles.dateText}>
            {task.dueDate}
          </span>

        </div>

      </div>

    </div>
  );
}

function NavButton({ icon, active }){
  return (
    <button style={{
      ...styles.navBtn,
      ...(active ? styles.navBtnActive : {})
    }}>
      {icon}
    </button>
  );
}

const styles = {

  shell:{
    background:'#080C14',
    minHeight:'100vh',
    color:'#E2E8F0',
    maxWidth:'430px',
    margin:'0 auto',
    position:'relative',
    paddingBottom:'120px'
  },

  header:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'20px'
  },

  brand:{
    fontSize:'18px',
    fontWeight:'700'
  },

  sub:{
    fontSize:'12px',
    color:'#64748B',
    marginTop:'4px'
  },

  iconBtn:{
    background:'#0F172A',
    border:'none',
    borderRadius:'14px',
    color:'white',
    padding:'12px'
  },

  page:{
    padding:'0 20px'
  },

  heroTitle:{
    fontSize:'46px',
    fontWeight:'800',
    lineHeight:'1',
    marginBottom:'10px'
  },

  heroSub:{
    color:'#64748B',
    marginBottom:'12px'
  },

  progressTrack:{
    height:'6px',
    background:'#111827',
    borderRadius:'999px',
    overflow:'hidden',
    marginBottom:'28px'
  },

  progressFill:{
    height:'100%',
    background:'linear-gradient(90deg,#4F8EF7,#A78BFA)'
  },

  statsGrid:{
    display:'grid',
    gridTemplateColumns:'repeat(2,1fr)',
    gap:'12px',
    marginBottom:'28px'
  },

  statCard:{
    background:'#0F172A',
    borderRadius:'24px',
    padding:'22px'
  },

  statValue:{
    fontSize:'38px',
    fontWeight:'800'
  },

  statLabel:{
    marginTop:'8px',
    color:'#64748B'
  },

  sectionTitle:{
    fontSize:'13px',
    fontWeight:'700',
    color:'#94A3B8',
    marginBottom:'14px',
    textTransform:'uppercase',
    letterSpacing:'0.08em'
  },

  taskCard:{
    background:'#0F172A',
    borderRadius:'18px',
    padding:'18px',
    display:'flex',
    gap:'14px',
    marginBottom:'10px'
  },

  taskAccent:{
    width:'4px',
    borderRadius:'999px',
    background:'#4F8EF7'
  },

  taskTitle:{
    fontSize:'18px',
    fontWeight:'700',
    marginBottom:'10px'
  },

  badges:{
    display:'flex',
    gap:'10px',
    alignItems:'center'
  },

  priorityBadge:{
    background:'#FBBF2422',
    color:'#FBBF24',
    borderRadius:'999px',
    padding:'6px 12px',
    fontSize:'12px'
  },

  dateText:{
    color:'#64748B',
    fontSize:'12px'
  },

  weekBanner:{
    marginTop:'24px',
    marginBottom:'28px',
    background:'linear-gradient(135deg,#4F8EF715,#A78BFA15)',
    border:'1px solid #4F8EF733',
    borderRadius:'24px',
    padding:'20px',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },

  weekTitle:{
    fontWeight:'700',
    marginBottom:'6px'
  },

  weekSub:{
    color:'#64748B',
    fontSize:'13px'
  },

  generateBtn:{
    background:'none',
    border:'none',
    color:'#4F8EF7',
    fontWeight:'700'
  },

  categoryGrid:{
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gap:'12px'
  },

  categoryCard:{
    background:'#0F172A',
    borderRadius:'22px',
    padding:'18px 12px',
    color:'#E2E8F0'
  },

  categoryIcon:{
    fontSize:'28px',
    marginBottom:'12px'
  },

  categoryLabel:{
    fontSize:'14px'
  },

  navbar:{
    position:'fixed',
    bottom:'0',
    left:'50%',
    transform:'translateX(-50%)',
    width:'100%',
    maxWidth:'430px',
    background:'#080C14',
    borderTop:'1px solid #111827',
    display:'flex',
    justifyContent:'space-around',
    padding:'14px 0 24px'
  },

  navBtn:{
    background:'none',
    border:'none',
    color:'#374151',
    fontSize:'22px'
  },

  navBtnActive:{
    color:'#4F8EF7'
  },

  fab:{
    position:'fixed',
    right:'24px',
    bottom:'90px',
    width:'58px',
    height:'58px',
    borderRadius:'999px',
    border:'none',
    background:'linear-gradient(135deg,#4F8EF7,#A78BFA)',
    color:'white',
    fontSize:'28px',
    boxShadow:'0 10px 30px rgba(79,142,247,0.45)'
  }
};