import {CommonTab} from "./layouts/CommonTab";

export const TransactionHistory = () => {
    return <>
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
                <CommonTab/>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className="tab-pane fade show active" id="pills-Transaction-History" role="tabpanel"
                         aria-labelledby="pills-Transaction-History-tab">
                        <div className="col-lg-12">
                            <h6><span className="font-weight-500">Transaction History</span></h6>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                            <img src="/assets/images/empty.png"
                                 className="m-auto d-block" alt="" />
                                <h5 className="text-center no-products">You haven't placed any order yet!</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}