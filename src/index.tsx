import ReactDOM from 'react-dom';
import React from 'react';

import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'api';

import zhCN from 'antd/es/locale/zh_CN';
import App from './views/App';
import './util/error'; // 错误日志
import './util/performance'; // 性能日志
import './index.css';
import 'theme/index';

moment.locale('zh-cn');
/**
 * 热更新
 */
if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <HashRouter>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </HashRouter>,
    document.getElementById('app')
);
