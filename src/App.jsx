import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { LeetCode } from './components/LeetCode';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { profile } from './data/profile';
import { trackVisit } from './lib/analytics';

const ANALYTICS_HASH_ROUTE = '#/analytics';
const isAnalyticsRoute = () => window.location.hash === ANALYTICS_HASH_ROUTE;

function App() {
  const [showAnalytics, setShowAnalytics] = useState(() => isAnalyticsRoute());

  useEffect(() => {
    const handleHashChange = () => setShowAnalytics(isAnalyticsRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!showAnalytics) {
      trackVisit();
    }
  }, [showAnalytics]);

  if (showAnalytics) {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="app">
      <Hero data={profile} />
      <Experience data={profile.experience} />
      <Education data={profile.education} certifications={profile.certifications} />
      <Skills data={profile.skills} />
      <LeetCode username={profile.leetcode.username} />
    </div>
  );
}

export default App;
