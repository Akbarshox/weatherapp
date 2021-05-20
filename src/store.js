
import { compose, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";
import {rootReducer} from "./store/reducers/CombineReducers";

const middleware = applyMiddleware(thunk, createLogger());
const store = compose(createStore)(rootReducer, middleware);

export default store;