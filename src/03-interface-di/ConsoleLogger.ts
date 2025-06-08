import { ILogger } from './interfaces/ILogger';

/**
 * コンソールにログを出力するLogger実装
 * 
 * ILoggerインターフェースを実装することで：
 * - インターフェースが定義する契約を満たす
 * - 他のLogger実装と置き換え可能
 * - UserServiceからは実装の詳細が隠蔽される
 */
export class ConsoleLogger implements ILogger {
  /**
   * メッセージをコンソールに出力
   * @param message 出力するメッセージ
   */
  log(message: string): void {
    console.log(`[CONSOLE LOG] ${new Date().toISOString()}: ${message}`);
  }
}