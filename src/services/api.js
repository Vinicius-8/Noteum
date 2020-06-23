import axios from 'axios'
//http://noteum-backend-production.herokuapp.com
//http://192.168.0.101:8000
const api = axios.create({
    baseURL: 'http://noteum-backend-production.herokuapp.com:80'
});

export default api;