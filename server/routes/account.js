const express = require('express');
const router = express.Router();
const controller = require('../controllers/account');


// Create a new account
router.post('/', controller.createAccount);

// Get account balance
router.get('/balance/:accountNumber', controller.getAccountBalance);

// Get all accounts
router.get('/', controller.getAllAccounts);

// Get a single account by id
router.get('/:id', controller.getSingleAccount);

// Get a single account by id
router.get('/user/:id', controller.getAccountByUserId);


module.exports = router;
