import React from 'react';
import {Link} from "react-router-dom";
import Wrapper from "../Wrapper";

function Flights() {
    return (
        <Wrapper>
            <h2>Flights</h2>
            <div className="mb-3">
                <Link to={'/flights/create'} className="btn btn-primary">Create</Link>
            </div>
        </Wrapper>
    );
}

export default Flights;