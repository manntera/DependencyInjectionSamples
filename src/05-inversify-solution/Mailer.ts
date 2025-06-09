import { injectable, inject } from 'inversify';
import { ConfigService } from './ConfigService';
import { Logger } from './Logger';
import { TYPES } from './types';

/**
 * メール送信サービス
 * ConfigServiceとLoggerに依存
 */
@injectable()
export class Mailer {
  constructor(
    @inject(TYPES.ConfigService) private config: ConfigService,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  sendEmail(to: string, subject: string, htmlBody: string): void {
    const mailConfig = this.config.getMailConfig();
    
    this.logger.info(`Connecting to mail server: ${mailConfig.server}:${mailConfig.port}`);
    this.logger.info(`Authenticating with user: ${mailConfig.user}`);
    
    // 実際のメール送信処理はここでは省略
    console.log(`📧 Email sent successfully!`);
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Server: ${mailConfig.server}:${mailConfig.port}`);
    
    this.logger.log(`Email sent to ${to} with subject: "${subject}"`);
  }

  sendBulkEmail(recipients: string[], subject: string, htmlBody: string): void {
    this.logger.info(`Starting bulk email send to ${recipients.length} recipients`);
    
    recipients.forEach(recipient => {
      this.sendEmail(recipient, subject, htmlBody);
    });
    
    this.logger.log(`Bulk email completed. Sent to ${recipients.length} recipients`);
  }
}