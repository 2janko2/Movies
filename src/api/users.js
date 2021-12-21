import { axiosInstance } from "./api";

export const usersAPI = {
    createUser(data) {
        return axiosInstance
            .post(`api/v1/users`, data)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },
};
