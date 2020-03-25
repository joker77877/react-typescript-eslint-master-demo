import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers';

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
if (module.hot) {
    module.hot.accept('./reducers', (): void => {
        const nextCombineReducers = require('./reducers').default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;
