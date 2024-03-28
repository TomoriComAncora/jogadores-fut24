import axios from "axios";

const api = axios.create({
    baseURL: 'https://drop-api.ea.com/'
});

export default api;