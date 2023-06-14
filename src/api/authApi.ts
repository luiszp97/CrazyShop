import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://reactshop-backend-production.up.railway.app/api/auth'
   
});

authApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('__x-Token__')
    }

    return config;
} )

export default authApi;

