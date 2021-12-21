import axios from "axios";

const api = axios.create({
    // http://viacep.com.br/ws/82515000/json/
    baseURL: "https://viacep.com.br/ws/"
});

export default api;