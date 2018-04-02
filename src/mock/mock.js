import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './user';

let _Users = Users;


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
      console.log("=======deploy params========" + config.data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code:200, msg: '发布成功'}]);
        }, 1000);
      });
    });

    //获取info列表
    mock.onGet('/info/list').reply(config => {
      console.dir(config.params);
      let {name} = config.params;
      let mockInfos = _Infos.filter(info => {
        if(name&&info.name.indexOf(name) == -1)
          return false;
        return true;
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            infos: mockInfos
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
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    }); 

  }
};