import axios from "axios";

const shoppingCartApi = axios.create({
    baseURL: 'https://reactshop-backend-production.up.railway.app/api/cart'
   
});

shoppingCartApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('__x-Token__')
    }

    return config;
} )

export default shoppingCartApi;