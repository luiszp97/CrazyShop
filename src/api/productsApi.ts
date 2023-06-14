import axios from "axios";

const productsApi = axios.create({
    baseURL: 'https://reactshop-backend-production.up.railway.app/api/products'
   
});

productsApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('__x-Token__')
    }

    return config;
} )

export default productsApi;