import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Section } from './Section';

export const Experience = ({ data }) => {
    return (
        <Section className="experience-section">
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Experience</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
                {data.map((job, index) => (
                    <div key={index}
                        className="glass-card"
                        style={{
                            borderLeft: `4px solid var(--color-${(index % 3) + 1})`
                        }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{job.role}</h3>
                                <div style={{ color: `var(--color-${(index % 3) + 1})`, fontWeight: 600 }}>{job.company}</div>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <Calendar size={14} />
                                    {job.period}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                                    <MapPin size={14} />
                                    {job.location}
                                </div>
                            </div>
                        </div>
                        {job.description && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{job.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};
