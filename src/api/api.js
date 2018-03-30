import axios from 'axios'

let base = '';
let host = 'http://localhost:8080/rest';
var rootIP = process.env.API_ROOT;

export const requestLogin = params => { return axios.post(host + `${base}/login`, params).then(res => res.data); };
export const getHistoryList = params => { return axios.get(`${base}/history/list`, {params:params}); };
export const queryHr = params => { return axios.get(`${base}/history/list`, {params:params}); };