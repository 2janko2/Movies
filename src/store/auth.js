import { DEFAULT_ERROR_MESSAGE } from "constants/constants";
import { sessionsAPI } from "api/sessions";
import { usersAPI } from "api/users";

const IS_LOADING = "movies/auth/IS_LOADING";
const SET_TOKEN = "movies/auth/SET_TOKEN";
const SET_ERROR = "movies/auth/SET_ERROR";
const LOGOUT = "movies/auth/LOGOUT";

let initialState = {
    isLoading: false,
    isAuth: false,
    token: null,
    error: null,
};

const token = JSON.parse(localStorage.getItem("token"));
if (token) {
    initialState = {
        ...initialState,
        isAuth: true,
        token,
    };
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, isLoading: action.payload };

        case SET_TOKEN:
            return { ...state, isAuth: true, token: action.payload };

        case SET_ERROR:
            return { ...state, error: action.payload };

        case LOGOUT:
            return { ...state, isAuth: false, token: null };

        default:
            return state;
    }
};

const setIsLoading = (payload) => ({ type: IS_LOADING, payload });
const setToken = (payload) => ({ type: SET_TOKEN, payload });
const setError = (payload) => ({ type: SET_ERROR, payload });
const logoutAC = () => ({ type: LOGOUT });

export const createUser = (data) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        usersAPI
            .createUser(data)
            .then((response) => {
                if (response.status === 1) {
                    localStorage.setItem("token", JSON.stringify(response.token));
                    dispatch(setToken(response.token));
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

export const login = (data) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        sessionsAPI
            .createSession(data)
            .then((response) => {
                if (response.status === 1) {
                    localStorage.setItem("token", JSON.stringify(response.token));
                    dispatch(setToken(response.token));
                    dispatch(setError(null));
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

export const logout = () => {
    localStorage.removeItem("token");

    return (dispatch) => {
        dispatch(logoutAC());
    };
};

export default auth;
