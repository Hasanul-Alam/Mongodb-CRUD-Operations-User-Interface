import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    // Delete an user
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            // console.log(url);
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User is successfully deleted.')
                    }
                    const remaining = users.filter(user => user._id !== id);
                    setUsers(remaining)
                })
        }
    }
    return (
        <div className='mt-3'>
            <h2>Total users: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id} className='mt-2 list-group-item'>
                        {user.name} || {user.email}
                        <Link to={`/users/update/${user._id}`}><button className='ms-2 btn btn-success'>Update</button></Link>
                        <button className='ms-1 btn btn-danger' onClick={() => handleDelete(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;