import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    const handleNameChange = event => {
        const updatedUser = {...user};
        updatedUser.name = event.target.value;
        setUser(updatedUser);
    }
    const handleEmailChange = event => {
        const updatedUser = {...user};
        updatedUser.email = event.target.value;
        setUser(updatedUser);
    }

    const handleUpdateUser = (event) => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('User is updated successfully.');
                setUser({});
            }
        })
        event.preventDefault();
    }
    return (
        <div className='mt-3'>
            <h2>Update: {user.name}</h2>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleUpdateUser}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" onChange={handleNameChange} value={user.name || ''}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmailChange} value={user.email || ''}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;