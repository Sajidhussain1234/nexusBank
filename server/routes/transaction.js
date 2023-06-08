const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction");

//Route:01 /Make new transactions
router.post("/", controller.createTransaction);

//Route:02 /Get specific transaction through /transaction/:Id 
router.get("/:id", controller.getTransactionById);

//Route:03 /GET all transactions of a single account number through /transactions/account/:acount id
router.get("/account/:id", controller.getTransactionByAccountId); 
// /accountNumber/:accountNumber  intensionally add accountNumber with api endpoint to differnitiate from above id api endpoint

//Route:04 /GET all transactions
router.get("/", controller.getAllTransactions); 

module.exports = router;

