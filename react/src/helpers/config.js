import axios from "axios";

const Config = () => {
    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });

    http.interceptors.request.use(
        config => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            console.log(error);
        }
    );
    // Add a response interceptor to handle errors
    http.interceptors.response.use(
        response => {
            // If the response status is between 200 and 299, return the response data as-is
            return response;
        },
        error => {
            throw error;
        }
    );

    return {
        http
    }
}

export default Config;

export const getToken = () => {
    return JSON.parse(sessionStorage.getItem('s-token'));
}

export const AuthTokenLoader = () => {
    const token = JSON.parse(sessionStorage.getItem('s-token'));
    const tokenDuration = getTokenDuration();
    if (!token) {
        return null;
    }
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
}

export const getTokenDuration = () => {
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');
    const expirationTime = new Date(tokenExpiration);
    const now = new Date();
    return expirationTime.getTime() - now.getTime();
}