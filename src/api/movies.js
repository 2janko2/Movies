import { axiosInstance } from "./api";

export const moviesAPI = {
    addMovie(data) {
        return axiosInstance
            .post(`api/v1/movies`, data)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },

    updateMovie(movieId) {
        return axiosInstance
            .patch(`api/v1/movies/${movieId}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },

    deleteMovie(movieId) {
        return axiosInstance
            .delete(`api/v1/movies/${movieId}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },

    getMovieById(movieId) {
        return axiosInstance
            .get(`api/v1/movies/${movieId}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },

    getMovieList(offset = 0, limit = 12, sort = "id", order = "ASC", title, actor) {
        let url = `api/v1/movies?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}`;
        if (title) url += `&title=${title}`;
        if (actor) url += `&actor=${actor}`;

        return axiosInstance
            .get(url)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },

    importMovies(data) {
        return axiosInstance
            .post(`api/v1/movies/import`, data)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) return error.response;
            });
    },
};
