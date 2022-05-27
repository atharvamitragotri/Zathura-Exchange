import { createStore, applyMiddleware, compose} from "redux"
import {createLogger} from 'redux-logger'
import rootReducer from "./reducers"

const loggerMiddleWare = createLogger()
const middleware = []

// for redux dev tools
const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer)

export default function configureStore(preloadedState){
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware,loggerMiddleWare))
    )
}