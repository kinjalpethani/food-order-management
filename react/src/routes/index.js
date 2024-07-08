import {createBrowserRouter} from "react-router-dom";
import {Dashboard} from "../components/Dashboard";
import {Profile} from "../components/Profile";
import {MasterLayout} from "../components/layouts/MasterLayout";
import {TransactionHistory} from "../components/TransactionHistory";
import {ErrorPage} from "../components/layouts/ErrorPage";
import {FavouriteProducts} from "../components/FavouriteProducts";
import {Login} from "../components/Login";
import {action as LogoutAction} from "../components/Logout";
import {LoginLayout} from "../components/layouts/LoginLayout";
import {Register} from "../components/register/Register";
import {AuthTokenLoader} from "../helpers/config";
import {Cart} from "../components/Cart";

const Routing = createBrowserRouter([
    {
        path: '/',
        element: <MasterLayout/>,
        errorElement: <ErrorPage/>,
        id: 'authCheck',
        loader: AuthTokenLoader,
        children: [
            {index: true, element: <Dashboard/>},
            {path: '/profile', element: <Profile/>},
            {path: '/history', element: <TransactionHistory/>},
            {path: '/favourite', element: <FavouriteProducts/>},
            {path: '/cart', element: <Cart/>},
            {path: '/logout', action: LogoutAction},
        ],
    },
    {
        path: '/',
        element: <LoginLayout/>,
        children: [
            {path: '/login', element: <Login/>},
            {path: '/register', element: <Register/>}
        ]
    }
])

export default Routing;