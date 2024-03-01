import React, { useRef } from 'react';

const AddUser = () => {

    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = (event) => {
        event.preventDefault();
        
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = {name, email};

        fetch('http://localhost:5000/users', {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert('Successfully added the user.');
                event.target.reset();
            }
        })
    }
    return (
        <div>
            <h2 className='mt-3'>Please add an user</h2>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleAddUser}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" ref={nameRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" ref={emailRef}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;