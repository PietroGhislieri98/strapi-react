// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Menu from './components/Menu/Menu';
import Page from './components/Page/Page';
import Header from './components/Header/Header';
import TestPage from './components/TestPage/TestPage';
import TestExecutionRevisionForm from "./components/TestPage/TestExecutionRevisionForm";

const { Content } = Layout;

function App() {
  return (
    <Router>
      {/* Header sotto il menu */}
      <Layout style={{ minHeight: '100vh' }}>      <Header />


        {/* Menu sopra l'header */}
        <Menu />

        {/* Contenuto principale */}
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<Page slug="home" />} />
            <Route path="/:slug" element={<Page />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/test_results" element={<TestExecutionRevisionForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
