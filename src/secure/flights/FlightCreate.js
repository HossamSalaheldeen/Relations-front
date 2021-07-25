import React , { useState, useMemo, useContext} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {toast} from "react-toastify";

const successToast = () => {
    toast.success("success",{
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
}

const errorToast = () => {
    toast.error("Error",{
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
}

const flightContext=React.createContext();
function FlightCreate() {
    let initialFlight = {
        flights:[]
    }
    let [newFlight,setNewFlight]=useState(initialFlight);
    let [errors,setErrors] = useState({});
    let [allErrors,setALLErrors] = useState([]);
    let [nameErrors,setNameErrors] = useState([]);
    let [fromCountryErrors,setFromCountryErrors] = useState([]);
    let [toCountryErrors,setToCountryErrors] = useState([]);
    let [numChildren,setNumChildren] = useState(1);

    let value = useMemo(() => ({
        newFlight,setNewFlight,
        numChildren,setNumChildren,
        errors,
        nameErrors,
        fromCountryErrors,
        toCountryErrors,
    }), [newFlight,numChildren,errors,nameErrors,fromCountryErrors,toCountryErrors]);



    const children = [];

    const onAddChild = () => {
        setNumChildren(numChildren + 1);
    }

    const onRemoveChild = (index) => {

        let newArray = newFlight.flights.slice()
        newArray.splice(index, 1);
        setNewFlight({
            ...newFlight,
            flights: newArray
        })
        setNumChildren(numChildren - 1);
    }

    for (var i = 0; i < numChildren; i += 1) {

        children.push(<ChildComponent key={i} number={i} removeChild={onRemoveChild} childrenLength={numChildren}/>);

    };

    const submit = () => {

        let flightCreateBodyData = {
            flights: newFlight.flights
        }

        let config = {
            headers: {
                Accept: 'application/json'
            }
        }

        axios.post('flights',flightCreateBodyData,config).then(flightCreateSuccessResponse => {

            console.log("flightCreateSuccessResponse = ",flightCreateSuccessResponse.data);
            successToast();

        }).catch(flightCreateFailResponse => {
            console.log("userCreateFailResponse = ",flightCreateFailResponse.response.data.errors);
            setErrors(flightCreateFailResponse.response.data.errors);
            setALLErrors(flightCreateFailResponse.response.data.errors.flights);
            var nameKeys = Array();
            Object.keys(flightCreateFailResponse.response.data.errors).map((key, index) => {

                if(key.includes(`.name`))
                {
                    nameKeys[parseInt(key[8])] = key;
                }
            });
            setNameErrors(nameKeys);
            var fromCountryKeys = Array();
            Object.keys(flightCreateFailResponse.response.data.errors).map((key, index) => {

                if(key.includes(`.fromCountry`))
                {
                    fromCountryKeys[parseInt(key[8])] = key;
                }
            });
             setFromCountryErrors(fromCountryKeys);
            var toCountryKeys = Array();
            Object.keys(flightCreateFailResponse.response.data.errors).map((key, index) => {

                if(key.includes(`.toCountry`))
                {
                    toCountryKeys[parseInt(key[8])] = key;
                }
            });
             setToCountryErrors(toCountryKeys);
            errorToast();
        });
    }

    return (
        <Wrapper>
            {/*<ToastContainer draggable={false} autoClose={8000}/>*/}
            <h2>Add new flight</h2>
            {/*<form>*/}
                <section>
                    <div className="panel panel-footer">
                        {allErrors ? allErrors.length > 0 ? (<div className='alert alert-danger'>All fields are required</div>) : "" : ""}
                        <table className="table table-bordered">
                            <flightContext.Provider value={value}>
                                <ParentComponent addChild={onAddChild} >
                                    {children}
                                </ParentComponent>
                            </flightContext.Provider>
                            <tfoot>
                            <tr>
                                <td style={{border: 'none'}}></td>
                                <td style={{border: 'none'}}></td>
                                <td style={{border: 'none'}}></td>
                                <td><button className="btn btn-success" onClick={submit}>Submit</button></td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            {/*</form>*/}
        </Wrapper>
    );
}

const ParentComponent = (props) => {

    return (
        <React.Fragment>
            <thead>
            <tr>
                <th>Name</th>
                <th>From</th>
                <th>To</th>
                <th><button className="btn btn-primary" onClick={props.addChild}>+</button></th>
            </tr>
            </thead>
            {props.children}

        </React.Fragment>
    )
}

const ChildComponent = (props) => {
    const {newFlight,setNewFlight,numChildren,errors,nameErrors,fromCountryErrors,toCountryErrors} = useContext(flightContext);
    let [name,setName] = useState("");
    let [fromCountry,setFormCountry] = useState("");
    let [toCountry,setToCountry] = useState("");

    var validationNameErrors;
    validationNameErrors =   errors[nameErrors[props.number]] ? (<ul className="alert alert-danger">
        {
            errors[nameErrors[props.number]].map(function(err,index) { return <li key={index}>{err}</li>})
        }
    </ul>) : "";

    var nameErrorsElement;
    nameErrorsElement = errors[nameErrors[props.number]] ? (errors[nameErrors[props.number]].length > 0) ? validationNameErrors: "" : "";

    var validationFromCountryErrors;
    validationFromCountryErrors =   errors[fromCountryErrors[props.number]] ? (<ul className="alert alert-danger">
        {
            errors[fromCountryErrors[props.number]].map(function(err,index) { return <li key={index}>{err}</li>})
        }
    </ul>) : "";

    var fromCountryErrorsElement;
    fromCountryErrorsElement = errors[fromCountryErrors[props.number]] ? (errors[fromCountryErrors[props.number]].length > 0) ? validationFromCountryErrors: "" : "";

    var validationtoCountryErrors;
    validationtoCountryErrors =   errors[toCountryErrors[props.number]] ? (<ul className="alert alert-danger">
        {
            errors[toCountryErrors[props.number]].map(function(err,index) { return <li key={index}>{err}</li>})
        }
    </ul>) : "";

    var toCountryErrorsElement;
    toCountryErrorsElement = errors[toCountryErrors[props.number]] ? (errors[toCountryErrors[props.number]].length > 0) ? validationtoCountryErrors: "" : "";

    return (
        <React.Fragment>
            <tbody>
            <tr>
                <td>
                    <input type="text" className="form-control" placeholder="Name"
                           onChange={(e) => {
                               setName(e.target.value);
                               if(props.number > newFlight.flights.length - 1) {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: [
                                           ...newFlight.flights.slice(0, props.number),
                                           {name:e.target.value, fromCountry:fromCountry, toCountry:toCountry},
                                           ...newFlight.flights.slice(props.number)
                                       ]
                                   })
                               }else {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: newFlight.flights.map((item, index) => {
                                           if (index !== props.number) {
                                               // This isn't the item we care about - keep it as-is
                                               return item
                                           }

                                           // Otherwise, this is the one we want - return an updated value
                                           return {
                                               ...item,
                                               ...{name:e.target.value, fromCountry:fromCountry, toCountry:toCountry}
                                           }
                                       })
                                   })
                               }

                           }}

                />
                    {nameErrorsElement}
                </td>
                <td>
                    <input type="text" className="form-control" placeholder="From"
                           onChange={(e) => {
                               setFormCountry(e.target.value)
                               if(props.number > newFlight.flights.length - 1) {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: [
                                           ...newFlight.flights.slice(0, props.number),
                                           {name:name, fromCountry:e.target.value, toCountry:toCountry},
                                           ...newFlight.flights.slice(props.number)
                                       ]
                                   })
                               }else {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: newFlight.flights.map((item, index) => {
                                           if (index !== props.number) {
                                               // This isn't the item we care about - keep it as-is
                                               return item
                                           }

                                           // Otherwise, this is the one we want - return an updated value
                                           return {
                                               ...item,
                                               ...{name:name, fromCountry:e.target.value, toCountry:toCountry}
                                           }
                                       })
                                   })
                               }
                           }}
                />
                    {fromCountryErrorsElement}
                </td>
                <td>
                    <input type="text" className="form-control" placeholder="To"
                           onChange={(e) => {
                               setToCountry(e.target.value)
                               if(props.number > newFlight.flights.length - 1) {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: [
                                           ...newFlight.flights.slice(0, props.number),
                                           {name:name, formCountry:fromCountry, toCountry:e.target.value},
                                           ...newFlight.flights.slice(props.number)
                                       ]
                                   })
                               }else {
                                   setNewFlight({
                                       ...newFlight,
                                       flights: newFlight.flights.map((item, index) => {
                                           if (index !== props.number) {
                                               // This isn't the item we care about - keep it as-is
                                               return item
                                           }

                                           // Otherwise, this is the one we want - return an updated value
                                           return {
                                               ...item,
                                               ...{name:name, fromCountry:fromCountry, toCountry:e.target.value}
                                           }
                                       })
                                   })
                               }
                           }}
                />
                    {toCountryErrorsElement}
                </td>
                <td>
                    {
                        props.number === numChildren - 1 &&  props.number !== 0 ? (
                            <button  className="btn btn-danger" onClick={() => props.removeChild(props.number)}>x</button>)
                            : ("")
                    }
                </td>
            </tr>
            </tbody>
        </React.Fragment>
    )
}

export default FlightCreate;