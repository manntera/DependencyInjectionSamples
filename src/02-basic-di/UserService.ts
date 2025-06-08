import { Logger } from './Logger';

/**
 * ユーザー関連の処理を行うサービスクラス（DI版）
 * 
 * 【改善点】
 * - Loggerインスタンスを外部から注入（Dependency Injection）
 * - UserServiceはLoggerの生成責任を持たない
 * - 異なるLogger実装を簡単に差し替え可能
 * - テスト時にモックオブジェクトを注入可能
 * - 依存関係が明示的になり、理解しやすい
 */
export class UserService {
  // コンストラクタでLogger依存を受け取る（これがDIの基本パターン）
  constructor(private logger: Logger) {
    // loggerは外部から注入されるため、ここでは何もしない
  }

  /**
   * 新しいユーザーを作成
   * @param name ユーザー名
   */
  createUser(name: string): void {
    // ユーザー作成のビジネスロジック
    console.log(`ユーザー "${name}" を作成中...`);
    
    // ログ出力（注入されたLoggerを使用）
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