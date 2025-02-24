import axios from "axios";

const Axios = axios.create({
    baseURL: `http://localhost:6969`,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    }
})

export default Axios;