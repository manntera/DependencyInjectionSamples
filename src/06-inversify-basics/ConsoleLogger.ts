import { injectable } from 'inversify';
import { ILogger } from './interfaces/ILogger';

/**
 * コンソール出力するLogger実装
 * 
 * 【学習ポイント】
 * ① @injectable() デコレータが必須
 *    → InversifyJSに「このクラスはDI可能」と教える
 * ② interfaceを実装している
 *    → 契約を満たす具体的な実装
 */
@injectable()
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }

  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }
}