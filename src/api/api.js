import axios from "axios";

import { API_URL } from "constants/constants";

const authHeader = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        return {
            Authorization: token,
        };
    }
};

const axiosInstance = axios.create({
    async: true,
    crossDomain: true,
    baseURL: API_URL,
    headers: authHeader(),
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers["Authorization"]) {
            const newHeader = authHeader();
            if (newHeader) config.headers = newHeader;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { axiosInstance };
