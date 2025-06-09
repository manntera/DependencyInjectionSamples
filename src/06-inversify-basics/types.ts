/**
 * InversifyJS用の型識別子
 * 
 * 【重要】interfaceは実行時に存在しないため、
 * 代わりにSymbolを使って依存を識別する
 * 
 * 文字列 "ILogger" より Symbol("ILogger") の方が安全
 * → 文字列は重複しやすく、予期しないバグの原因になる
 */
export const TYPES = {
  // インターフェース用の識別子
  ILogger: Symbol('ILogger'),
  IUserService: Symbol('IUserService'),
  
  // 具象クラス用の識別子（interfaceがない場合）
  DatabaseConnection: Symbol('DatabaseConnection'),
};