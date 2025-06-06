import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // your main hotel listing
import Visited from './components/visited';
import Drafts from './components/Drafts';
import Completed from './components/Completed';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visited" element={<Visited />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </Router>
  );
}

export default App;
