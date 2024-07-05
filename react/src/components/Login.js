import {NavLink, useNavigate} from "react-router-dom";
import {Logo} from "./layouts/Logo";
import {useState} from "react";
import Config from "../helpers/config";
import {Base64} from "js-base64";
import Cookies from "js-cookie";
import {getFavProductFromCookie} from "./products/ProductConfig";

export const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordType, setPasswordType] = useState('password');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setPasswordType(preType => preType === 'text' ? 'password' : 'text');
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {http} = Config();
            const response = await http.post('login', JSON.stringify({
                email, password,
                favouriteProducts: getFavProductFromCookie()
            }));
            sessionStorage.setItem('s-token', JSON.stringify(response.data.token));
            sessionStorage.setItem('userId', JSON.stringify(Base64.encode(response.data.userId)));

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            sessionStorage.setItem('tokenExpiration', expiration.toISOString());
            Cookies.remove('favouriteProducts');

            navigate('/');
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            }
        }
    }
    return <>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="card mb-0">
                <div className="card-body">
                    <div className="text-center mb-3">
                        <Logo/>
                        <br/><br/>
                        <h5 className="mb-0">Login to Customer account</h5>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <button className="btn btn-light btn-icon" type="button"><i
                                    className="icon-user text-muted"></i></button>
                            </span>
                            <input id="email" type="email" className="form-control"
                                   onChange={e => setEmail(e.target.value)}
                                   name="email" placeholder="Email Address" autoFocus/>
                            {errors.hasOwnProperty('email') && <span className="invalid-feedback">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <button className="btn btn-light btn-icon" type="button"><i
                                    className="icon-lock2 text-muted"></i></button>
                            </span>
                            <input type={passwordType}
                                   className="form-control"
                                   onChange={e => setPassword(e.target.value)}
                                   placeholder="Password"/>
                            <span className="input-group-append">
                            <button className="btn btn-light" type="button" onClick={handlePasswordToggle}><i
                                className={passwordType === 'password' ? 'icon-eye' : 'icon-eye-blocked'}
                                id="togglePassword"></i></button>
                        </span>
                            {errors.hasOwnProperty('password') &&
                                <span className="invalid-feedback">{errors.password}</span>}
                        </div>
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <div className="form-check mb-0 form-check-home">
                            <NavLink to="/">Back to Home</NavLink>
                        </div>
                        <NavLink className="ml-auto" to=""> Forgot Password?</NavLink>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Login
                        </button>
                    </div>
                    <div className="form-group text-center text-muted content-divider">
                        <span className="px-2">Don't have an account?</span>
                    </div>

                    <div className="form-group">
                        <NavLink to="/register" className="btn btn-light btn-block">Sign up</NavLink>
                    </div>
                </div>
            </div>
        </form>
    </>
}