import {Form, NavLink, useRouteLoaderData} from "react-router-dom";
import {getCartProductFromCookie} from "../products/ProductConfig";
import {useSelector} from "react-redux";

export const CommonHeader = () => {
    const token = useRouteLoaderData('authCheck');
    const cartProducts = useSelector(state => state.cart.cartProducts);
    const totalProducts = cartProducts.reduce((totalNoOfProdcuts, products) => {
        return totalNoOfProdcuts + products.quantity;
    }, 0);

    return <ul className="navbar-nav">
        <NavLink to="/cart">
            <li className="nav-item position-relative">
                <img src="/assets/images/cart.png" className="pt-1" alt=""/>
                <span className="badge badge-pill ml-auto ml-md-0 cart_count">{totalProducts}</span>
            </li>
        </NavLink>
        <li className="nav-item dropdown dropdown-user">
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
    </ul>
}