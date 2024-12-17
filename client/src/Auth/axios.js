import axios from 'axios';
import { getCookie } from "../utils.js";
import { jwtDecode } from "jwt-decode";


const baseURL = 'http://localhost:3000/api/';
export const axiosJWT = axios.create({baseURL})

axios.interceptors.request.use(async (config) => {
    const date = new Date();
    const token = getCookie('auth'); // Fetches the auth cookie

    if (!token) return config; // If no token, proceed with the request as-is

    const decodedToken = jwtDecode(token); // Decode the token to extract its expiration time
    if (decodedToken.exp * 1000 < date.getTime()) {
        await refresh(); // If token is expired, refresh it
    }

    config.headers.authorization = `BEARER ${getCookie('auth')}`; // Add the valid token to the request headers
    return config;
}, err => Promise.reject(err));

async function refresh(){
    const token = getCookie('ref')
    const data = {token}
    await axios.post(base+"auth/refresh",data)
    .then(res => {
    document.cookie = `auth=${res.data.accessToken}`;
    document.cookie = `ref=${res.data.refreshToken}`;
    })
    .catch(err => {
        console.log(err)
        document.cookie = `auth= ;`
        document.cookie = `token= ;`
    })
}
