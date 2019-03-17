import http from '@/utils/request';
import {IApiResponse, IUser} from '@/api/models';

class UsersService {
  public async fetchAll(params: any): Promise<IUser[]> {
    const response: any = await http.request<IApiResponse<IUser[]>>({
      url: '/user',
      method: 'get',
      params,
    });

    return response.data;
  }
}

export const service = new UsersService();
