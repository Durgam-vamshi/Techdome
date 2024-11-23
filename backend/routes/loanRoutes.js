
const express = require('express');
const createLoan = require('../controllers/loanControllers.js');
const authMiddleware = require('../middlewares/auth.js');
const router = express.Router();

// Protected routes (authentication required)
router.post('/create', authMiddleware, createLoan);
router.post('/:loanId/repayment', authMiddleware, loanController.repayLoan);

// Admin route to approve loan
router.post('/:loanId/approve', authMiddleware, loanController.approveLoan);

module.exports = router;
