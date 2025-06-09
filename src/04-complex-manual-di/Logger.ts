import { ConfigService } from './ConfigService';

/**
 * ログ記録サービス
 * ConfigServiceに依存してログレベルを取得
 */
export class Logger {
  constructor(private config: ConfigService) {}

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