import {useRouteError} from "react-router-dom";
import {MasterLayout} from "./MasterLayout";
import {CommonTab} from "./CommonTab";

export const ErrorPage = () => {
    const errors = useRouteError();
    return <>
        <MasterLayout />
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
                <CommonTab/>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className="tab-pane fade show active" id="pills-Transaction-History" role="tabpanel"
                         aria-labelledby="pills-Transaction-History-tab">
                        <div className="col-lg-12">
                            <h6><span className="font-weight-500">{errors.status}</span></h6>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                            <h5 className="text-center no-products">{errors.statusText}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}