import axios from 'axios';
//https://node-proxy-server-express.herokuapp.com/
const instance = axios.create({
    baseURL: 'http://localhost:8000'
});
export default instance;