/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../pages/Api';

const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loan = await createLoan(amount, term);
      navigate(`/loan/${loan._id}`);
      console.log("Hey")
    } catch (error) {
      alert('Error submitting loan application');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold">Apply for a Loan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount" className="block text-gray-700">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="term" className="block text-gray-700">Term (Weeks)</label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-6 w-full bg-blue-500 text-white p-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
