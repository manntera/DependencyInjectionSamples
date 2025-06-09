import { injectable, inject } from 'inversify';
import { ConfigService } from './ConfigService';
import { TYPES } from './types';

/**
 * ログ記録サービス
 * ConfigServiceに依存してログレベルを取得
 * 
 * @inject デコレータで依存する型を明示する
 */
@injectable()
export class Logger {
  constructor(@inject(TYPES.ConfigService) private config: ConfigService) {}

  log(message: string): void {
    const level = this.config.getLogLevel();
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  }

  error(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [ERROR] ${message}`);
  }

  info(message: string): void {
    if (this.config.getLogLevel() === 'info') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [INFO] ${message}`);
    }
  }
}