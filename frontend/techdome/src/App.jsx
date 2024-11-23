/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanForm from './pages/LoanForm';
import LoanDetails from './pages/LoanDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanForm />} />
        <Route path="/loan/:loanId" element={<LoanDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
