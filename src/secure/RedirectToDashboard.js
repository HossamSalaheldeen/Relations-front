import React from 'react';
import { Redirect } from "react-router-dom";
function RedirectToDashboard() {
    return (
        <Redirect to={'dashboard'}/>
    );
}

export default RedirectToDashboard;