import React, { useState, useEffect }from 'react';
import { Link, NavLink, Redirect} from "react-router-dom";
import axios from "axios";
function Nav() {
    let [user,setUser] = useState({});
    let [redirect,setRedirect] = useState(false);

    useEffect(() => {
        axios.get('user',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(userSuccessResponse => {
            console.log("userSuccessResponse = ", userSuccessResponse);
            let currentUser = userSuccessResponse.data;
            setUser(currentUser);
        }).catch(userFailResponse => {
            console.log("userFailResponse = ", userFailResponse.response.data);
            setRedirect(true);
        })
    },[]);

    const logout = () => {

            axios.post('logout',{},{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
                }).then(logoutSuccessResponse => {
                console.log("logoutSuccessResponse = ", logoutSuccessResponse);
                localStorage.clear();
                setRedirect(true);
            }).catch(logoutFailResponse => {
                console.log("logoutFailResponse = ", logoutFailResponse);

            })

    }

    if(redirect) {
        return (
            <Redirect to="/login" />
        );
    }
    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to={'/'}>Company name</Link>
                <ul className="my-2 my-md-0 mr-md-3">

                        <NavLink className="p-2" to={'/profile'}>{user.name}</NavLink>

                        <NavLink className="p-2" onClick={logout} to={'/login'}>Sign out</NavLink>

                </ul>
        </nav>
    );
}

export default Nav;