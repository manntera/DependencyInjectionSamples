import { ConfigService } from './ConfigService';
import { Logger } from './Logger';
import { TemplateEngine } from './TemplateEngine';
import { Mailer } from './Mailer';
import { UserService } from './UserService';
import { NotificationService } from './NotificationService';
import { AppController } from './AppController';

/**
 * 複雑な手動DIの実装デモ
 * 
 * この実装では：
 * - 7つのクラスが複雑に依存し合っている
 * - 手動でインスタンスを生成する必要がある
 * - 依存関係の順序を間違えるとエラーになる
 * - 同じ依存を複数回作成する必要がある
 * - 新しい依存が追加されると既存のコードも修正が必要
 * 
 * これが「new地獄」の典型例です！
 */
function main() {
  console.log('=== 04. 複雑な手動DI（依存地獄の再現） ===\n');

  console.log('【依存関係の手動構築開始】');
  console.log('⚠️  注意: 依存の順序を間違えるとエラーになります！\n');

  // ステップ1: 最も基底の依存（他に依存しないもの）から作成
  console.log('1. ConfigService を生成...');
  const configService = new ConfigService();

  // ステップ2: ConfigService に依存するクラスを作成
  console.log('2. Logger を生成... (ConfigService に依存)');
  const logger = new Logger(configService);

  console.log('3. TemplateEngine を生成... (ConfigService に依存)');
  const templateEngine = new TemplateEngine(configService);

  // ステップ3: 複数の依存を持つクラスを作成
  console.log('4. Mailer を生成... (ConfigService, Logger に依存)');
  const mailer = new Mailer(configService, logger);

  console.log('5. UserService を生成... (Logger, ConfigService に依存)');
  const userService = new UserService(logger, configService);

  // ステップ4: 最も多くの依存を持つクラスを作成
  console.log('6. NotificationService を生成... (UserService, Mailer, TemplateEngine, Logger, ConfigService に依存)');
  console.log('   ↑ コンストラクタの引数が5個も！これが依存地獄です');
  const notificationService = new NotificationService(
    userService,
    mailer,
    templateEngine,
    logger,
    configService
  );

  // ステップ5: アプリケーションのエントリーポイント
  console.log('7. AppController を生成... (NotificationService, Logger に依存)');
  const appController = new AppController(notificationService, logger);

  console.log('\n✅ 依存関係の構築完了！でもこのコード量...\n');

  console.log('【実際の処理実行】');
  
  // テストユーザーを作成
  const testUser = userService.createUser('田中太郎', 'tanaka@example.com');
  
  // アプリケーション機能の実行
  appController.handleUserRegistration({
    name: '佐藤花子',
    email: 'sato@example.com'
  });

  console.log('\n---');
  appController.handlePasswordReset(testUser.id);

  console.log('\n【この実装の問題点】');
  console.log('❌ 同じ依存（ConfigService, Logger）を複数箇所で渡している');
  console.log('❌ 依存の生成順序を間違えるとエラーになる');
  console.log('❌ NotificationServiceのコンストラクタが5個の引数で巨大');
  console.log('❌ 新しいクラスや依存を追加するたびに、このmain.tsを修正が必要');
  console.log('❌ テスト時に全ての依存をモック化するのが大変');
  console.log('❌ 依存関係が複雑で、どのクラスが何に依存しているか把握困難');

  console.log('\n💡 次のサンプル（05）では、DIコンテナを使ってこの問題を解決します！');
}

main();