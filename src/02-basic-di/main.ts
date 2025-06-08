import { UserService } from './UserService';
import { Logger } from './Logger';

/**
 * 基本的なDI（Dependency Injection）の実装デモ
 * 
 * この実装では：
 * - UserServiceのコンストラクタでLoggerを注入
 * - 依存関係が明示的になった
 * - UserServiceの責任が明確になった（ユーザー操作のみ）
 * - 将来的に異なるLogger実装に変更が容易
 */
function main() {
  console.log('=== 02. 基本的なDI（依存性注入）の実装 ===\n');

  // 1. 依存するオブジェクト（Logger）を先に生成
  const logger = new Logger();

  // 2. 依存関係を注入してUserServiceを生成
  const userService = new UserService(logger);

  // ユーザー操作を実行
  userService.createUser('田中太郎');
  userService.createUser('佐藤花子');
  userService.deleteUser('田中太郎');

  console.log('\n【この実装の利点】');
  console.log('- UserServiceとLoggerが疎結合になった');
  console.log('- 依存関係が明示的で理解しやすい');
  console.log('- UserServiceの責任が明確（ユーザー操作のみ）');
  console.log('- 将来的に異なるLogger実装への変更が容易');
  console.log('- テスト時にモックLoggerを注入可能');

  console.log('\n【従来実装との比較】');
  console.log('従来: UserService内で new Logger() → 密結合');
  console.log('DI版: new UserService(logger) → 疎結合');
}

main();