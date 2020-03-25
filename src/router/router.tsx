import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import loadable from './loadable';
import asyncComponent from 'components/asyncComponent';

/**
 * webpackChunkName 为需要按模块切割的名称
 */
const routers = [
    {
        path: ['/', '/home'],
        component: asyncComponent(() => import(/* webpackChunkName: "home" */ '../views/home')),
        exact: true
    }
    // {
    //     path: '/user',
    //     component: asyncComponent(() => import(/* webpackChunkName: "user" */ 'views/user'))
    // },
    // {
    //     path: '/count',
    //     component: asyncComponent(() => import(/* webpackChunkName: "count" */ 'views/count'))
    // }
    // {
    //     path: ['/', '/home'],
    //     component: loadable((): ReactDOM => import(/* webpackChunkName: "home" */ 'views/home'))
    // },
    // {
    //     path: '/user',
    //     component: loadable((): ReactDOM => import(/* webpackChunkName: "user" */ 'views/user'))
    // }
];

const Routers = () => (
    <Switch>
        {routers.map(({ component, path, exact = true }, index) => {
            return <Route exact={exact} path={path} component={component} key={index} />;
        })}
        {/* {routers.map(
            ({ component, path, exact = true }): ReactDOM => {
                console.log(component);
                const Component = component;
                return <Route exact={exact} path={path} render={(routeProps): ReactDOM => <Component {...routeProps} />} key={path} />;
            }
        )} */}
    </Switch>
);

export default Routers;
