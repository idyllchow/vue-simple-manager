import axios from 'axios'

let base = '';
let host = 'http://localhost:8080/rest';
var rootIP = process.env.API_ROOT;

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getHistoryDeploy = params => { return axios.get(`${base}/historyDeploy`, {params: params}); };
export const queryHr = params => { return axios.get(`${base}/queryHr`, {params:params}); };
export const deploy = params => { return axios.post(`${base}/deploy`, params).then(res => res.data);};