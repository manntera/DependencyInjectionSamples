/**
 * 環境設定を管理するサービス
 * アプリケーションの設定値を取得する
 */
export class ConfigService {
  private config = {
    databaseUrl: 'mysql://localhost:3306/app',
    logLevel: 'info',
    mailServer: 'smtp.example.com',
    mailPort: 587,
    mailUser: 'admin@example.com',
    appName: 'Sample App'
  };

  getConfig(key: string): string {
    return (this.config as any)[key] || '';
  }

  getDatabaseUrl(): string {
    return this.config.databaseUrl;
  }

  getLogLevel(): string {
    return this.config.logLevel;
  }

  getMailConfig(): { server: string; port: number; user: string } {
    return {
      server: this.config.mailServer,
      port: this.config.mailPort,
      user: this.config.mailUser
    };
  }

  getAppName(): string {
    return this.config.appName;
  }
}