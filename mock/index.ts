import Mock from 'mockjs';
import userApi from './user';

Mock.mock(/\/user/, 'get', userApi.all);

export default Mock;
