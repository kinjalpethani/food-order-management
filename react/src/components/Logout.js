import {redirect} from "react-router-dom";

export const action = () => {
    sessionStorage.removeItem('s-token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tokenExpiration');
    return redirect('/');
}