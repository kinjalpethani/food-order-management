import {CommonHeader} from "./CommonHeader";
import {NavLink} from "react-router-dom";
import {Logo} from "./Logo";

const Header = () => {
    return <>
        <div className="navbar navbar-expand-md navbar-light">
            <div className="navbar-brand">
                <NavLink to="/" className="d-inline-block">
                    <Logo/>
                </NavLink>
            </div>

            <div className="d-md-none">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                    <i className="icon-paragraph-justify3"></i>
                </button>
            </div>

            <div className="collapse navbar-collapse" id="navbar-mobile">
                <div className="form-group row ml-md-3 mr-md-auto col-lg-8">
                    <div className="col-lg-12">
                        <input type="search" className="form-control border-radius typeahead-basic"
                               placeholder="Search for Products"/>
                        <div className="form-control-feedback form-control-feedback-lg">
                            <i className="icon-search4 text-muted"></i>
                        </div>
                    </div>
                </div>
               <CommonHeader/>
            </div>
        </div>
    </>
}

export default Header;