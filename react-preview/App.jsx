import { useState } from 'react';

export default function App() {
  const [tab, setTab] = useState('home');

  const tasks = [
    {
      id: '1',
      title: 'DHCP Scope Failover UAT',
      priority: 'urgent',
      status: 'inprogress'
    },
    {
      id: '2',
      title: 'Fix Packet Fence Auto Enrolment Issue',
      priority: 'high',
      status: 'inprogress'
    }
  ];

  return (
    <div style={styles.shell}>
      <div style={styles.header}>
        <div>
          <div style={styles.brand}>⬡ Second Brain</div>
          <div style={styles.sub}>Live Preview · Google Drive ✓</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={styles.iconBtn}>📋</button>
          <button style={styles.iconBtn}>🔍</button>
        </div>
      </div>

      <div style={styles.page}>
        <div style={styles.heroTitle}>Your Second Brain</div>
        <div style={styles.heroSub}>Modern AI-powered productivity dashboard</div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#4F8EF7' }}>14</div>
            <div style={styles.statLabel}>TASKS</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#34D399' }}>1</div>
            <div style={styles.statLabel}>DONE</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#FBBF24' }}>11</div>
            <div style={styles.statLabel}>IN PROGRESS</div>
          </div>
        </div>

        <div style={styles.section}>🔥 Urgent & High Priority</div>

        {tasks.map(task => (
          <div key={task.id} style={styles.taskCard}>
            <div style={styles.taskTitle}>{task.title}</div>

            <div style={styles.badgeRow}>
              <span style={styles.badge}>{task.priority}</span>
              <span style={styles.badge}>{task.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.nav}>
        <button style={styles.navBtn} onClick={() => setTab('home')}>🏠</button>
        <button style={styles.navBtn}>💼</button>
        <button style={styles.navBtn}>🚀</button>
        <button style={styles.navBtn}>📊</button>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    background: '#080C14',
    minHeight: '100vh',
    color: '#E2E8F0',
    fontFamily: 'Inter, sans-serif'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px'
  },

  brand: {
    fontSize: '26px',
    fontWeight: '800'
  },

  sub: {
    color: '#64748B',
    marginTop: '4px'
  },

  iconBtn: {
    background: '#0F172A',
    border: 'none',
    color: 'white',
    padding: '12px',
    borderRadius: '14px'
  },

  page: {
    padding: '20px'
  },

  heroTitle: {
    fontSize: '42px',
    fontWeight: '800',
    marginBottom: '10px'
  },

  heroSub: {
    color: '#64748B',
    marginBottom: '30px'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '12px',
    marginBottom: '30px'
  },

  statCard: {
    background: '#0F172A',
    padding: '20px',
    borderRadius: '20px',
    textAlign: 'center'
  },

  statValue: {
    fontSize: '32px',
    fontWeight: '800'
  },

  statLabel: {
    marginTop: '8px',
    color: '#64748B',
    fontSize: '12px'
  },

  section: {
    marginBottom: '16px',
    color: '#94A3B8',
    fontWeight: '700'
  },

  taskCard: {
    background: '#0F172A',
    padding: '20px',
    borderRadius: '20px',
    marginBottom: '12px'
  },

  taskTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '10px'
  },

  badgeRow: {
    display: 'flex',
    gap: '10px'
  },

  badge: {
    background: '#1E293B',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px'
  },

  nav: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#0F172A',
    padding: '14px 24px',
    borderRadius: '999px',
    display: 'flex',
    gap: '16px'
  },

  navBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '22px'
  }
};