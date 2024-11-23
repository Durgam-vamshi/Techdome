/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLoanDetails } from "../pages/Api"

const LoanDetails = () => {
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const loanDetails = await getLoanDetails(loanId);
      setLoan(loanDetails);
    };

    fetchLoanDetails();
  }, [loanId]);

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold">Loan Details</h1>
      <p><strong>Amount:</strong> ${loan.amount}</p>
      <p><strong>Term:</strong> {loan.term} weeks</p>
      <p><strong>Status:</strong> {loan.status}</p>
      {/* Show repayments */}
      <div>
        <h2 className="mt-4">Repayments</h2>
        {loan.repayments.map((repayment, index) => (
          <div key={index}>
            <p>Due: {new Date(repayment.dueDate).toLocaleDateString()}</p>
            <p>Amount: ${repayment.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanDetails;
