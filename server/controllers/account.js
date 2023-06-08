const Account = require("../models/Account");




// This is a simple function used to assign account number to a new user
const initializeAccountNumber = async () => {
  const account = await Account.findOne().sort({ accountNumber: -1 });
  if (account) {
    // Increment the account number
    return (account.accountNumber + 1)
  } else {
    // Set the initial account number
    return 1000; 
  }
};



// Create a new account
const createAccount = async (req, res) => {
  // const { user,accountNumber, balance } = req.body; // For thunder client parameters

  const {user} = req.body; 
  console.log(user)
  const accountNumber = await initializeAccountNumber(); 
  const balance = 0; 

  try {
    const account = new Account({ user, accountNumber, balance });
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get account balance
const getAccountBalance = async (req, res) => {
   const { accountNumber } = req.params;
  // console.log("accountNumber:", accountNumber);
  try {
    // const account = await Account.find((a) => a.accountNumber === accountNumber);
    const account = await Account.findOne({accountNumber: accountNumber });
    if (!account) {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.json({ balance: account.balance });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    if (!accounts) {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.json(accounts)
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific account by account id
const getSingleAccount = async (req, res) => {
  const Id = req.params.id;
  console.log(Id)
  try {
    const account = await Account.findOne(Id);
    console.log(account)
    if (!account) {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.json(account)
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific account by user id
const getAccountByUserId = async (req, res) => {
  const user = req.params.id;
  console.log(user)
  try {
    const account = await Account.findOne({user});
    console.log(account)
    if (!account) {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.json(account)
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createAccount,
  getAccountBalance,
  getAllAccounts,
  getSingleAccount,
  getAccountByUserId
};
