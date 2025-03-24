## ITCSSレイヤー構成の詳細ガイド

ITCSSは「Inverted Triangle CSS」の略で、CSSを詳細度に基づいて階層化して管理する設計手法です。このプロジェクトでは、ITCSSの思想に基づいて以下のレイヤー構成を採用しています。

レイヤーは常に以下の順序で読み込まれます：
```scss
@layer settings, tools, generic, elements, objects, components, utilities;
```

### 1. Settings - 設定レイヤー
**役割**: グローバル変数や設定を定義します。
**特徴**: CSSは出力されず、変数定義のみです。

**含まれるべきファイル**:
- `_variables.scss` - カラー、タイポグラフィ、スペーシング、ブレイクポイントなどの変数
- `_config.scss` - プロジェクト固有の設定（必要に応じて）

**使用例**:
```scss
// _variables.scss
$color-primary: #3b82f6;
$font-family-base: 'Noto Sans JP', sans-serif;
$space-unit: 0.25rem;
```

### 2. Tools - ツールレイヤー
**役割**: ミックスインや関数を定義します。
**特徴**: CSSは出力されず、再利用可能なロジックを提供します。

**含まれるべきファイル**:
- `_function.scss` - ユーティリティ関数（rem変換、clamp計算など）
- `_mixin.scss` - 再利用可能なスタイル定義（必要に応じて）

**使用例**:
```scss
// _function.scss
@function rem($size) {
  @return calc($size / 16 * 1rem);
}
```

### 3. Generic - 汎用レイヤー
**役割**: リセットやノーマライズなど、高い詳細度を持たないベースになるスタイルを定義します。
**特徴**: 詳細度が低く、ページ全体に影響します。

**含まれるべきファイル**:
- `_reset.css` - destyle.cssベースのリセットスタイル
- `_normalize.scss` - ブラウザ間の差異を正規化するスタイル（必要に応じて）
- `_box-sizing.scss` - box-sizingの定義（必要に応じて）

### 4. Elements - 要素レイヤー
**役割**: HTML要素自体のスタイルを定義します。
**特徴**: 要素セレクタ（h1, p, aなど）に対するスタイリングです。

**含まれるべきファイル**:
- `_base.scss` - 基本的なHTML要素のスタイル
- `_typography.scss` - タイポグラフィ関連のスタイル（必要に応じて）
- `_links.scss` - リンク要素のスタイル（必要に応じて）
- `_forms.scss` - フォーム要素のスタイル（必要に応じて）

**使用例**:
```scss
// _base.scss
html {
  font-family: var(--font-family-base);
  color: var(--color-text);
  line-height: 1.5;
}
```

### 5. Objects - オブジェクトレイヤー
**役割**: 装飾を持たない構造的なパターンを定義します。
**特徴**: コンテナ、グリッド、レイアウトなどの見た目に依存しない構造的なスタイルです。

**含まれるべきファイル**:
- `_container.scss` - コンテナ関連のスタイル
- `_grid.scss` - グリッドシステム
- `_layout.scss` - レイアウトパターン

**使用例**:
```scss
// _container.scss（未実装）
.o-container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--space-m);
}
```

### 6. Components - コンポーネントレイヤー
**役割**: 具体的なUIコンポーネントのスタイルを定義します。
**特徴**: 特定のUI要素に対する完全なスタイリングです。

**含まれるべきファイル**:
- `_buttons.scss` - ボタンスタイル
- `_cards.scss` - カードスタイル
- `_forms.scss` - フォームスタイル
- などコンポーネント毎のファイル

**使用例**:
```scss
// _buttons.scss（未実装）
.c-button {
  // ベーススタイル
  &--primary {
    // プライマリバリエーション
  }
}
```

### 7. Utilities - ユーティリティレイヤー
**役割**: 単一の目的を持つヘルパークラスを定義します。
**特徴**: 通常 !important フラグを使用し、他のすべてのスタイルをオーバーライドします。

**含まれるべきファイル**:
- `_spacing.scss` - マージンやパディングのユーティリティ
- `_typography.scss` - テキスト関連のユーティリティ
- `_display.scss` - 表示プロパティのユーティリティ
- `_visibility.scss` - 可視性のユーティリティ

**使用例**:
```scss
// _spacing.scss（未実装）
.u-mt-0 { margin-top: 0 !important; }
.u-mb-s { margin-bottom: var(--space-s) !important; }
```

## ITCSSの使用ガイドライン

1. **ファイル命名規則**:
   - アンダースコアでプレフィックスを付ける: `_filename.scss`
   - 複数の単語はハイフンで区切る: `_component-name.scss`

2. **インポート順序**:
   - 常にレイヤーの順序に従ってインポートする
   - 同じレイヤー内では、アルファベット順でインポートする

3. **セレクタの詳細度**:
   - 上位レイヤーほど詳細度を低く保つ
   - 下位レイヤーになるにつれて詳細度が高くなることを許容する

4. **!important の使用**:
   - utilitiesレイヤーでのみ使用可能
   - 他のレイヤーでは原則使用禁止 