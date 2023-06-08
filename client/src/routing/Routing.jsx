import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Transaction from '../pages/transaction/Transaction';
import Account from '../pages/account/Account';
import User from '../pages/user/User';
import About from '../pages/about/About';

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/user" element={<User />} />
                <Route
                    exact
                    path="/account"
                    element={<Account />}
                />
                <Route
                    exact
                    path="/transaction"
                    element={<Transaction key="transaction" />}
                />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default Routing; 