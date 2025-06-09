import { injectable } from 'inversify';

/**
 * データベース接続クラス
 * 
 * 【学習ポイント】
 * - interfaceがない具象クラスの例
 * - このようなクラスでも@injectable()デコレータが必要
 * - 他のクラスの依存として注入可能
 */
@injectable()
export class DatabaseConnection {
  private connectionString = 'mysql://localhost:3306/sample_db';
  private isConnected = false;

  connect(): void {
    if (!this.isConnected) {
      console.log(`📡 Connecting to database: ${this.connectionString}`);
      this.isConnected = true;
      console.log('✅ Database connected successfully');
    }
  }

  disconnect(): void {
    if (this.isConnected) {
      console.log('📡 Disconnecting from database...');
      this.isConnected = false;
      console.log('✅ Database disconnected successfully');
    }
  }

  query(sql: string): any[] {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    
    console.log(`🔍 Executing query: ${sql}`);
    // 実際の実装ではデータベースにクエリを送信
    return [{ id: 1, result: 'dummy data' }];
  }

  getConnectionString(): string {
    return this.connectionString;
  }
}