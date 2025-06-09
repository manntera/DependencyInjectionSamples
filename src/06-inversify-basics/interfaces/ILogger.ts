/**
 * Loggerの契約（interface）
 * 
 * 【ポイント】
 * - interfaceは「何ができるか」を定義する
 * - 「どう実装するか」は具象クラスが決める
 * - これにより疎結合な設計が可能
 */
export interface ILogger {
  log(message: string): void;
  error(message: string): void;
  info(message: string): void;
}