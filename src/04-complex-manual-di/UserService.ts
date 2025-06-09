import { Logger } from './Logger';
import { ConfigService } from './ConfigService';

export interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: Date;
}

/**
 * ユーザー管理サービス
 * LoggerとConfigServiceに依存
 */
export class UserService {
  private users: User[] = [];

  constructor(
    private logger: Logger,
    private config: ConfigService
  ) {}

  getUser(id: string): User | null {
    this.logger.info(`Fetching user with ID: ${id}`);
    
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.logger.log(`User found: ${user.name} (${user.email})`);
      return user;
    } else {
      this.logger.log(`User not found with ID: ${id}`);
      return null;
    }
  }

  getAllUsers(): User[] {
    this.logger.info(`Fetching all users from database: ${this.config.getDatabaseUrl()}`);
    this.logger.log(`Total users: ${this.users.length}`);
    return [...this.users];
  }

  createUser(name: string, email: string): User {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      registeredAt: new Date()
    };

    this.users.push(user);
    this.logger.log(`User created: ${name} (${email}) with ID: ${user.id}`);
    
    return user;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const user = this.users[index];
      this.users.splice(index, 1);
      this.logger.log(`User deleted: ${user.name} (${user.email})`);
      return true;
    } else {
      this.logger.log(`Failed to delete user with ID: ${id} - not found`);
      return false;
    }
  }
}