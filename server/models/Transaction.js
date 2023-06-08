const mongoose = require('mongoose');
const Account = require("./Account")
const Schema = new mongoose.Schema({   
  account : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Account',
    required: true
  }, 
   transactionType: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currentBalance: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}
);

const Transaction = mongoose.model('Transaction', Schema);

module.exports = Transaction;
