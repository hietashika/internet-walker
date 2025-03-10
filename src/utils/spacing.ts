/**
 * スペーシング属性の値からクラス名を生成するヘルパー関数
 * padding, margin, gap などのスペーシング属性に使用可能
 * 
 * @param value - 属性値（例：'1', '-2', '3'）
 * @param prefix - クラス名のプレフィックス（例：'padding', 'margin', 'gap'）
 * @returns 生成されたクラス名（例：'padding-1', 'margin-neg-2'）
 */
export function getSpacingClass(value: string | undefined, prefix: string): string {
  if (!value) return '';
  
  // マイナス値の処理
  if (value.startsWith('-')) {
    return `${prefix}-neg-${value.substring(1)}`;
  }
  
  return `${prefix}-${value}`;
}

/**
 * 複数のスペーシング属性からクラス名を生成するヘルパー関数
 * 
 * @param values - 属性値のオブジェクト（例：{ padding: '1', margin: '2' }）
 * @returns 生成されたクラス名の配列
 */
export function getSpacingClasses(values: Record<string, string | undefined>): string[] {
  return Object.entries(values)
    .filter(([_, value]) => value !== undefined)
    .map(([prefix, value]) => getSpacingClass(value, prefix));
} 