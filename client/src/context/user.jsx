import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AlertContext } from "./alert";

const UserContext = createContext();

const UserState = (props) => {
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext;

    let navigate = useNavigate();


    const getUser = async () => {

        const authToken = localStorage.getItem('token');        

        try {
            if (!localStorage.getItem('token')) {
                console.log("testing")
                navigate('/login');
                // Display a message indicating the user is not logged in
                showAlert("You are not logged in! Please, Login before use")
            } else {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3002/api/auth/getuser", {
                    headers: {
                        "Content-Type": "application/json",
                        "atoken": authToken
                    }
                });
                const user = await response.data.user;
                setUser(user);
                // console.log("user", user)
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            if (error.request.status === 404) {
                console.error("User not Found!");
                showAlert("User not Found!")
            } else if (error.request.status === 401) {
                console.log("Please! Login before use.")
                showAlert("Please! Login before use.")
            } else {
                setIsError(true);
            }
        }
    };

    const getAccount = async () => {
        const id = user._id;
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3002/api/accounts/user/${id}`);
            const data = response.data;
            setAccount(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error.response);
            if (error.response.status === 404) {
                console.log("Account not Found!");
                showAlert("Account not Found")
            } else {
                setIsError(true);
            }
        }
    };


    const getAllTransactions = async () => {
        // const id = "645b9d022d7596d3d17ab579";
        const id = account._id;
        // console.log("account ID:", id)

        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3002/api/transactions/account/${id}`);
            if (response.status === 200) {
                const data = await response.data.transactions;
                setTransactions(prevTransactions => [...prevTransactions, ...data]);
            }            
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false);
            console.log(error);
            if (error.request.status === 404) {
                setTransactions([]); 
                console.log("Transaction not Found!");
            } else {
                setIsError(true);
            }
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user._id) {
            getAccount();
        }
    }, [
        user,
        transactions]);

    useEffect(() => {
        if (account._id) {
            getAllTransactions();
        }
    }, [account._id]);

    // if (isLoading) return (<div className="text-center mt-4">
    //     <div className="spinner-border text-primary" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //     </div>
    // </div>)
    if (isError) return (<h4>Some thing went wrong...</h4>)

    return (
        <UserContext.Provider value={{ user, getUser, getAccount, account, transactions, setTransactions }}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserState };
