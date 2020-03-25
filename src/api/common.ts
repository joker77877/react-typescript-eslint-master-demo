import axios from 'axios';

/**
 * 通用接口
 */
const commmonApi = {
    getAlgorithm(params = {}): Promise<{}> {
        return axios.get('/algorithm/get', { params });
    },
    getResourceList(params = {}): Promise<{}> {
        return axios.get('/resource/list', { params });
    },
    getTaskList(params = {}): Promise<{}> {
        return axios.get(`/task/page/${params.pageSize}/${params.pageNo}`);
    },
    addTask(params = {}): Promise<{}> {
        return axios.post('/task/add', params);
    },
    updateTask(params = {}): Promise<{}> {
        return axios.post(`/task/update/${params.id}`, params);
    },

    deleteTask(id): Promise<{}> {
        return axios.post(`/task/delete/${id}`);
    },
    getTree(params = {}): Promise<{}> {
        return axios.get('resource/tree', { params });
    },
    findByOrgIndexCode(params = {}): Promise<{}> {
        return axios.get('resource/findByOrgIndexCode', { params });
    }
};
export default commmonApi;
