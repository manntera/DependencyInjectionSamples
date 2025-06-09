/**
 * UserServiceの契約（interface）
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface IUserService {
  getUser(id: string): User | null;
  createUser(name: string, email: string): User;
  deleteUser(id: string): boolean;
}