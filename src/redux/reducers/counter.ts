import { handleActions } from 'redux-actions';
import { Map as map } from 'immutable';
import type from '../actionType';

/*
 * 初始化state
 */
const defaultState = map({ count: 0 });

/*
 * reducer
 */
const reducer = handleActions(
    {
        [type.INCREMENT]: <T>(state: T): T => state.update('count', (val: number): number => val + 1),
        [type.DECREMENT]: <T>(state: T): T => state.update('count', (val: number): number => val - 1),
        [type.RESET]: <T>(state: T): T => state.set('count', 0)
    },
    defaultState
);
export default reducer;
