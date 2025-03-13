/**
 * スペーシング属性の値からクラス名を生成するヘルパー関数
 * padding, margin, gap などのスペーシング属性に使用可能
 *
 * @param value - 属性値（例：'1', '-2', '3'）
 * @param prefix - クラス名のプレフィックス（例：'padding', 'margin', 'gap'）
 * @returns 生成されたクラス名（例：'padding--1', 'margin--neg2'）
 */
export function getSpacingClass(
	value: string | undefined,
	prefix: string,
): string {
	if (!value) return "";

	// マイナス値の処理
	if (value.startsWith("-")) {
		return `${prefix}--neg${value.substring(1)}`;
	}

	return `${prefix}--${value}`;
}

/**
 * 複数のスペーシング属性からクラス名を生成するヘルパー関数
 *
 * @param values - 属性値のオブジェクト（例：{ padding: '1', margin: '2' }）
 * @returns 生成されたクラス名の配列
 */
export function getSpacingClasses(
	values: Record<string, string | undefined>,
): string[] {
	return Object.entries(values)
		.filter(([_, value]) => value !== undefined)
		.map(([prefix, value]) => getSpacingClass(value, prefix));
}

/**
 * Gapプロパティのための特殊なクラス名生成ヘルパー関数
 * スペースで区切られた2つの値（row-gap column-gap）をサポート
 *
 * @param value - gap属性値（例：'1', '2 3'）
 * @param options - オプション設定
 * @returns 生成されたクラス名または複数のクラス名
 */
export function getGapClasses(
	value: string | undefined,
	options: {
		useDimensionalProps?: boolean; // trueの場合row-gap/column-gap属性を使用、falseの場合クラス名を使用
		rowPrefix?: string; // 行方向のプロパティ名・クラス名（デフォルト: 'rowGap'）
		columnPrefix?: string; // 列方向のプロパティ名・クラス名（デフォルト: 'columnGap'）
		defaultPrefix?: string; // 単一値の場合のプロパティ名・クラス名（デフォルト: 'gap'）
	} = {},
): string[] | Record<string, string> {
	const {
		useDimensionalProps = false,
		rowPrefix = "rowGap",
		columnPrefix = "columnGap",
		defaultPrefix = "gap",
	} = options;

	if (!value) return useDimensionalProps ? {} : [];

	// スペースで区切られた値かチェック
	const values = value.trim().split(/\s+/);

	if (values.length === 1) {
		// 単一の値の場合
		return useDimensionalProps
			? { [defaultPrefix]: value }
			: [getSpacingClass(value, defaultPrefix)];
	} else if (values.length === 2) {
		// 2つの値がある場合、row-gapとcolumn-gap
		const [rowGap, columnGap] = values;

		return useDimensionalProps
			? { [rowPrefix]: rowGap, [columnPrefix]: columnGap }
			: [
					getSpacingClass(rowGap, rowPrefix),
					getSpacingClass(columnGap, columnPrefix),
				];
	}

	// 不正な形式の場合
	return useDimensionalProps ? {} : [];
}
