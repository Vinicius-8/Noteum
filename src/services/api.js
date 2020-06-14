import axios from 'axios'
//http://http://noteum-backend-production.herokuapp.com:80
const api = axios.create({
    baseURL: 'http://noteum-backend-production.herokuapp.com'
});

export default api;