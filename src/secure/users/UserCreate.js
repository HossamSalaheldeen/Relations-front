import React , { useState, useMemo, useContext} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";

const userContext=React.createContext();
function UserCreate() {

    let [gname,setGname]=useState([]);
    let [gemail,setGemail]=useState([]);
    let [gpassword,setGpassword]=useState([]);


    let value = useMemo(() => ({
        gname, setGname,
        gemail, setGemail,
        gpassword, setGpassword,
    }), [gname,gemail,gpassword]);

    let [numChildren,setNumChildren] = useState(1);

    const children = [];

    for (var i = 0; i < numChildren; i += 1) {

        children.push(<ChildComponent key={i} number={i}/>);
    };

    const onAddChild = () => {
        setNumChildren(numChildren + 1);
    }

    const onRemoveChild = () => {
        setNumChildren(numChildren - 1);
        setGname(gname.splice(-1,1));
        setGemail(gname.splice(-1,1));
        setGpassword(gpassword.splice(-1,1));
    }

    const submit = () => {
        let userCreateBodyData = {
            name: gname,
            email: gemail,
            password: gpassword
        }

        console.log("userCreateBodyData = ",userCreateBodyData);

        axios.post('users',userCreateBodyData).then(userCreateSuccessResponse => {

            console.log("userCreateSuccessResponse = ",userCreateSuccessResponse);

        }).catch(userCreateFailResponse => {
            console.log("userCreateFailResponse = ",userCreateFailResponse);
        });
    }

    return (
        <Wrapper>
            <h2>Add new user</h2>
            <userContext.Provider value={value}>
                <ParentComponent addChild={onAddChild} onRemoveChild={onRemoveChild}>
                    {children}
                </ParentComponent>
                <div className='mt-5'>
                <button className="btn btn-primary" onClick={submit}>Submit</button>
                </div>
            </userContext.Provider>
        </Wrapper>
    );
}


const ParentComponent = (props) => {
    const {gname,setGname} = useContext(userContext);
    return (
            <React.Fragment>

                    <div id="children-pane">
                        {props.children}
                    </div>
                    <button className="btn btn-primary" onClick={props.addChild}>Add Another User</button>
                    {
                        props.children.length > 1 ? (
                            <button className="btn btn-primary ml-3" onClick={props.onRemoveChild}>Delete</button>) : ("")
                    }
            </React.Fragment>
        )
}

const ChildComponent = (props) => {
    const {gname,setGname} = useContext(userContext);
    const {gemail,setGemail}=useContext(userContext);
    const {gpassword,setGpassword}=useContext(userContext);

    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    return (
        <React.Fragment>
        <form>
            <div className="form-group">
                <label htmlFor="inputName" className="sr-only">Name</label>
                <input type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus
                       onChange={(e) => setName(e.target.value)}
                       onBlur={() => setGname([gname[props.number], name])}
                />
            </div>

            <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                       onChange={(e)=> setEmail(e.target.value)}
                       onBlur={() => setGemail([gemail[props.number], email])}
                />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                       onChange={(e)=> setPassword(e.target.value)}
                       onBlur={() => setGpassword([gpassword[props.number], password])}
                />
            </div>
        </form>
            <hr/>
        </React.Fragment>
        )
}

export default UserCreate;