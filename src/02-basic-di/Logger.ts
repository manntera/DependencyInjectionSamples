/**
 * ログを出力するクラス
 * シンプルなコンソール出力を行う
 * 
 * 【DIパターンでの利点】
 * - このクラス自体は01-without-diと同じ実装
 * - 使用する側（UserService）の実装が変わることで、柔軟性が向上
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