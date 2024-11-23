import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend API URL

export const createLoan = async (amount, term) => {
  try {
    const response = await axios.post(`${API_URL}/loan/create`, { amount, term }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating loan:', error);
    throw error;
  }
};

export const getLoanDetails = async (loanId) => {
  try {
    const response = await axios.get(`${API_URL}/loan/${loanId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching loan details:', error);
    throw error;
  }
};

export const makeRepayment = async (loanId, repaymentAmount) => {
  try {
    const response = await axios.post(`${API_URL}/loan/${loanId}/repayment`, { repaymentAmount }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error making repayment:', error);
    throw error;
  }
};
