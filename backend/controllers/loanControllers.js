const Loan = require('../models/Loan.js');
const User = require('../models/User.js');

// Create loan request
exports.createLoan = async (req, res) => {
  const { amount, term } = req.body;
  const customerId = req.user.id;  // Get the logged-in user ID
  
  // Calculate weekly repayments
  const weeklyAmount = amount / term;
  let repayments = [];

  for (let i = 1; i <= term; i++) {
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + i * 7)
    ; // Add 7 days per week
    repayments.push({
      dueDate: dueDate,
      amount: i === term ? weeklyAmount + (amount % term) : weeklyAmount, // Handle rounding
    });
  }

  const loan = new Loan({
    customerId,
    amount,
    term,
    repayments,
  });

  try {
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Hello' });
  }
};

// Approve loan (admin action)
exports.approveLoan = async (req, res) => {
  const loanId = req.params.loanId;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.status = 'APPROVED';
    await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error approving loan' });
  }
};

// Repay loan
exports.repayLoan = async (req, res) => {
  const loanId = req.params.loanId;
  const { repaymentAmount } = req.body;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Find the first unpaid repayment
    const repayment = loan.repayments.find(r => r.status === 'PENDING');
    
    if (!repayment) {
      return res.status(400).json({ message: 'No pending repayments found' });
    }

    if (repaymentAmount >= repayment.amount) {
      repayment.status = 'PAID';
      loan.status = loan.repayments.every(r => r.status === 'PAID') ? 'PAID' : 'APPROVED';
      await loan.save();
      res.status(200).json(loan);
    } else {
      res.status(400).json({ message: 'Repayment amount is insufficient' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing repayment' });
  }
};
