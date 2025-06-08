# Dependency Injection (DI) サンプルコード

このリポジトリは、**Dependency Injection（依存性注入）** の概念を段階的に理解するためのサンプルコードです。

## 🎯 目的

- DIの基本概念を段階的に学習
- 従来の実装とDIの違いを比較
- インターフェースを使ったDIの利点を体験

## 📁 プロジェクト構成

```
src/
├── 01-without-di/          # 従来の実装（DIなし）
│   ├── UserService.ts      # Loggerを内部生成（密結合）
│   ├── Logger.ts           # ログ出力クラス
│   └── main.ts            # 実行デモ
├── 02-basic-di/           # 基本的なDI実装
│   ├── UserService.ts      # Loggerをコンストラクタ注入
│   ├── Logger.ts           # ログ出力クラス
│   └── main.ts            # 実行デモ
└── 03-interface-di/       # インターフェースを使ったDI
    ├── interfaces/
    │   └── ILogger.ts      # ログインターフェース
    ├── UserService.ts      # ILoggerに依存
    ├── ConsoleLogger.ts    # コンソール実装
    ├── FileLogger.ts       # ファイル実装
    └── main.ts            # 実行デモ
```

## 🚀 セットアップ・実行方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 各段階のデモ実行

```bash
# 01. DIを使わない従来の実装
npm run demo:01

# 02. 基本的なDI実装
npm run demo:02

# 03. インターフェースを使ったDI
npm run demo:03
```

## 📚 学習ステップ

### Step 1: DIを使わない従来の実装 (`01-without-di/`)

**特徴:**
- `UserService`が内部で`new Logger()`を実行
- 密結合な設計

**問題点:**
- Loggerの実装を変更したい場合、UserServiceのコードを修正する必要
- テスト時にLoggerをモック化することが困難
- 依存関係が隠蔽されている

```typescript
class UserService {
  private logger = new Logger(); // 内部で生成（密結合）
}
```

### Step 2: 基本的なDI実装 (`02-basic-di/`)

**特徴:**
- `UserService`のコンストラクタで`Logger`を受け取る
- 依存関係の注入（Dependency Injection）

**改善点:**
- 疎結合な設計
- 依存関係が明示的
- テスト時にモックLoggerを注入可能

```typescript
class UserService {
  constructor(private logger: Logger) {} // 外部から注入
}
```

### Step 3: インターフェースを使ったDI (`03-interface-di/`)

**特徴:**
- `UserService`が`ILogger`インターフェースに依存
- 複数のLogger実装（`ConsoleLogger`, `FileLogger`）が利用可能

**最大の利点:**
- 具体的な実装ではなく、抽象（インターフェース）に依存
- Logger実装を簡単に切り替え可能
- 新しいLogger実装を追加しても既存コードに影響なし
- Open/Closed原則を実現

```typescript
class UserService {
  constructor(private logger: ILogger) {} // インターフェースに依存
}
```

## 🔄 DIの進化過程

1. **DIなし**: `UserService` → `new Logger()` （密結合）
2. **基本DI**: `UserService` → `Logger` （疎結合だが具体クラスに依存）
3. **インターフェースDI**: `UserService` → `ILogger` （抽象に依存、最も柔軟）

## 💡 DIの主要な利点

### 1. 疎結合（Loose Coupling）
- クラス間の依存関係が弱くなる
- 一つのクラスの変更が他のクラスに与える影響を最小化

### 2. テスタビリティ（Testability）
- テスト時にモックオブジェクトを注入可能
- 単体テストが書きやすくなる

### 3. 再利用性（Reusability）
- 同じクラスを異なる依存関係で再利用可能
- 設定によって動作を変更できる

### 4. 拡張性（Extensibility）
- 新しい実装を追加しても既存コードを変更する必要がない
- Open/Closed原則に従った設計

## 🎯 次のステップ

このサンプルでDIの基本概念を理解したら、以下のトピックに進むことをお勧めします：

- **DIコンテナ** - 依存関係の自動解決
- **テスト駆動開発** - DIを活用したテスト戦略
- **より複雑な依存関係** - 複数の依存関係を持つクラス
- **ライフサイクル管理** - シングルトン、ファクトリーパターンなど

## 📝 参考文献

- [記事: Dependency Injectionの基本概念](https://zenn.dev/manntera/articles/437829356d0117)

---

**Happy Learning! 🎓**