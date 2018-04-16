import axios from 'axios'

let base = '';
let host = 'http://10.3.63.85:8080/versionInfo-manager';
var rootIP = process.env.API_ROOT;

const instance = axios.create({
  baseURL: 'http://10.3.63.85:8080',
  timeout: 3000
});

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getHistoryDeploy = params => { return instance.get(`/versionInfo-manager/list`, {params: params}); };
// export const queryHrResource = params => { return axios.get(`http://oa-test.seedland.cc/services/HrmService?wsdl`, {params:params}); };
export const deploy = params => { return instance.post(`/versionInfo-manager/insert`, params).then(res => res.data);};
