import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

export const CommonHeader = () => {
    const token = useRouteLoaderData('authCheck');
    return <li className="nav-item dropdown dropdown-user">
        <span className="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
            <img src='/assets/images/user.png' className="rounded-circle" alt=""/>
        </span>
        <div className="dropdown-menu dropdown-menu-right">
            {token && <NavLink to="/profile" className="dropdown-item">My profile</NavLink>}
            {token && <NavLink to="/chnage" className="dropdown-item">Change Password</NavLink>}
            {!token && <NavLink to="/login" className="dropdown-item">Login/Register</NavLink>}
            {token &&
                <Form method="post" action="/logout">
                    <button className="dropdown-item">Logout</button>
                </Form>
            }
            <NavLink to="/history" className="dropdown-item">Transaction History</NavLink>
        </div>
    </li>
}