import { useState, useEffect } from 'react';
import { Code, ExternalLink, Loader2 } from 'lucide-react';
import { Section } from './Section';
import { trackButtonClick } from '../lib/analytics';

export const LeetCode = ({ username }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
                if (!response.ok) throw new Error('Failed to fetch stats');
                const data = await response.json();
                if (data.status === 'error') throw new Error(data.message);
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);

    return (
        <Section className="leetcode-section">
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Code /> LeetCode Stats
            </h2>

            <div className="glass-card" style={{
                textAlign: 'center'
            }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader2 className="spin" size={32} style={{ animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : error ? (
                    <div style={{ color: 'var(--color-2)' }}>
                        <p style={{ marginBottom: '0.5rem' }}>Could not load LeetCode stats.</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Please check the username in <code>src/data/profile.js</code>.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginBottom: '2rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <StatItem label="Total Solved" value={stats.totalSolved} color="var(--primary)" />
                            <StatItem label="Easy" value={stats.easySolved} color="#00b8a3" />
                            <StatItem label="Medium" value={stats.mediumSolved} color="#ffc01e" />
                            <StatItem label="Hard" value={stats.hardSolved} color="#ff375f" />
                        </div>

                        <a
                            href={`https://leetcode.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackButtonClick('leetcode-profile')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                marginTop: '1rem'
                            }}
                        >
                            View Profile <ExternalLink size={16} />
                        </a>
                    </div>
                )}
            </div>
        </Section>
    );
};

const StatItem = ({ label, value, color }) => (
    <div style={{ minWidth: '100px' }}>
        <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: color,
            marginBottom: '0.5rem'
        }}>
            {value}
        </div>
        <div style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>
            {label}
        </div>
    </div>
);
