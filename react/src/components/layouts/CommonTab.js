import {NavLink} from "react-router-dom";

export const CommonTab = () => {
    return <>
        <div className="col-lg-3 col-md-3 col-sm-12 border-right">
            <div className="profile -menu pt-2">
                <ul className="nav nav-pills mb-3" id="pills-tab">
                    <li className="nav-item">
                        <NavLink className="nav-link"
                                 to="/favourite">
                            <div className="mr-2 icon-div"><img
                                src="/assets/images/favourite.png"
                                alt=""/></div>
                            Favourites
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link"
                                 to="/history">
                            <div className="mr-2 icon-div"><img
                                src="/assets/images/transaction_history.png" alt="" /></div>
                            Transaction History
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </>
}