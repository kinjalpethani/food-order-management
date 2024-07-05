import {Outlet} from "react-router-dom";
import useDynamicAssets from "../../hooks/use-dynamic-assets";

export const LoginLayout = () => {
    useDynamicAssets('/assets/css/custom.css');
    return <>
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content d-flex justify-content-center align-items-center mt-5">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>
}