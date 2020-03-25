import { createActions } from 'redux-actions';
import type from '../actionType';

const actionCreators = createActions({
    [type.INCREMENT]: (): object => ({}),
    [type.DECREMENT]: (): object => ({}),
    [type.RESET]: (): object => ({})
});
export default actionCreators;
