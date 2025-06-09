import 'reflect-metadata';
import { Container } from 'inversify';
import { ILogger } from './interfaces/ILogger';
import { IUserService } from './interfaces/IUserService';
import { ConsoleLogger } from './ConsoleLogger';
import { FileLogger } from './FileLogger';
import { DatabaseConnection } from './DatabaseConnection';
import { UserService } from './UserService';
import { TYPES } from './types';

/**
 * InversifyJSの仕組み解説
 * 
 * 05の「魔法」がどう動いているかを、シンプルな例で詳しく学習
 * 
 * 【学習内容】
 * 1. @injectable() と @inject() の役割
 * 2. container.bind() の仕組み
 * 3. container.get() の自動依存解決
 * 4. interfaceと識別子の関係
 * 5. 実装の切り替え方法
 */
function main() {
  console.log('=== 06. InversifyJSの仕組み解説（詳細学習） ===\n');

  console.log('【ステップ1: DIコンテナの作成】');
  console.log('Container は InversifyJS の中心となるオブジェクトです');
  const container = new Container();
  console.log('✅ Container created\n');

  console.log('【ステップ2: 依存関係の登録（bind）】');
  console.log('container.bind() で「何を使うか」を教えます\n');

  // 具象クラス（interfaceなし）の登録
  console.log('1. 具象クラスの登録:');
  console.log('   container.bind<DatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection)');
  container.bind<DatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection);
  console.log('   → TYPES.DatabaseConnection の識別子で DatabaseConnection クラスを登録\n');

  // interface実装の登録
  console.log('2. interfaceの実装を登録:');
  console.log('   container.bind<ILogger>(TYPES.ILogger).to(ConsoleLogger)');
  container.bind<ILogger>(TYPES.ILogger).to(ConsoleLogger);
  console.log('   → TYPES.ILogger の識別子で ConsoleLogger を登録');
  console.log('   → ILogger interface を実装した具象クラスを指定\n');

  console.log('3. UserService の登録:');
  console.log('   container.bind<IUserService>(TYPES.IUserService).to(UserService)');
  container.bind<IUserService>(TYPES.IUserService).to(UserService);
  console.log('   → TYPES.IUserService の識別子で UserService を登録\n');

  console.log('【ステップ3: 依存関係の自動解決（get）】');
  console.log('container.get() で自動的に依存関係を解決してインスタンスを取得\n');

  console.log('🔍 container.get<IUserService>(TYPES.IUserService) 実行中...');
  console.log('   ↓ InversifyJS の内部動作:');
  console.log('   1. UserService のコンストラクタを調査');
  console.log('   2. @inject(TYPES.ILogger) → ILogger が必要');
  console.log('   3. @inject(TYPES.DatabaseConnection) → DatabaseConnection が必要');
  console.log('   4. TYPES.ILogger → ConsoleLogger を自動生成');
  console.log('   5. TYPES.DatabaseConnection → DatabaseConnection を自動生成');
  console.log('   6. 生成した依存を UserService に注入');
  console.log('   7. UserService のインスタンスを返却\n');

  const userService = container.get<IUserService>(TYPES.IUserService);
  console.log('✅ UserService とその依存関係が自動で解決されました！\n');

  console.log('【ステップ4: 実際の動作確認】');
  const user = userService.createUser('田中太郎', 'tanaka@example.com');
  userService.getUser(user.id);

  console.log('\n【ステップ5: 実装の動的切り替えデモ】');
  console.log('同じ interface で異なる実装に切り替えてみます\n');

  console.log('🔄 Logger を FileLogger に変更...');
  const container2 = new Container();
  container2.bind<DatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection);
  container2.bind<ILogger>(TYPES.ILogger).to(FileLogger); // ←ここだけ変更！
  container2.bind<IUserService>(TYPES.IUserService).to(UserService);

  console.log('✅ 設定完了。UserService のコードは一切変更していません\n');

  const userService2 = container2.get<IUserService>(TYPES.IUserService);
  console.log('📝 同じ操作を FileLogger で実行:');
  const user2 = userService2.createUser('佐藤花子', 'sato@example.com');

  console.log('\n【InversifyJS の仕組みまとめ】');
  console.log('✅ @injectable() → クラスをDI可能にするマーク');
  console.log('✅ @inject(識別子) → 依存する型を明示的に指定');
  console.log('✅ container.bind(識別子).to(クラス) → 依存関係を登録');
  console.log('✅ container.get(識別子) → 依存を自動解決してインスタンス取得');
  console.log('✅ 実装の切り替えは bind() の変更だけで可能');

  console.log('\n【従来のDIとの比較】');
  console.log('❌ 従来: new UserService(new ConsoleLogger(), new DatabaseConnection())');
  console.log('   → 依存が増えるたびにコンストラクタ呼び出しが複雑に');
  console.log('✅ InversifyJS: container.get<IUserService>(TYPES.IUserService)');
  console.log('   → 依存の数に関係なく、常に1行で取得可能');

  console.log('\n🎓 これで InversifyJS の基本的な仕組みが理解できました！');
  console.log('04 → 05 → 06 の流れで、DIコンテナの威力を体感できたでしょうか？');
}

main();