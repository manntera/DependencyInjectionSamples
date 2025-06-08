import { UserService } from './UserService';

/**
 * DIを使わない従来の実装のデモ
 * 
 * この実装では：
 * - UserServiceが内部でLoggerを生成している
 * - 依存関係が隠蔽されており、外部から制御できない
 * - 異なるLogger実装に変更したい場合、UserServiceのコードを変更する必要がある
 */
function main() {
  console.log('=== 01. DIを使わない従来の実装 ===\n');

  // UserServiceを生成
  // この時点で内部的にLoggerも生成される（外部からは見えない）
  const userService = new UserService();

  // ユーザー操作を実行
  userService.createUser('田中太郎');
  userService.createUser('佐藤花子');
  userService.deleteUser('田中太郎');

  console.log('\n【この実装の問題点】');
  console.log('- UserServiceがLoggerに強く依存している');
  console.log('- Logger実装を変更するにはUserServiceのコードを修正する必要がある');
  console.log('- テスト時にLoggerをモック化することが困難');
  console.log('- 依存関係が隠蔽されており、外部から制御できない');
}

main();