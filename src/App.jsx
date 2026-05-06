export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080C14',
      color: '#E2E8F0',
      padding: '24px'
    }}>
      <div style={{
        fontSize: '42px',
        fontWeight: '800',
        marginBottom: '12px'
      }}>
        ⬡ Second Brain
      </div>

      <div style={{
        color: '#64748B',
        marginBottom: '30px'
      }}>
        AI Powered Productivity Dashboard
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>

        <div style={{
          background: '#0F172A',
          padding: '24px',
          borderRadius: '24px'
        }}>
          <div style={{ fontSize: '34px', fontWeight: '800', color: '#4F8EF7' }}>
            14
          </div>
          <div style={{ color: '#64748B' }}>
            Tasks
          </div>
        </div>

        <div style={{
          background: '#0F172A',
          padding: '24px',
          borderRadius: '24px'
        }}>
          <div style={{ fontSize: '34px', fontWeight: '800', color: '#34D399' }}>
            1
          </div>
          <div style={{ color: '#64748B' }}>
            Done
          </div>
        </div>

      </div>

      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '16px'
      }}>
        🔥 Priority Tasks
      </div>

      <div style={{
        background: '#0F172A',
        padding: '22px',
        borderRadius: '22px',
        marginBottom: '14px'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '10px'
        }}>
          DHCP Scope Failover UAT
        </div>

        <div style={{ color: '#64748B' }}>
          Network team using switch interface assignment.
        </div>
      </div>
    </div>
  );
}