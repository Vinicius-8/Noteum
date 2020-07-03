import axios from 'axios'
//baseURL: 'http://noteum-backend-production.herokuapp.com:80'
const api = axios.create({
	baseURL: 'http://192.168.0.101:8000'
});

export default api;