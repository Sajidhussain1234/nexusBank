const Transaction = require("../models/Transaction");
const Account = require("../models/Account");


// Create a new transaction
const createTransaction = async (req, res) => {
  console.log(req.body);
  const { account, amount, transactionType } = req.body;
  try {
    const acnt = await Account.findOne({ _id: account });
    if (!acnt) {
      res.status(404).json({ error: "Account not found" });
    } else if (transactionType === "withdrawal") {
      if (acnt.balance < amount) {
        res.status(400).json({ error: "Insufficient balance" });
      } else {
        acnt.balance -= parseInt(amount);
        await acnt.save();
        console.log(acnt)
        // res.json({ message: "Withdrawal successful", balance: acnt.balance });
        const transaction = new Transaction({
          account,
          transactionType,
          amount,
          currentBalance: acnt.balance
        });
        await transaction.save();
        res
          .status(201)
          .json({ message: "Transaction created successfully.", transaction,  TransactionType: "Withdrawal ", currentBalance: acnt.balance });
      }
    } else {
      acnt.balance += parseInt(amount);
      await acnt.save();
      // res.json({ message: "Deposit successful", balance: acnt.balance });
      const transaction = new Transaction({
        account,
        transactionType,
        amount,
        currentBalance:acnt.balance
      });
      await transaction.save();
      res
        .status(201)
        .json({ message: "Transaction created successfully.", transaction});
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the transaction."});
  }
};

// Get a specific transaction by transaction id
const getTransactionById = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    // const transaction = await Transaction.findById(transactionId).populate('accountNumber');
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the transaction." });
  }
};

// Get all transactions of a specific account
const getTransactionByAccountId = async (req, res) => {
  const account = req.params.id;
  console.log(account);

  try {
    const transactions = await Transaction.find({ account });
    if (!transactions.length) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    
    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the transactions." });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions.length) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the transactions." });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getTransactionByAccountId,
  getAllTransactions
};
