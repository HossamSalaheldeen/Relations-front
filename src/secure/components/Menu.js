
import { NavLink } from "react-router-dom";

function Menu() {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/dashboard'}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/users'}>
                            Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/profile'}>
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/flights'}>
                            Flights
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

export default Menu;