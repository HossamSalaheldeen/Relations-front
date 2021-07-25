import React, {useState, useEffect} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";

function UserEdit(props) {
    let id = props.match.params.id;
    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [nameErrors,setNameErrors] = useState([]);
    let [emailErrors,setEmailErrors] = useState([]);
    let [passwordErrors,setPasswordErrors] = useState([]);

    useEffect(() => {
        console.log("nameErrors = ", nameErrors.length );
            axios.get(`users/${id}`).then(userShowSuccessResponse => {
                    console.log("userShowSuccessResponse = ",userShowSuccessResponse);
                    setName(userShowSuccessResponse.data.name);
                    setEmail(userShowSuccessResponse.data.email)
                }).catch(userShowFailResponse => {
                console.log("userShowFailResponse = ",userShowFailResponse);

            });
    },[]);

    const submit = (e) => {
        e.preventDefault();
        let userEditBodyData = {
            name:  name,
            email: email,
            password: password
        }

        console.log("userEditBodyData = ",userEditBodyData);

        axios.put(`users/${id}`,userEditBodyData).then(userEditSuccessResponse => {

            console.log("userEditSuccessResponse = ",userEditSuccessResponse);

        }).catch(userEditFailResponse => {
            console.log("userEditFailResponse = ",userEditFailResponse.response.data);
            setNameErrors(userEditFailResponse.response.data.errors.name);
            setEmailErrors(userEditFailResponse.response.data.errors.email);
            setPasswordErrors(userEditFailResponse.response.data.errors.password);
        });
    }


    var validationNameErrors;
    validationNameErrors =   nameErrors ? (<ul className="alert alert-danger">
        {nameErrors.map(function(err,index) { return <li key={index}>{err}</li>})}
    </ul>) : "";

    var nameErrorsElement;
    nameErrorsElement = nameErrors ? (nameErrors.length > 0) ? validationNameErrors: "" : "";


    var validationEamilErrors;
    validationEamilErrors =  emailErrors  ? (<ul className="alert alert-danger">
        {emailErrors.map(function(err,index) { return <li key={index}>{err}</li>})}
    </ul>) : "";

    var emailErrorsElement;
    emailErrorsElement =emailErrors ? (emailErrors.length > 0) ? validationEamilErrors: "" : "";


    var validationPasswordErrors;
    validationPasswordErrors =  passwordErrors ? (<ul className="alert alert-danger">
        {passwordErrors.map(function(err,index) { return <li key={index}>{err}</li>})}
    </ul>) : "";

    var passwordErrorsElement;
    passwordErrorsElement =passwordErrors ? (passwordErrors.length > 0) ? validationPasswordErrors: "" : "";


    return (
        <Wrapper>
            <form className='mt-3'  onSubmit={submit}>

                <div className="form-group">
                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input type="text" id="inputName" className="form-control" placeholder="Name"  autoFocus
                           defaultValue={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    {nameErrorsElement}
                </div>

                <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                           defaultValue={email}
                           onChange={(e)=> setEmail(e.target.value)}
                    />
                    {emailErrorsElement}
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           onChange={(e)=> setPassword(e.target.value)}
                    />
                    {passwordErrorsElement}
                </div>
                <button className='btn btn-success' type='submit'>Update</button>
            </form>
        </Wrapper>
    );
}

export default UserEdit;