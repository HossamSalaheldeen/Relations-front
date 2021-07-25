import React, { useState, useEffect } from 'react';
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import axios from "axios";


function Users() {

    let [users,setUsers] = useState([]);

    useEffect(() => {
        axios.get('users',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(usersSuccessResponse => {
            console.log("usersSuccessResponse = ", usersSuccessResponse);
            let users = usersSuccessResponse.data;
            setUsers(users);
        }).catch(usersFailResponse => {
            console.log("usersFailResponse = ", usersFailResponse);
        })
    },[]);

    const deleteUser = (id) => {
        axios.delete(`users/${id}`).then(userDeleteSuccessResponse => {

            setUsers(users.filter(user => user.id !== id));

        }).catch(userDeleteFailResponse => {
            console.log("userDeleteFailResponse = ",userDeleteFailResponse.response.data);
        });
    }
    return (
        <Wrapper>
            <h2>Users</h2>
            <div className="mb-3">
                <Link to={'/users/create'} className="btn btn-primary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.length === 0 ? (<div className='alert alert-danger'>No users</div>) : (
                            <React.Fragment>
                                {
                                    users.map( user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Link to={`users/${user.id}/edit`} className='btn btn-dark'>Edit</Link>
                                                    <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </React.Fragment>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
}

export default Users;