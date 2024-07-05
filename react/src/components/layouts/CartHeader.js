import {NavLink} from "react-router-dom";
import {CommonHeader} from "./CommonHeader";
import {Logo} from "./Logo";

export const CartHeader = () => {
    return <>
        <div className="navbar navbar-expand-md navbar-light">
            <div className="navbar-brand">
                <NavLink to="/" className="d-inline-block">
                    <img src="/assets/images/back.png" alt="" className="p-1"/>
                    <Logo className="p-1 show-in-mobile"/>
                </NavLink>
            </div>
            <div className="d-md-none">
                <button className="navbar-toggler position-relative pt-3" type="button" data-toggle="collapse"
                        data-target="#navbar-mobile">
                    <i className="icon-paragraph-justify3"></i>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-mobile">
                <div className="form-group row ml-md-3 mr-md-auto col-lg-8">
                    <div className="col-lg-12">
                        <NavLink to="/">
                            <img src="/assets/images/portal-logo_new-Size.png"
                                 className="m-auto  hide-in-mobile" alt=""/>
                        </NavLink>
                    </div>
                </div>
                <ul className="navbar-nav">
                    <NavLink to="{{ route('cartList">
                        <li className="nav-item position-relative">
                            <img src="/assets/images/cart.png" className="pt-1" alt=""/>
                            <span className="badge badge-pill ml-auto ml-md-0 cart_count">0</span>
                        </li>
                    </NavLink>
                    <CommonHeader/>
                </ul>
            </div>
        </div>
    </>
}