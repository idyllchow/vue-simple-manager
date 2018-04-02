import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://avatars1.githubusercontent.com/u/10448994?s=400&amp;u=4b3ece10fcd05cb174432c8ce92b1c5f57b0b995&amp;v=4',
    name: '管理员的哥哥'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    telephone: Mock.Random.string('number', 11),
    password: Mock.Random.string('number',6),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
