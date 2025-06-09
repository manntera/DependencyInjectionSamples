/**
 * InversifyJS用の型識別子
 * 
 * Symbolを使うことで、文字列の重複によるバグを防ぐ
 * 全ての依存関係の識別子をここで管理
 */
export const TYPES = {
  ConfigService: Symbol('ConfigService'),
  Logger: Symbol('Logger'),
  TemplateEngine: Symbol('TemplateEngine'),
  Mailer: Symbol('Mailer'),
  UserService: Symbol('UserService'),
  NotificationService: Symbol('NotificationService'),
  AppController: Symbol('AppController'),
};