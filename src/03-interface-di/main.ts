import { UserService } from './UserService';
import { ConsoleLogger } from './ConsoleLogger';
import { FileLogger } from './FileLogger';

/**
 * インターフェースを使ったDI（Dependency Injection）の実装デモ
 * 
 * この実装では：
 * - UserServiceがILoggerインターフェースに依存
 * - 複数のLogger実装を簡単に切り替え可能
 * - 実装の詳細を隠蔽し、契約のみに依存
 * - 新しいLogger実装を追加してもUserServiceは変更不要
 */
function main() {
  console.log('=== 03. インターフェースを使ったDI（依存性注入）の実装 ===\n');

  console.log('--- ConsoleLogger を使用した場合 ---');
  // ConsoleLogger実装を注入
  const consoleLogger = new ConsoleLogger();
  const userService1 = new UserService(consoleLogger);

  userService1.createUser('田中太郎');
  userService1.deleteUser('田中太郎');

  console.log('\n--- FileLogger を使用した場合 ---');
  // FileLogger実装を注入（UserServiceのコードは変更なし）
  const fileLogger = new FileLogger('app.log');
  const userService2 = new UserService(fileLogger);

  userService2.createUser('佐藤花子');
  userService2.deleteUser('佐藤花子');

  console.log('\n【この実装の利点】');
  console.log('- UserServiceが具体的な実装ではなく、インターフェースに依存');
  console.log('- Logger実装を簡単に切り替え可能（UserServiceのコード変更なし）');
  console.log('- 新しいLogger実装（例：DatabaseLogger）を追加しても既存コード影響なし');
  console.log('- テスト時にモックILoggerを注入可能');
  console.log('- Open/Closed原則（拡張に開いて、修正に閉じている）を実現');

  console.log('\n【進化の過程】');
  console.log('01. DIなし: UserService -> new Logger() （密結合）');
  console.log('02. 基本DI: UserService -> Logger （疎結合だが具体クラスに依存）');
  console.log('03. 界面DI: UserService -> ILogger （抽象に依存、最も柔軟）');
}

main();