import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import type from '../actionType';

// 浏览器判断
const explorer = { type: 'unkown', version: -1 };
// const ua = navigator.userAgent.toLowerCase();
// let s;
// s = ua.match(/msie ([\d.]+)/)
//     ? (explorer = { type: 'ie', version: s[1] })
//     : (s = ua.match(/firefox\/([\d.]+)/))
//     ? (explorer = { type: 'firefox', version: s[1] })
//     : (s = ua.match(/chrome\/([\d.]+)/))
//     ? (explorer = { type: 'chrome', version: s[1] })
//     : (s = ua.match(/opera.([\d.]+)/))
//     ? (explorer = { type: 'opera', version: s[1] })
//     : (s = ua.match(/version\/([\d.]+).*safari/))
//     ? (explorer = { type: 'safari', version: s[1] })
//     : 0;
/*
 * 初始化state
 */
const { body, documentElement } = document;
const browserWidth = window.innerWidth || documentElement.clientWidth || body.clientWidth;
const browserHeight = window.innerHeight || documentElement.clientHeight || body.clientHeight;
// const defaultState = {
//     ...explorer,
//     width: browserWidth,
//     height: browserHeight,
//     availHeight: browserHeight,
//     screenWidth: screen.width,
//     scrollTop: 0,
//     // switch状态：false：关闭；true：展开；默认展开；
//     switchState: true
// };
const defaultState = Map({
    ...explorer,
    width: browserWidth,
    height: browserHeight,
    availHeight: browserHeight,
    screenWidth: screen.width,
    scrollTop: 0,
    // switch状态：false：关闭；true：展开；默认展开；
    switchState: true
});
/*
 * reducer
 */
const reducer = handleActions(
    {
        [type.BROWSER_RESIZE]: (state, action): Map =>
            Map({
                ...state,
                ...action.payload,
                availHeight: action.payload.height
            }),
        [type.BROWSER_SCROLL]: (state, action): Map =>
            Map({
                ...state,
                switchState: action.payload
            })
    },
    defaultState
);
export default reducer;
