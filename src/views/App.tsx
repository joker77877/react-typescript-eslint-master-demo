import React from 'react';
import Routers from 'router/router';
import { Provider } from 'react-redux';
import store from '@redux/store';
import './App.css';

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Routers />
            </Provider>
        </>
    );
};
export default App;
