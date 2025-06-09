import { injectable, inject } from 'inversify';
import { ILogger } from './interfaces/ILogger';
import { IUserService, User } from './interfaces/IUserService';
import { DatabaseConnection } from './DatabaseConnection';
import { TYPES } from './types';

/**
 * ユーザー管理サービス
 * 
 * 【学習ポイント】
 * ① @injectable() → DIコンテナで管理可能にする
 * ② @inject(TYPES.ILogger) → 依存する型を明示
 * ③ ILoggerに依存、具象クラス（ConsoleLogger等）には依存しない
 * ④ DatabaseConnectionにも依存（具象クラス依存の例）
 */
@injectable()
export class UserService implements IUserService {
  private users: User[] = [];

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.DatabaseConnection) private db: DatabaseConnection
  ) {
    // データベース接続を初期化
    this.db.connect();
    this.logger.info('UserService initialized with database connection');
  }

  getUser(id: string): User | null {
    this.logger.info(`Fetching user with ID: ${id}`);
    
    // 実際の実装ではデータベースからクエリ
    this.db.query(`SELECT * FROM users WHERE id = '${id}'`);
    
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.logger.log(`User found: ${user.name} (${user.email})`);
      return user;
    } else {
      this.logger.log(`User not found with ID: ${id}`);
      return null;
    }
  }

  createUser(name: string, email: string): User {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email
    };

    // 実際の実装ではデータベースにINSERT
    this.db.query(`INSERT INTO users (id, name, email) VALUES ('${user.id}', '${name}', '${email}')`);
    
    this.users.push(user);
    this.logger.log(`User created: ${name} (${email}) with ID: ${user.id}`);
    
    return user;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const user = this.users[index];
      
      // 実際の実装ではデータベースからDELETE
      this.db.query(`DELETE FROM users WHERE id = '${id}'`);
      
      this.users.splice(index, 1);
      this.logger.log(`User deleted: ${user.name} (${user.email})`);
      return true;
    } else {
      this.logger.log(`Failed to delete user with ID: ${id} - not found`);
      return false;
    }
  }
}