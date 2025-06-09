import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigService } from './ConfigService';
import { Logger } from './Logger';
import { TemplateEngine } from './TemplateEngine';
import { Mailer } from './Mailer';
import { UserService } from './UserService';
import { NotificationService } from './NotificationService';
import { AppController } from './AppController';
import { TYPES } from './types';

/**
 * InversifyJS による解決版
 * 
 * 04の複雑な依存地獄を、DIコンテナで劇的に簡単にする！
 * 
 * 【ビフォー（04）】7つのクラスを手動で順序良く生成する必要があった
 * 【アフター（05）】container.get() 1行で全ての依存関係が自動解決！
 */
function main() {
  console.log('=== 05. InversifyJS による解決版（衝撃体験） ===\n');

  console.log('【DIコンテナの設定】');
  console.log('InversifyJSのコンテナを作成し、依存関係を登録します...\n');

  // DIコンテナを作成
  const container = new Container();

  // 全ての依存関係をコンテナに登録
  // ここでは「どのクラスを使うか」だけを宣言している
  console.log('📦 依存関係の登録中...');
  container.bind<ConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
  container.bind<TemplateEngine>(TYPES.TemplateEngine).to(TemplateEngine).inSingletonScope();
  container.bind<Mailer>(TYPES.Mailer).to(Mailer).inSingletonScope();
  container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
  container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService).inSingletonScope();
  container.bind<AppController>(TYPES.AppController).to(AppController);

  console.log('✅ 依存関係の登録完了！\n');

  console.log('【🎩 魔法の瞬間】');
  console.log('04では複雑だった依存関係の構築が、たった1行で完了します...\n');

  // ★★★ これが魔法！ ★★★
  // たった1行で、全ての依存関係が自動で解決される！
  console.log('⚡ container.get(AppController) 実行中...');
  const app = container.get<AppController>(TYPES.AppController);
  console.log('✨ 完了！全ての依存関係が自動で解決されました！\n');

  console.log('【04との比較】');
  console.log('❌ 04（手動DI）: 7つのクラスを順序良く手動生成 → 複雑で間違いやすい');
  console.log('✅ 05（DIコンテナ）: container.get() 1行で完了 → シンプルで安全\n');

  console.log('【実際の処理実行】');
  console.log('04と全く同じ処理ですが、依存関係の構築が圧倒的に簡単になりました！\n');
  
  // 04と全く同じ処理を実行
  app.handleUserRegistration({
    name: '佐藤花子',
    email: 'sato@example.com'
  });

  console.log('\n【この実装の利点】');
  console.log('✅ 依存関係の構築が1行で完了');
  console.log('✅ 依存の順序を考える必要がない（InversifyJSが自動で解決）');
  console.log('✅ 新しいクラスを追加しても、bind()を1行追加するだけ');
  console.log('✅ テスト時は別の実装をbind()するだけでモック化可能');
  console.log('✅ 依存関係が@injectで明示的で理解しやすい');
  console.log('✅ 同じ依存を何度も渡す必要がない');

  console.log('\n💡 次のサンプル（06）では、この魔法がどう動いているかを詳しく解説します！');
}

main();