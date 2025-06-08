import { Logger } from './Logger';

/**
 * ユーザー関連の処理を行うサービスクラス
 * 
 * 【問題点】
 * - Loggerクラスに強く依存している（密結合）
 * - 内部でnew Logger()を使用しているため、Logger実装を変更できない
 * - テスト時にLoggerの動作をモック化することが困難
 * - UserServiceの責任範囲を超えて、Loggerのインスタンス化も担っている
 */
export class UserService {
  // Logger依存を内部で生成（これがDIを使わない従来の方法）
  private logger = new Logger();

  /**
   * 新しいユーザーを作成
   * @param name ユーザー名
   */
  createUser(name: string): void {
    // ユーザー作成のビジネスロジック
    console.log(`ユーザー "${name}" を作成中...`);
    
    // ログ出力（内部で生成したLoggerを使用）
    this.logger.log(`ユーザー ${name} が作成されました`);
  }

  /**
   * ユーザーを削除
   * @param name ユーザー名
   */
  deleteUser(name: string): void {
    // ユーザー削除のビジネスロジック
    console.log(`ユーザー "${name}" を削除中...`);
    
    // ログ出力
    this.logger.log(`ユーザー ${name} が削除されました`);
  }
}