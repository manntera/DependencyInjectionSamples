import { injectable } from 'inversify';
import { ILogger } from './interfaces/ILogger';

/**
 * ファイル出力するLogger実装
 * 
 * 【学習ポイント】
 * - 同じILoggerインターフェースを実装
 * - 実装方法（ファイル出力）は異なる
 * - UserServiceは実装の違いを意識せずに使える
 */
@injectable()
export class FileLogger implements ILogger {
  private fileName = 'app.log';

  log(message: string): void {
    const timestamp = new Date().toISOString();
    // 実際の実装ではファイルに書き込む
    console.log(`[FILE:${this.fileName}] [LOG] ${timestamp} - ${message}`);
  }

  error(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[FILE:${this.fileName}] [ERROR] ${timestamp} - ${message}`);
  }

  info(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[FILE:${this.fileName}] [INFO] ${timestamp} - ${message}`);
  }
}