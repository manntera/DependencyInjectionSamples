import { injectable, inject } from 'inversify';
import { UserService } from './UserService';
import { Mailer } from './Mailer';
import { TemplateEngine } from './TemplateEngine';
import { Logger } from './Logger';
import { ConfigService } from './ConfigService';
import { TYPES } from './types';

/**
 * 通知サービス
 * UserService, Mailer, TemplateEngine, Logger, ConfigServiceに依存
 * 
 * @inject を使って各依存を明示的に指定
 * 04と同じ複雑な依存関係だが、InversifyJSが自動解決してくれる！
 */
@injectable()
export class NotificationService {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Mailer) private mailer: Mailer,
    @inject(TYPES.TemplateEngine) private templateEngine: TemplateEngine,
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.ConfigService) private config: ConfigService
  ) {}

  sendWelcomeNotification(userId: string): void {
    this.logger.info(`Starting welcome notification for user: ${userId}`);
    
    const user = this.userService.getUser(userId);
    if (!user) {
      this.logger.error(`Cannot send welcome notification: User ${userId} not found`);
      return;
    }

    const htmlContent = this.templateEngine.generateWelcomeTemplate(user.name);
    const subject = `Welcome to ${this.config.getAppName()}!`;
    
    this.mailer.sendEmail(user.email, subject, htmlContent);
    this.logger.log(`Welcome notification sent to ${user.name} (${user.email})`);
  }

  sendPasswordResetNotification(userId: string): void {
    this.logger.info(`Starting password reset notification for user: ${userId}`);
    
    const user = this.userService.getUser(userId);
    if (!user) {
      this.logger.error(`Cannot send password reset: User ${userId} not found`);
      return;
    }

    // パスワードリセットリンクを生成（実際の実装では安全なトークンを使用）
    const resetLink = `https://example.com/reset-password?token=abc123&user=${userId}`;
    const htmlContent = this.templateEngine.generatePasswordResetTemplate(user.name, resetLink);
    const subject = `Password Reset - ${this.config.getAppName()}`;
    
    this.mailer.sendEmail(user.email, subject, htmlContent);
    this.logger.log(`Password reset notification sent to ${user.name} (${user.email})`);
  }

  sendBulkNotification(message: string): void {
    this.logger.info('Starting bulk notification to all users');
    
    const users = this.userService.getAllUsers();
    const recipients = users.map(user => user.email);
    const subject = `Important Notice from ${this.config.getAppName()}`;
    
    // シンプルなHTMLテンプレート
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${subject}</title>
</head>
<body>
    <h1>Important Notice</h1>
    <p>${message}</p>
    <p>Best regards,<br>The ${this.config.getAppName()} Team</p>
</body>
</html>`;

    this.mailer.sendBulkEmail(recipients, subject, htmlContent);
    this.logger.log(`Bulk notification sent to ${users.length} users`);
  }
}