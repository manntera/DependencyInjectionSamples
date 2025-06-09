import { ConfigService } from './ConfigService';

/**
 * テンプレートエンジン
 * ConfigServiceに依存してアプリ名などを取得
 */
export class TemplateEngine {
  constructor(private config: ConfigService) {}

  generateWelcomeTemplate(userName: string): string {
    const appName = this.config.getAppName();
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to ${appName}</title>
</head>
<body>
    <h1>Welcome ${userName}!</h1>
    <p>Thank you for joining ${appName}. We're excited to have you on board!</p>
    <p>Best regards,<br>The ${appName} Team</p>
</body>
</html>`;
  }

  generatePasswordResetTemplate(userName: string, resetLink: string): string {
    const appName = this.config.getAppName();
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Password Reset - ${appName}</title>
</head>
<body>
    <h1>Password Reset Request</h1>
    <p>Hello ${userName},</p>
    <p>You requested a password reset for your ${appName} account.</p>
    <p><a href="${resetLink}">Click here to reset your password</a></p>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br>The ${appName} Team</p>
</body>
</html>`;
  }
}