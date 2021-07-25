import React , {useState} from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import './Public.css';

function Login() {
    let [redirect,setRedirect] = useState(false);
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let loginBodyData = {
            email : email,
            password: password
        }

        console.log("loginBodyData = ",loginBodyData);

        axios.post('login',loginBodyData).then(loginSuccessResponse => {

            console.log("loginSuccessResponse = ",loginSuccessResponse);
            let token = loginSuccessResponse.data.token;
            localStorage.clear();
            localStorage.setItem('jwt',token);
            setRedirect(true);
        }).catch(loginFailResponse => {
            console.log("loginFailResponse = ",loginFailResponse);
            //setRedirect(true);
        });
    }

    if(redirect) {
        return (
            <Redirect to="/dashboard" />
        );
    }
    return (
        <div className="text-center login">
            <form className="form-signin" onSubmit={submit}>

                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus
                       onChange={(e)=> setEmail(e.target.value)}
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                       onChange={(e)=> setPassword(e.target.value)}
                />

                <button className="btn btn-primary btn-block btn-flat" type="submit">Sign in</button>
            </form>

        </div>
    );
}

export default Login;