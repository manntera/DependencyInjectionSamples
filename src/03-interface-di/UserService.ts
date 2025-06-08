import { ILogger } from './interfaces/ILogger';

/**
 * ユーザー関連の処理を行うサービスクラス（インターフェースDI版）
 * 
 * 【最大の利点】
 * - 具体的なLogger実装ではなく、ILoggerインターフェースに依存
 * - どんなLogger実装でも、ILoggerを満たせば利用可能
 * - 実装の詳細を知る必要がない
 * - Open/Closed原則に従った設計（拡張に開いて、修正に閉じている）
 */
export class UserService {
  // ILoggerインターフェースに依存（具体的な実装には依存しない）
  constructor(private logger: ILogger) {}

  /**
   * 新しいユーザーを作成
   * @param name ユーザー名
   */
  createUser(name: string): void {
    // ユーザー作成のビジネスロジック
    console.log(`ユーザー "${name}" を作成中...`);
    
    // インターフェース経由でログ出力
    // どのLogger実装が注入されているかは関知しない
    this.logger.log(`ユーザー ${name} が作成されました`);
  }

  /**
   * ユーザーを削除
   * @param name ユーザー名
   */
  deleteUser(name: string): void {
    // ユーザー削除のビジネスロジック
    console.log(`ユーザー "${name}" を削除中...`);
    
    // インターフェース経由でログ出力
    this.logger.log(`ユーザー ${name} が削除されました`);
  }
}