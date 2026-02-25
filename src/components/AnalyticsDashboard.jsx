import { useCallback, useEffect, useState } from 'react';
import { Activity, ArrowLeft, BarChart3, MousePointerClick, RefreshCw } from 'lucide-react';
import { Section } from './Section';
import { loadAnalyticsSnapshot } from '../lib/analytics';

const cardStyle = {
  minWidth: '220px',
  flex: '1 1 220px',
};

const ChartContainer = ({ title, children }) => (
  <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{title}</h3>
    {children}
  </div>
);

const VisitsLineChart = ({ data }) => {
  const width = 760;
  const height = 260;
  const paddingX = 36;
  const paddingY = 28;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const maxCount = Math.max(...data.map((item) => item.count), 1);

  const points = data
    .map((item, index) => {
      const x = paddingX + (index * innerWidth) / (data.length - 1 || 1);
      const y = height - paddingY - (item.count / maxCount) * innerHeight;

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', minWidth: '640px', height: '260px' }}
        role="img"
        aria-label="Seven day visits trend"
      >
        <line
          x1={paddingX}
          y1={height - paddingY}
          x2={width - paddingX}
          y2={height - paddingY}
          stroke="var(--border-color)"
          strokeWidth="1"
        />
        <line
          x1={paddingX}
          y1={paddingY}
          x2={paddingX}
          y2={height - paddingY}
          stroke="var(--border-color)"
          strokeWidth="1"
        />
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-1)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((item, index) => {
          const x = paddingX + (index * innerWidth) / (data.length - 1 || 1);
          const y = height - paddingY - (item.count / maxCount) * innerHeight;

          return (
            <g key={item.key}>
              <circle cx={x} cy={y} r="4" fill="var(--color-2)" />
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="11"
              >
                {item.label}
              </text>
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="11"
              >
                {item.count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const ButtonClickBars = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {data.map((item) => {
        const widthPercent = Math.max((item.count / maxCount) * 100, item.count > 0 ? 5 : 0);

        return (
          <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 50px', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.label}</span>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${widthPercent}%`,
                  height: '100%',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, var(--color-2), var(--color-1))',
                }}
              />
            </div>
            <span style={{ textAlign: 'right', fontWeight: 600 }}>{item.count}</span>
          </div>
        );
      })}
    </div>
  );
};

export const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);

  const refreshAnalytics = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const snapshot = await loadAnalyticsSnapshot();
      setAnalytics(snapshot);
    } catch {
      setError('Unable to load analytics right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAnalytics();
  }, [refreshAnalytics]);

  const lastUpdated = analytics ? new Date().toLocaleString() : '';

  return (
    <Section className="analytics-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BarChart3 /> Portfolio Analytics
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: '0.7rem',
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.9rem',
            }}
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </a>

          <button
            type="button"
            onClick={refreshAnalytics}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: '0.7rem',
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'var(--text-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="glass-card" style={{ textAlign: 'center' }}>
          Loading analytics...
        </div>
      )}

      {!loading && error && (
        <div className="glass-card" style={{ color: 'var(--color-2)', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {!loading && !error && analytics && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="glass-card" style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <Activity size={16} /> Total Visits
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{analytics.totalVisits}</div>
            </div>

            <div className="glass-card" style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <MousePointerClick size={16} /> Total Button Clicks
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{analytics.totalClicks}</div>
            </div>

            <div className="glass-card" style={cardStyle}>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Last Updated</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{lastUpdated}</div>
            </div>
          </div>

          <ChartContainer title="Visits (Last 7 Days)">
            <VisitsLineChart data={analytics.dailyVisits} />
          </ChartContainer>

          <ChartContainer title="Button Click Distribution">
            <ButtonClickBars data={analytics.buttonClicks} />
          </ChartContainer>
        </>
      )}
    </Section>
  );
};
