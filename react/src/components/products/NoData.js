export const NoData = (props) => {
    return <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
        <img src="/assets/images/empty.png" className="m-auto d-block" alt=""/>
        <h5 className="text-center no-products">{props.children}</h5>
    </div>
}