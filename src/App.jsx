import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { LeetCode } from './components/LeetCode';
import { profile } from './data/profile';

function App() {
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
