import { ILogger } from './interfaces/ILogger';

/**
 * ファイルにログを出力するLogger実装
 * 
 * 【実装の多様性】
 * - 同じILoggerインターフェースを実装
 * - ConsoleLoggerとは異なる出力方法
 * - UserServiceのコードを変更せずに利用可能
 */
export class FileLogger implements ILogger {
  constructor(private filename: string) {}

  /**
   * メッセージをファイル風に出力（実際はコンソールに疑似出力）
   * 実際のプロダクションでは fs.writeFileSync などを使用
   * @param message 出力するメッセージ
   */
  log(message: string): void {
    // 実際の実装では fs.writeFileSync(this.filename, message) など
    console.log(`[FILE LOG -> ${this.filename}] ${new Date().toISOString()}: ${message}`);
  }
}