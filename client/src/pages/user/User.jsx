import React, { useState, useContext } from 'react'
import { UserContext } from "../../context/user"
import axios from 'axios'



const User = () => {

    const [file, setFile] = useState(null);

    const context = useContext(UserContext);
    const { user, getUser } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(file)
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            // const formDataObject = Object.fromEntries(formData.entries());
            // console.log(formDataObject);
            try {
                await axios.put(`http://localhost:3002/api/users/${user._id}`, formData);
                // When new image uploaded again call getUser() function to update image.
                getUser();
            } catch (error) {
                console.log(error)
            }
        };
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
        <>
            {
                user.image &&
                <img src={`http://localhost:3002/public/users/images/${user.image}`} className="rounded-circle img-fluid  mx-auto d-block shadow-4" style={{ width: "200px", height: "200px" }}
                    alt="Avatar" />
            }

            <div className="container">
                <div className="container my-3 col-md-3">
                    <div className="mb-2">
                        <form onSubmit={handleSubmit}>
                            <strong> <label htmlFor="image" className="form-label"> {user.image ? "Edit" : "Upload"} picture</label> </strong>
                            <input className="form-control" type="file" id="image" name="image" onChange={handleFileChange} />
                            <button type="submit" className="btn btn-primary my-2 w-100">Upload</button>
                        </form>
                    </div>
                </div>
                <hr />
                <h3> User Detail</h3>
                <div className="card mb-5">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Name: <strong>{user.firstName} {user.lastName}</strong> <br />
                            Email: <strong>{user.email}</strong> <br />
                            Contact No: <strong>{user.mobileNumber}</strong><br />

                        </li>
                    </ul>
                </div>
            </div>

        </>
    );

}

export default User;
