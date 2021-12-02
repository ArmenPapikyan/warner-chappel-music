import axios from 'axios';
//https://node-proxy-server-express.herokuapp.com/
const instance = axios.create({
    baseURL: 'https://node-proxy-server-express.herokuapp.com'
});
export default instance;