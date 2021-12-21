import { moviesAPI } from "api/movies";
import { DEFAULT_ERROR_MESSAGE } from "constants/constants";

const IS_LOADING = "movies/movies/IS_LOADING";
const SET_MOVIE_LIST = "movies/movies/SET_MOVIE_LIST";
const SET_CURRENT_MOVIE = "movies/movies/SET_CURRENT_MOVIE";
const SET_ERROR = "movies/auth/SET_ERROR";

let initialState = {
    isLoading: false,
    movieList: [],
    currentMovie: null,
    error: null,
};

const movies = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, isLoading: action.payload };

        case SET_MOVIE_LIST:
            return { ...state, movieList: action.payload };

        case SET_CURRENT_MOVIE:
            return { ...state, currentMovie: action.payload };

        case SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

const setIsLoading = (payload) => ({ type: IS_LOADING, payload });
const setCurrentMovie = (payload) => ({ type: SET_CURRENT_MOVIE, payload });
const setMovieList = (payload) => ({ type: SET_MOVIE_LIST, payload });
const setError = (payload) => ({ type: SET_ERROR, payload });

export const getMovieList = (offset, limit, sort, order, title, actor) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        moviesAPI
            .getMovieList(offset, limit, sort, order, title, actor)
            .then((data) => {
                dispatch(setMovieList(data));
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const getMovieById = (movieId) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        moviesAPI
            .getMovieById(movieId)
            .then((data) => {
                dispatch(setCurrentMovie(data));
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const addMovie = (data) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        return moviesAPI
            .addMovie(data)
            .then((response) => {
                if (response.status === 1) {
                    dispatch(setError(null));
                    return { movieId: response.data.id };
                } else if (response.status === 0) {
                    dispatch(setError(response.error.code));
                }
            })
            .catch((error) => {
                dispatch(setError(error.data || DEFAULT_ERROR_MESSAGE));
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const deleteMovie = (movieId) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        return moviesAPI
            .deleteMovie(movieId)
            .then((response) => {
                return response.status;
            })
            .catch((error) => {
                dispatch(setError(error.data || DEFAULT_ERROR_MESSAGE));
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const importMovies = (data) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        return moviesAPI
            .importMovies(data)
            .then((response) => {
                if (response.status === 1) {
                    dispatch(setError(null));
                    return response.status;
                } else if (response.status === 0) {
                    dispatch(setError(response.error.code));
                }
            })
            .catch((error) => {
                dispatch(setError(error.data || DEFAULT_ERROR_MESSAGE));
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export default movies;
