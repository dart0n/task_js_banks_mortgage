const { model, Schema } = require('mongoose')

const Bank = new Schema(
  {
    name: { type: String, required: true, unique: true },
    // Interest rate - the annual percentage rate that expresses the amount of
    // money the bank charges additionally for the use of assets the person borrowed money for.
    interestRate: { type: Number, required: true },
    // Maximum loan - the maximum amount of money a bank is able to borrow.
    maximumLoan: { type: Number, required: true },
    // Minimum down payment - the amount of money a person needs to pay upfront
    // (if a person takes a loan of $300.000 and bank minimum down payment is 20%,
    // it means that person must pay the bank $60.000 as an initial mortgage payment)
    minimumDownPayment: { type: Number, required: true },
    // Loan term - a period of time in which a person must pay off the loan
    // (usually banks have several loan programs, but for this task,
    // let’s assume each bank has only one fixed term)
    loanTerm: { type: Number, required: true }, // months
  },
  { timestamps: true }
)

module.exports = model('Bank', Bank)
