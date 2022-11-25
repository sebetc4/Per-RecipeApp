import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response.data === 'Invalid token') {
            console.log(err);
        }
        return Promise.reject(err);
    }
);

export default api;
