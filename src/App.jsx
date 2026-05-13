import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import ProjectDetail from './pages/ProjectDetail';
import Wrench from './pages/Wrench';
import Layout from './components/Layout';

function App() {
  const [introFinished, setIntroFinished] = useState(true);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home introFinished={introFinished} />} />
          <Route path="/portfolio" element={<Archive />} />
          <Route path="/project" element={<ProjectDetail />} />
          <Route path="/wrench" element={<Wrench />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
