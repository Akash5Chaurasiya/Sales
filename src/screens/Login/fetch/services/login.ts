import apiIndex from '../apis';
import BaseInstance from '../instance';

export interface LogInCredentials {
  email: string;
  password: string;
}
enum RoleIndex {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  PURCHASER = 'PURCHASER',
  SALES = 'SALES',
  UNKNOWN = 'UNKNOWN',
}
export interface LoginData {
  token: string;

  loginData: {
    success: boolean;
    userId: string;
    createdAt: number;
    maxAge: number;
    role: RoleIndex;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
  };
}

export default async function login(data: LogInCredentials) {
  return BaseInstance.post(apiIndex.login, data);
}
