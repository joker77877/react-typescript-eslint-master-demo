/* global isProduction */
import axios from 'axios';
import config from 'config';
import MyError from 'lib/error';

const { server } = config;
axios.defaults.baseURL = server; // 请求测试域名和端口
// const token = document.getElementsByName('_csrf')[0].getAttribute('content');
// const header = document.getElementsByName('_csrf_header')[0].getAttribute('content');
// axios.defaults.headers.common[header] = token;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

/* // 发送请求前拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete' || config.method === 'patch') {
            // config.data = querystring.stringify(config.data);
            config.headers = {
                //json格式
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            };
        }
        // config.headers = {
        //   authorization: `Bearer ${localStorage.getItem('toKen')}`,   //根据需求是否需要token
        // };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
); */

/**
 * 返回数据批量处理接口
 */
axios.interceptors.response.use(
    response => {
        if (response) {
            const { status, data } = response;
            if (status && status === 200 && data) {
                if (data.code === '0') {
                    if (data.data && data.data.list === null) {
                        data.data.list = [];
                    }
                    return data;
                } else {
                    throw new MyError(data);
                }
            } else {
                throw new MyError(data);
            }
        } else {
            throw new Error('接口没有返回值');
        }
    },
    error => {
        const response = error.response;
        if (response) {
            const status = response.status;
            if (status === 403 || status === 401) {
                throw isProduction ? redirect() : new MyError('您没有权限进行此项操作');
            } else if (status === 404 || status === 502 || status === 504) {
                throw new MyError('网络异常');
            } else if (status === 500 && response.data && response.data.code === '500') {
                throw new MyError('系统内部异常');
            }
            if ('data' in response) {
                throw new MyError(response.data);
            } else if ('statusText' in response) {
                throw new MyError(response.statusText);
            }
        } else if (error.message === 'Network Error') {
            throw new MyError('网络异常');
        }
        throw error;
    }
);
function redirect() {
    location.reload();
    return new MyError('redirect');
}
