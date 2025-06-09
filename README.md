# Dependency Injection (DI) サンプルコード

このリポジトリは、**Dependency Injection（依存性注入）** から **DI コンテナ（InversifyJS）** まで、段階的に学習するための完全なサンプルコードです。

📖 **解説記事**

- [第 1 弾: DI 基本概念](https://zenn.dev/manntera/articles/437829356d0117)
- [第 2 弾: DI コンテナ自動化](https://zenn.dev/manntera/articles/fab5e47e9cce0e)

## 🎯 目的

- DI の基本概念を段階的に学習
- 手動 DI の限界と DI コンテナの威力を体感
- InversifyJS による依存関係の自動解決を習得
- 実際のプロジェクトで使える実践的な知識を獲得

## 📁 プロジェクト構成

```
src/
├── 01-without-di/              # 【第1弾】従来の実装（DIなし）
│   ├── UserService.ts          # Loggerを内部生成（密結合）
│   ├── Logger.ts               # ログ出力クラス
│   └── main.ts                # 実行デモ
├── 02-basic-di/               # 【第1弾】基本的なDI実装
│   ├── UserService.ts          # Loggerをコンストラクタ注入
│   ├── Logger.ts               # ログ出力クラス
│   └── main.ts                # 実行デモ
├── 03-interface-di/           # 【第1弾】インターフェースを使ったDI
│   ├── interfaces/
│   │   └── ILogger.ts          # ログインターフェース
│   ├── UserService.ts          # ILoggerに依存
│   ├── ConsoleLogger.ts        # コンソール実装
│   ├── FileLogger.ts           # ファイル実装
│   └── main.ts                # 実行デモ
├── 04-complex-manual-di/      # 【第2弾】複雑な手動DI（問題提起）
│   ├── ConfigService.ts        # 環境設定サービス
│   ├── Logger.ts               # ログサービス
│   ├── TemplateEngine.ts       # テンプレート生成
│   ├── Mailer.ts               # メール送信
│   ├── UserService.ts          # ユーザー管理
│   ├── NotificationService.ts  # 通知サービス（5つの依存！）
│   ├── AppController.ts        # アプリ制御
│   └── main.ts                # new地獄の再現
├── 05-inversify-solution/     # 【第2弾】InversifyJS解決版（衝撃体験）
│   ├── ConfigService.ts        # @injectable対応版
│   ├── Logger.ts               # @inject対応版
│   ├── TemplateEngine.ts       # 各種デコレータ適用
│   ├── Mailer.ts
│   ├── UserService.ts
│   ├── NotificationService.ts
│   ├── AppController.ts
│   ├── types.ts               # Symbol識別子管理
│   └── main.ts                # 1行で全依存解決！
└── 06-inversify-basics/       # 【第2弾】InversifyJS仕組み解説
    ├── interfaces/
    │   ├── ILogger.ts          # ログインターフェース
    │   └── IUserService.ts     # ユーザーサービスIF
    ├── ConsoleLogger.ts        # コンソール実装
    ├── FileLogger.ts           # ファイル実装
    ├── DatabaseConnection.ts   # DB接続クラス
    ├── UserService.ts          # マルチ依存の実例
    ├── types.ts               # 識別子定義
    └── main.ts                # ステップバイステップ解説
```

## 🚀 セットアップ・実行方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 各段階のデモ実行

```bash
# === 第1弾: DI基本概念 ===
npm run demo:01  # DIを使わない従来の実装
npm run demo:02  # 基本的なDI実装
npm run demo:03  # インターフェースを使ったDI

# === 第2弾: DIコンテナ ===
npm run demo:04  # 複雑な手動DI（new地獄）
npm run demo:05  # InversifyJS解決版（衝撃体験）
npm run demo:06  # InversifyJS仕組み解説

# === 全サンプル一括実行 ===
npm run demo:all
```

## 📚 学習ステップ

### 🔰 **第 1 弾: DI 基本概念の習得**

#### Step 1: DI を使わない従来の実装 (`01-without-di/`)

**特徴:**

- `UserService`が内部で`new Logger()`を実行
- 密結合な設計

**問題点:**

- Logger の実装を変更したい場合、UserService のコードを修正する必要
- テスト時に Logger をモック化することが困難
- 依存関係が隠蔽されている

```typescript
class UserService {
  private logger = new Logger(); // 内部で生成（密結合）
}
```

#### Step 2: 基本的な DI 実装 (`02-basic-di/`)

**特徴:**

- `UserService`のコンストラクタで`Logger`を受け取る
- 依存関係の注入（Dependency Injection）

**改善点:**

- 疎結合な設計
- 依存関係が明示的
- テスト時にモック Logger を注入可能

```typescript
class UserService {
  constructor(private logger: Logger) {} // 外部から注入
}
```

#### Step 3: インターフェースを使った DI (`03-interface-di/`)

**特徴:**

- `UserService`が`ILogger`インターフェースに依存
- 複数の Logger 実装（`ConsoleLogger`, `FileLogger`）が利用可能

**最大の利点:**

- 具体的な実装ではなく、抽象（インターフェース）に依存
- Logger 実装を簡単に切り替え可能
- 新しい Logger 実装を追加しても既存コードに影響なし
- Open/Closed 原則を実現

```typescript
class UserService {
  constructor(private logger: ILogger) {} // インターフェースに依存
}
```

### 🚀 **第 2 弾: DI コンテナによる自動化**

#### Step 4: 複雑な手動 DI (`04-complex-manual-di/`)

**現実的な問題を体験:**

- 7 つのクラスが複雑に依存し合う構成
- `NotificationService`のコンストラクタが 5 つの引数
- 依存の生成順序を間違えるとエラー
- 同じ依存を複数箇所で生成する無駄

```typescript
// new地獄の例
const configService = new ConfigService();
const logger = new Logger(configService);
const templateEngine = new TemplateEngine(configService);
const mailer = new Mailer(configService, logger);
const userService = new UserService(logger, configService);
const notificationService = new NotificationService(
  userService,
  mailer,
  templateEngine,
  logger,
  configService
);
const appController = new AppController(notificationService, logger);
```

**学習効果:**「手動 DI では管理しきれない...」

#### Step 5: InversifyJS 解決版 (`05-inversify-solution/`)

**衝撃体験:**

- 04 と全く同じ機能を 1 行で実現
- 依存関係の自動解決
- コンテナによる一元管理

```typescript
// 魔法！たった1行で全依存関係が自動解決
const app = container.get<AppController>(TYPES.AppController);
```

**学習効果:**「DI コンテナすげー！」

#### Step 6: InversifyJS 仕組み解説 (`06-inversify-basics/`)

**詳細学習:**

- `@injectable()`, `@inject()` の役割
- `container.bind()`, `container.get()` の動作原理
- Symbol 識別子による型安全管理
- 実装の動的切り替え方法

```typescript
// ステップバイステップで仕組みを理解
@injectable()
class UserService {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
}
```

**学習効果:**「なるほど、こういう仕組みで動いてるのか！」

## 🔄 進化の全過程

| ステージ | 手法                | 特徴                           | 学習効果                    |
| -------- | ------------------- | ------------------------------ | --------------------------- |
| **01**   | DI なし             | `UserService` → `new Logger()` | 「密結合の問題を実感」      |
| **02**   | 基本 DI             | `UserService` → `Logger`       | 「疎結合の利点を理解」      |
| **03**   | インターフェース DI | `UserService` → `ILogger`      | 「抽象依存の威力を体感」    |
| **04**   | 複雑手動 DI         | 7 クラスの手動 new 地獄        | 「手動 DI の限界を痛感」    |
| **05**   | DI コンテナ         | `container.get()` 1 行解決     | 「DI コンテナの威力に感動」 |
| **06**   | 仕組み理解          | デコレータと自動解決           | 「魔法の原理を理解」        |

## ⚡ InversifyJS の主要機能

### 基本的な使い方

```typescript
// 1. 依存関係を登録
container.bind<ILogger>(TYPES.ILogger).to(ConsoleLogger);
container.bind<UserService>(TYPES.UserService).to(UserService);

// 2. 自動で依存解決してインスタンス取得
const userService = container.get<UserService>(TYPES.UserService);
```

### 実装の動的切り替え

```typescript
// 開発環境
container.bind<ILogger>(TYPES.ILogger).to(ConsoleLogger);

// 本番環境
container.bind<ILogger>(TYPES.ILogger).to(FileLogger);

// UserServiceのコードは一切変更不要！
```

## 💡 DI と DI コンテナの利点

### DI の利点

1. **疎結合（Loose Coupling）** - クラス間の依存関係が弱くなる
2. **テスタビリティ（Testability）** - モックオブジェクト注入が容易
3. **再利用性（Reusability）** - 異なる依存関係で再利用可能
4. **拡張性（Extensibility）** - 新実装追加時の既存コード影響なし

### DI コンテナの追加利点

5. **自動依存解決** - 複雑な依存関係も 1 行で取得
6. **一元管理** - 全ての依存関係をコンテナで管理
7. **型安全性** - TypeScript + Symbol 識別子で型安全
8. **ライフサイクル管理** - シングルトン等の自動管理

## 🎯 実際のプロジェクトでの活用

このサンプルで学んだ技術は以下のような場面で活用できます：

### Web API アプリケーション

```typescript
@injectable()
class UserController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IValidator) private validator: IValidator
  ) {}
}
```

### テスト駆動開発

```typescript
// テスト時はモック実装を注入
container.bind<IUserService>(TYPES.IUserService).to(MockUserService);
const controller = container.get<UserController>(TYPES.UserController);
```

### マイクロサービス

```typescript
// サービスごとに異なる実装を注入
container
  .bind<INotificationService>(TYPES.INotificationService)
  .to(EmailNotificationService); // メール特化サービス

container
  .bind<INotificationService>(TYPES.INotificationService)
  .to(SlackNotificationService); // Slack特化サービス
```

## 📝 参考文献

- [第 1 弾記事: Dependency Injection の基本概念](https://zenn.dev/manntera/articles/437829356d0117)
- [第 2 弾記事: DI コンテナによる依存解決の自動化](https://zenn.dev/manntera/articles/fab5e47e9cce0e)
- [InversifyJS 公式ドキュメント](https://inversify.io/)

---

**Happy Learning! 🎓**
