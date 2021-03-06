export declare interface IUser {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
  nickname: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  notes: string;
}

export declare interface IApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
