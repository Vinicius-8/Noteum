import axios from 'axios'
//http://noteum-backend-production.herokuapp.com
const api = axios.create({
    baseURL: 'http://192.168.0.101:8000'
});

export default api;