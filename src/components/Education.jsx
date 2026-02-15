import { GraduationCap, Award } from 'lucide-react';
import { Section } from './Section';

export const Education = ({ data, certifications }) => {
    return (
        <Section className="education-section">
            <div style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                {/* Education Column */}
                <div>
                    <h2 style={{ marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <GraduationCap /> Education
                    </h2>
                    {data.map((edu, index) => (
                        <div key={index}
                            className="glass-card"
                            style={{
                                borderTop: '4px solid var(--color-2)'
                            }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{edu.institution}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{edu.degree}</p>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                {edu.period}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications Column */}
                <div>
                    <h2 style={{ marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Award /> Certifications
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {certifications.map((cert, index) => (
                            <div key={index}
                                className="glass-card"
                                style={{
                                    padding: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'default'
                                }}
                            >
                                <div style={{
                                    minWidth: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: `var(--color-${(index % 3) + 1})`
                                }} />
                                <span>{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Section>
    );
};
