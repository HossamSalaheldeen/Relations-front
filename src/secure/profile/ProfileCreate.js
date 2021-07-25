import React from 'react';
import axios from "axios";
import Wrapper from "../Wrapper";
import ProfileForm from "./Forms/ProfileForm";
import PassportForm from "./Forms/PassportForm";
import VisaForm from "./Forms/VisaForm";

function ProfileCreate() {
    return (
        <Wrapper>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-secondary">1</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-secondary">2</button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-secondary">3</button>
                    </div>
                </div>

                <ProfileForm/>
                <PassportForm/>
                <VisaForm/>
            </div>
        </Wrapper>

    );
}

export default ProfileCreate;