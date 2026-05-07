import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { askAI } from './lib/ai';
import tasksData from '../data/tasks.json';
import workData from '../data/work.json';
import projectsData from '../data/projects.json';
import worklogData from '../data/sb-worklog.json';

const CATEGORIES = [
  { id:'work', icon:'💼', label:'Work', color:'#4F8EF7' },
  { id:'projects', icon:'🚀', label:'Projects', color:'#A78BFA' },
  { id:'personal', icon:'🌿', label:'Personal', color:'#34D399' },
  { id:'knowledge', icon:'🧠', label:'Knowledge', color:'#FBBF24' }
];

export default function App(){
  const [tab,setTab] = useState('home');
  const [expanded,setExpanded] = useState(null);
  const [aiInput,setAiInput] = useState('');
  const [loading,setLoading] = useState(false);

  const [messages,setMessages] = useState([
    {
      role:'assistant',
      text:'Your AI second brain is online.'
    }
  ]);

  const [note,setNote] = useState('# Welcome to MemAI\n\nThis note is synced-ready for GitHub storage.');

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

  const sendMessage = async () => {
    if(!aiInput.trim()) return;

    const userMessage = aiInput;

    setMessages(prev => [
      ...prev,
      { role:'user', text:userMessage }
    ]);

    setAiInput('');
    setLoading(true);

    const response = await askAI(userMessage, note);

    setMessages(prev => [
      ...prev,
      {
        role:'assistant',
        text:response
      }
    ]);

    setLoading(false);
  };

  return (
    <div style={styles.shell}>
      <div style={styles.header}>
        <div>
          <div style={styles.brand}>⬡ MemAI Vault</div>
          <div style={styles.sub}>GitHub Connected Second Brain</div>
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
            <Card value={messages.length} label='AI Chats' color='#A78BFA'/>
          </div>

          <div style={styles.section}>📝 QUICK NOTE</div>

          <div style={styles.noteWrap}>
            <textarea
              style={styles.noteInput}
              value={note}
              onChange={(e)=>setNote(e.target.value)}
            />

            <div style={styles.preview}>
              <ReactMarkdown>{note}</ReactMarkdown>
            </div>
          </div>

          <div style={styles.section}>🧠 AI CHAT</div>

          <div style={styles.aiBox}>
            <div style={styles.msgs}>
              {messages.map((m,index)=>(
                <div key={index} style={m.role==='assistant' ? styles.aiMsg : styles.userMsg}>
                  <strong>{m.role}</strong>
                  <div>{m.text}</div>
                </div>
              ))}

              {loading && (
                <div style={styles.aiMsg}>Thinking...</div>
              )}
            </div>

            <div style={styles.aiInputWrap}>
              <input
                style={styles.aiInput}
                value={aiInput}
                onChange={(e)=>setAiInput(e.target.value)}
                placeholder='Ask your second brain...'
              />

              <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
            </div>
          </div>
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
  nav:{position:'fixed',bottom:0,left:0,right:0,background:'#080C14',display:'flex',justifyContent:'space-around',padding:'18px',borderTop:'1px solid #1E293B'},
  navBtn:{background:'none',border:'none',color:'#fff',fontSize:'24px'},
  noteWrap:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'},
  noteInput:{background:'#0F172A',color:'#fff',border:'1px solid #1E293B',borderRadius:'18px',padding:'18px',minHeight:'240px'},
  preview:{background:'#0F172A',padding:'18px',borderRadius:'18px',overflow:'auto'},
  aiBox:{background:'#0F172A',padding:'18px',borderRadius:'20px'},
  msgs:{maxHeight:'260px',overflow:'auto'},
  aiMsg:{background:'#111827',padding:'14px',borderRadius:'14px',marginBottom:'10px'},
  userMsg:{background:'#1E293B',padding:'14px',borderRadius:'14px',marginBottom:'10px'},
  aiInputWrap:{display:'flex',gap:'10px',marginTop:'14px'},
  aiInput:{flex:1,padding:'14px',borderRadius:'14px',border:'none',background:'#111827',color:'#fff'},
  sendBtn:{background:'#4F8EF7',border:'none',padding:'14px 18px',borderRadius:'14px',color:'#fff'}
};