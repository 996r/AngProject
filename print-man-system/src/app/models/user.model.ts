

export interface RegisterUser {
  username: string;
  email: string;
  branch_code: string;
  password: string;
}

export interface User extends RegisterUser {
  _id: string;
}