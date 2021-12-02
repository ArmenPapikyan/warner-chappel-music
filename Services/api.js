import axios from 'axios';
//https://node-proxy-server-express.herokuapp.com/ for heroku
//http://localhost:8000/ for localhost 8000 u must setup local proxy server
const instance = axios.create({
    baseURL: 'https://node-proxy-server-express.herokuapp.com'
});
export default instance;