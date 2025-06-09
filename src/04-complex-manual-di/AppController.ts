import { NotificationService } from './NotificationService';
import { Logger } from './Logger';

export interface UserRegistrationData {
  name: string;
  email: string;
}

/**
 * アプリケーションのメインコントローラー
 * NotificationServiceとLoggerに依存
 */
export class AppController {
  constructor(
    private notificationService: NotificationService,
    private logger: Logger
  ) {}

  handleUserRegistration(userData: UserRegistrationData): void {
    this.logger.info(`Processing user registration for: ${userData.name}`);
    
    try {
      // ユーザー登録処理（実際の実装では UserService を直接呼ぶこともある）
      console.log(`🎉 New user registered: ${userData.name} (${userData.email})`);
      
      // ウェルカム通知を送信（ここではダミーのユーザーIDを使用）
      const dummyUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      this.notificationService.sendWelcomeNotification(dummyUserId);
      
      this.logger.log(`User registration completed successfully for: ${userData.name}`);
    } catch (error) {
      this.logger.error(`User registration failed for ${userData.name}: ${error}`);
      throw error;
    }
  }

  handlePasswordReset(userId: string): void {
    this.logger.info(`Processing password reset for user: ${userId}`);
    
    try {
      this.notificationService.sendPasswordResetNotification(userId);
      this.logger.log(`Password reset processed successfully for user: ${userId}`);
    } catch (error) {
      this.logger.error(`Password reset failed for user ${userId}: ${error}`);
      throw error;
    }
  }

  handleSystemMaintenance(): void {
    this.logger.info('Starting system maintenance notification');
    
    const message = 'Our system will be under maintenance from 2:00 AM to 4:00 AM (JST) tomorrow. Please save your work and log out before that time.';
    
    this.notificationService.sendBulkNotification(message);
    this.logger.log('System maintenance notification completed');
  }
}