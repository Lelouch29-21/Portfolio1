import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { Section } from './Section';

export const Hero = ({ data }) => {
    return (
        <Section className="hero">
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 className="gradient-text" style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                    fontWeight: 800
                }}>
                    {data.name}
                </h1>

                <h2 style={{
                    fontSize: '1.75rem',
                    color: 'var(--color-3)',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                }}>
                    {data.role}
                </h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem'
                }}>
                    <MapPin size={16} />
                    <span>{data.location}</span>
                </div>

                <p style={{
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    lineHeight: 1.8,
                    color: 'var(--text-primary)'
                }}>
                    {data.summary}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem'
                }}>
                    <a href={`mailto:${data.contact.email}`} aria-label="Email" style={iconLinkStyle}>
                        <Mail size={24} />
                    </a>
                    <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={iconLinkStyle}>
                        <Linkedin size={24} />
                    </a>
                    <a href={data.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={iconLinkStyle}>
                        <Github size={24} />
                    </a>
                </div>
            </div>
        </Section>
    );
};

const iconLinkStyle = {
    padding: '16px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--text-primary)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
};

// Add pseudo-element hover effects in a global css or keeping inline simpler. 
// For "wow" factor, the global a:hover handles color-3.
// We can add a specialized hover here via a class helper if needed, but the container A tag handles color.
// Actually, let's make these buttons pop more.
