import { injectable, inject } from 'inversify';
import { NotificationService } from './NotificationService';
import { Logger } from './Logger';
import { UserService } from './UserService';
import { TYPES } from './types';

export interface UserRegistrationData {
  name: string;
  email: string;
}

/**
 * アプリケーションのメインコントローラー
 * NotificationService、Logger、UserServiceに依存
 */
@injectable()
export class AppController {
  constructor(
    @inject(TYPES.NotificationService) private notificationService: NotificationService,
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  handleUserRegistration(userData: UserRegistrationData): void {
    this.logger.info(`Processing user registration for: ${userData.name}`);
    
    try {
      // 実際にユーザーを作成
      const user = this.userService.createUser(userData.name, userData.email);
      console.log(`🎉 New user registered: ${userData.name} (${userData.email})`);
      
      // ウェルカム通知を送信
      this.notificationService.sendWelcomeNotification(user.id);
      
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