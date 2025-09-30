import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import cyberpunkTheme from './Styles/theme.ts';
import './Styles/neon.css';

import Layout from './components/Layout/Layout.tsx';
import GaragePage from './components/Garage/GaragePage.tsx';
import WinnersPage from './components/Winners/WinnersPage.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Router basename="/Async-race-project">
        <Layout>
          <Routes>
            <Route path="/" element={<GaragePage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/winners" element={<WinnersPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;