/**
 * ログを出力するクラス
 * シンプルなコンソール出力を行う
 */
export class Logger {
  /**
   * メッセージをログとして出力
   * @param message 出力するメッセージ
   */
  log(message: string): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
}