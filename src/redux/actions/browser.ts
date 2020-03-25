import { createActions } from 'redux-actions';
import type from '../actionType';

const actionCreators = createActions({
    [type.BROWSER_RESIZE]: payload => ({ ...payload }),
    [type.BROWSER_SCROLL]: () => ({})
});
export default actionCreators;
