import React, { useState, useEffect }from 'react';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import { Redirect } from "react-router-dom";
function Wrapper(props) {
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
            console.log("userFailResponse = ", userFailResponse);
            setRedirect(true);
        })
    },[]);


    if(redirect) {
        return (
            <Redirect to="/login" />
            );
    }

    return (
        <>

            {Object.keys(user).length === 0 ? (<span>loading.........</span>) : (
                <React.Fragment>
                    <Nav/>
                    <div className="container-fluid">
                        <div className="row">
                            <Menu/>
                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            {props.children}
                            </main>
                        </div>
                    </div>
                </React.Fragment>
                )}
        </>
    );
}

export default Wrapper;