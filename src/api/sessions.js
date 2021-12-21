import { axiosInstance } from "./api";

export const sessionsAPI = {
    createSession(data) {
        return axiosInstance
            .post(`api/v1/sessions`, data)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },
};
