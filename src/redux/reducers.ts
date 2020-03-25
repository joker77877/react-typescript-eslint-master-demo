import { combineReducers } from 'redux-immutable';
import counter from 'reducers/counter';
import browser from 'reducers/browser';

export default combineReducers({
    counter,
    browser
});
