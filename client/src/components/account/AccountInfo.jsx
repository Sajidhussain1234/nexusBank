import React, { useContext } from 'react'
import { UserContext } from "../../context/user"

const AccountInfo = () => {
    const context = useContext(UserContext);
    const { account } = context;

    return (
        <div className='container mb-5'>
            <h3> Account Detail</h3>
            <div className="card" >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Account id:  <strong> {account._id} </strong> <br />
                        Account Number:<strong> {account.accountNumber} </strong> <br />
                        Balance:<strong> {account.balance} </strong>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AccountInfo;



