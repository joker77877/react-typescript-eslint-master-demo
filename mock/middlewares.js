module.exports = (request, response, next) => {
    console.log('-------------------------------');
    console.log('----------new request----------');
    console.log('-------------------------------');
    console.log(request);
    console.log('params:', request.params);
    console.log('query:', request.query);
    console.log('body:', request.body);
    console.log('method:', request.method);
    if (request.method === 'POST') {
        request.method = 'GET';
        request.query = request.body;
    }

    //����ie8�µ��ļ��ϴ�
    if ((request.headers['content-type'] || '').startsWith('multipart/form-data')) {
        response.header('content-type', 'text/html');
    }
    next();
};
