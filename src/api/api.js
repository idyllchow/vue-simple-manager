import axios from 'axios'

let base = '';
var rootIP = process.env.API_ROOT;
let uploadUrl = '';

const instance = axios.create({
  // baseURL: 'http://192.168.64.175:8080/test',
  baseURL: 'http://schangepasswd.seedland.cc:8080/costing',
  // baseURL: 'http://10.3.59.114:8080',
  timeout: 3000
});

const uploadInstance = axios.create({
	baseURL: 'http://192.168.64.175:8080/test',
	timeout: 3000
});

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getHistoryDeploy = params => { return instance.get(`/versionInfo-manager/list`, {params: params}); };
// export const queryHrResource = params => { return axios.get(`http://oa-test.seedland.cc/services/HrmService?wsdl`, {params:params}); };
export const deploy = params => { return instance.post(`/versionInfo-manager/insert`, params).then(res => res.data);};

export const uploadImage = params => {return uploadInstance.post(`/pic/upload`, params).then(res => res.data);};

if (process.env.NODE_ENV == 'development') {
	uploadUrl = 'http://192.168.64.175:8080';
} else {
	uploadUrl = 'http://192.168.64.175:8080';
}

export {
	uploadUrl
}