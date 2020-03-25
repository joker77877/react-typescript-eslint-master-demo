import { Modal } from 'antd';

interface ErrorProps {
    type: string;
    code: string;
    msg: string;
}

class MyError extends Error {
    constructor({ type, code, msg }: ErrorProps) {
        super();
        this.name = '错误';
        this.message = msg || code || type || '未知错误信息';
        this.stack = new Error().stack;
    }
}

export default MyError;

function showError(e: Error) {
    Modal.error({
        title: e.name,
        content: e.message,
        width: 562
    });
}

export { showError };
