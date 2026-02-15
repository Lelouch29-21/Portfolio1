import { Cpu } from 'lucide-react';
import { Section } from './Section';

export const Skills = ({ data }) => {
    return (
        <Section className="skills-section">
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Cpu /> Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {data.map((skill, index) => (
                    <span
                        key={index}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: `1px solid var(--color-${(index % 3) + 1})`,
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            fontWeight: 500,
                            boxShadow: `0 0 10px var(--color-${(index % 3) + 1}33)`,
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `var(--color-${(index % 3) + 1}22)`;
                            e.currentTarget.style.boxShadow = `0 0 20px var(--color-${(index % 3) + 1})`;
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.boxShadow = `0 0 10px var(--color-${(index % 3) + 1}33)`;
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </Section>
    );
};
