import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import auth from "./auth";
import movies from "./movies";

const allReducers = combineReducers({
    auth,
    movies,
});

const rootReducer = (state, action) => {
    return allReducers(state, action);
};

let middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger];
}

export default createStore(rootReducer, applyMiddleware(...middleware));
