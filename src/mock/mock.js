import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './user';
import { HistoryDeploys } from './historyDeploy';

let _Users = Users;
let _HistoryDeploys = HistoryDeploys;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    mock.onPost('/deploy').reply(config => {
      JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code:200, msg: '发布成功'}]);
        }, 1000);
      });
    });

    //获取info列表
    mock.onGet('/list').reply(config => {
      let {page} = config.params;
      
      let mockHistoryDeploys = _HistoryDeploys.filter(historyDeploy => {
        
        return true;
      });
      let totalPages = mockHistoryDeploys.length;
      let pageSize = 7;
      mockHistoryDeploys = mockHistoryDeploys.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      console.log("========_HistoryDeploys===========page: " + page + "====totalPages====" + totalPages);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            totalPages: totalPages,
            pageSize: pageSize,
            historyDeploys: mockHistoryDeploys
          }]);
        },1000);
      })
    });

    mock.onGet('/user/queryAllUser').reply(config =>{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users:_Users
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let totalPages = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            totalPages: totalPages,
            users: mockUsers
          }]);
        }, 1000);
      });
    }); 

  }
};