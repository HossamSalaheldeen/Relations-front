import './App.css';
import {
    BrowserRouter,
    Link,
    Route,
    Switch
} from "react-router-dom";
import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import RedirectToDashboard from "./secure/RedirectToDashboard";
import UserCreate from "./secure/users/UserCreate";
import Profile from "./secure/profile/Profile";
import ProfileCreate from "./secure/profile/ProfileCreate";
import UserEdit from "./secure/users/UserEdit";
import ProfileEdit from "./secure/profile/ProfileEdit";
import Flights from "./secure/flights/Flights";
import FlightCreate from "./secure/flights/FlightCreate";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <ToastContainer draggable={false} autoClose={8000}/>
        <BrowserRouter>
            <Switch>
            <Route path={'/'} exact component={RedirectToDashboard}/>
            <Route path={'/dashboard'} component={Dashboard}/>
            <Route path={'/users'} exact component={Users}/>
            <Route path={'/users/create'} component={UserCreate}/>
            <Route path={'/users/:id/edit'} component={UserEdit}/>
            <Route path='/profile'><Profile /></Route>
            <Route path={'/profiles/create'} component={ProfileCreate}/>
            <Route path={'/profiles/edit'} component={ProfileEdit}/>
            <Route path={'/flights'} exact component={Flights}/>
            <Route path={'/flights/create'} component={FlightCreate}/>
            <Route path={'/login'} component={Login}/>
            </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;
