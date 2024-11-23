const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true }, // Number of weeks
  repayments: [{
    dueDate: Date,
    amount: Number,
    status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' }
  }],
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' }
});

module.exports = mongoose.model('Loan', loanSchema);
