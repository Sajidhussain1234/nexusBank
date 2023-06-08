import React, { useState, useContext } from 'react'
import axios from 'axios';
import { UserContext } from "../../context/user";
import { AlertContext } from "../../context/alert";


const TransactionInfo = () => {

    const [newTransaction, setNewTransaction] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext)

    const { transactions, setTransactions, account } = userContext;
    const {showAlert} = alertContext;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // adding account id with transaction object
            console.log(newTransaction)
            newTransaction.account = account._id; 
            setIsLoading(true);
            const res = await axios.post('http://localhost:3002/api/transactions/', newTransaction);
            const data = res.data.transaction;            
            console.log(data);
            setTransactions([...transactions, data]); 
            setIsLoading(false);
            showAlert("Transaction done successfully! ")
        } catch (error) {
            setIsLoading(false)
            showAlert(error.response.data.error);
            // setIsError(true)
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    };


    if (isLoading) return (<div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>)
    if (isError) return (<h4>Some thing went wrong...</h4>)

    return (
        <div>
            <div className='container'>
                <h3 className='mt-3'>Create Transaction </h3>
                <form onSubmit={handleSubmit} className='d-flex'>
                    {/* <input type="text" className="form-control mx-2" id="account" name="account" placeholder='Account id' onChange={handleChange} /> */}
                    <input type="number" className="form-control mx-2" id="amount" name="amount" placeholder='Amount' onChange={handleChange} />
                    <select className="form-select" aria-label="Default select example" name="transactionType" onChange={handleChange}>
                        <option defaultValue>select transaction type</option>
                        <option value="deposit">deposit</option>
                        <option value="withdrawal">withdrawal</option>
                    </select>
                    <button type="submit" className="btn btn-primary mx-2">Submit</button>
                </form>
            </div>
            <hr />
            {/* Showing all transactions */}
            <div className='container mb-3'>
                <h3> Transactions history: </h3>
                <div className="row row-cols-1 row-cols-md-4 g-6 my-2">
                    {
                        transactions.length ? (
                            <>
                                {transactions.map((transaction) => {
                                   return (
                                    <div className="col my-2" key={transaction._id}>
                                      <div className="card">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item">
                                            Transaction id: <strong>{transaction._id}</strong> <br />
                                            Account Number: <strong>{account.accountNumber}</strong> <br />
                                            Type: <strong>{transaction.transactionType}</strong> <br />
                                            Transaction Amount: <strong>{transaction.amount}</strong> <br />
                                            Current balance: <strong>{transaction.currentBalance}</strong> <br />
                                            Date: <strong>{new Date(transaction.date).toLocaleString()}</strong>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                  
                                })}
                            </>
                        ) : (
                            <p> There is nothing to show in history</p>                            
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default TransactionInfo;