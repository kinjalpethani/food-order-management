import {Outlet, useLoaderData, useLocation, useSubmit} from "react-router-dom";
import {useEffect, useState} from 'react';
import Header from "./Header";
import {CartHeader} from "./CartHeader";
import useDynamicAssets from "../../hooks/use-dynamic-assets";
import {getTokenDuration} from "../../helpers/config";

export const MasterLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    const [logoutKey, setLogoutKey] = useState(false);

    useEffect(() => {
        if (!token) {
            //on logout same page re-rendering
            setLogoutKey(prevKey => !prevKey);
            return;
        }
        if (token === 'EXPIRED') {
            submit(null, {action: '/logout', method: "post"});
            return;
        }
        const duration = getTokenDuration();

        const timeoutId = setTimeout(() => {
            submit(null, {action: '/logout', method: "post"});
        }, duration);
        return (() => clearTimeout(timeoutId));
    }, [token, submit]);

    useDynamicAssets('/assets/css/customer-custom.css');
    const location = useLocation();
    let defaultHeader = <CartHeader/>;
    if (location.pathname === '/') {
        defaultHeader = <Header/>;
    }

    return <div key={logoutKey}>
        {defaultHeader}
        <div className="page-content product-page">
            <div className="content-wrapper">
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
}