import React, {useState, useEffect} from 'react';
import Wrapper from "../Wrapper";
import {
    Link,
    Route,
    Redirect,
    useRouteMatch,
    useParams
} from 'react-router-dom'
import PersonalInfo from "./routes/PersonalInfo";
import PassportInfo from "./routes/PassportInfo";
import VisaInfo from "./routes/VisaInfo";


const topics = [
    {
        name: 'React Router',
        id: 'react-router',
        description: <PersonalInfo/>,

    },
    {
        name: 'React.js',
        id: 'reactjs',
        description: <PassportInfo/>,

    },
    {
        name: 'Functional Programming',
        id: 'functional-programming',
        description: <VisaInfo/>,

    }
]

function Topic() {
    const { topicId } = useParams()
    const { url, path } = useRouteMatch()

    const topic = topics.find(({ id }) => id === topicId)

    return (
        <div>
            <h2>{topic.name}</h2>
            <p>{topic.description}</p>

        </div>
    )
}



function Profile() {
    const { url, path } = useRouteMatch()
    console.log(path);
    return (
        <Wrapper>
            <h2>Profile</h2>
            <div className="mb-3">
                <Link to={'/profiles/create'} className='btn btn-primary'>Create</Link>
                <Link to={'/profiles/edit'} className='btn btn-primary'>Edit</Link>
            </div>
        <div>
            <ul>
                {topics.map(({ name, id }) => (
                    <li key={id}>
                        <Link to={`${url}/${id}`}>{name}</Link>
                    </li>
                ))}
            </ul>

            <hr />
            <Redirect to={'profile/react-router'}/>
            <Route path={`${path}/:topicId`}>
                <Topic />
            </Route>
        </div>
        </Wrapper>
    );
}

export default Profile;