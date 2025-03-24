# Astro Starter Kit

```sh
npm create astro@latest -- --template hietahika/astro-template
```

## 🧐 概要

高速で軽量なウェブサイト構築のためのモダンなスターターテンプレートです。Astroの優れたパフォーマンスと開発体験を活かしたプロジェクト構成になっています。

### ✨ 主な特徴

- **高速なパフォーマンス** - ゼロJSをデフォルトとし、必要な部分だけクライアントサイドJSを使用
- **TypeScriptサポート** - 型安全な開発環境を提供
- **モダンなCSS設計** - ITCSS+BEMによる構造化されたスタイリング
- **最適化済みビルド** - アセット圧縮を含む最適化されたビルドプロセス
- **開発者体験の向上** - BiomeとStylelintによるコード品質の管理
- **コンポーネント指向設計** - 再利用可能なUIコンポーネントによる効率的な開発

## 🚀 プロジェクト構成

```text
/
├── public/                 # 静的アセット（ファビコンなど）
│   └── favicon.svg
├── src/
│   ├── assets/             # 画像、アイコンなどのアセット
│   ├── components/         # 再利用可能なUIコンポーネント
│   │   ├── elements/       # レイアウトプリミティブ（Box, Stack, Cluster等）
│   │   │   └── base/       # 基本要素
│   │   ├── Button.astro    # 汎用的なUIコンポーネント
│   │   ├── Header.astro    # ヘッダーコンポーネント
│   │   ├── Footer.astro    # フッターコンポーネント
│   │   └── Section.astro   # セクションコンポーネント
│   ├── layouts/            # ページのレイアウト
│   │   └── Layout.astro    # 基本レイアウト
│   ├── pages/              # ルーティング用ページ
│   │   └── index.astro     # ホームページ
│   ├── utils/              # ユーティリティ関数
│   │   └── spacing.ts      # スペーシング制御用ヘルパー関数
│   └── styles/             # スタイル関連ファイル（ITCSS構成）
│       ├── settings/       # 変数や設定
│       │   └── _variables.scss # カラー、フォント、スペーシング等の変数
│       ├── tools/          # ミックスインや関数
│       │   └── _function.scss # レスポンシブ関数等
│       ├── generic/        # リセットやノーマライズ
│       │   └── _reset.css  # リセットCSS(destyle.css)
│       ├── elements/       # HTML要素の基本スタイル
│       │   └── _base.scss  # ベーススタイル
│       └── global.scss     # グローバルスタイルとレイヤー定義
├── .astro/                 # Astroの生成ファイル
├── .cursor/                # Cursorの設定とルール
├── .vscode/                # VSCodeの設定
├── astro.config.mjs        # Astroの設定
├── biome.jsonc             # Biomeの設定
├── package.json            # プロジェクト依存関係
├── tsconfig.json           # TypeScriptの設定
└── .stylelintrc.yaml       # Stylelintの設定
```

## 🛠️ 使用技術とプラグイン

### コア技術

- [Astro](https://astro.build/) - 高速なウェブサイト構築のためのフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- [SCSS](https://sass-lang.com/) - CSSの拡張言語

### Astro インテグレーション

- [@astrojs/mdx](https://docs.astro.build/ja/guides/integrations-guide/mdx/) - MDXサポート
- [@playform/compress](https://github.com/Playform/compress) - アセット圧縮

### 開発ツール

- [Biome](https://biomejs.dev/) - Rustで書かれた高速なリンターとフォーマッター
- [Stylelint](https://stylelint.io/) - SCSSのリンティング
- [sass-embedded](https://github.com/sass/sass-embedded) - SCSSコンパイラ

## 💡 設計思想

### コンポーネント指向設計

Astroをベースとしたコンポーネント指向の設計を採用しています。再利用可能なUIコンポーネントとレイアウトプリミティブを組み合わせて効率的な開発を実現します。

### CSS設計（ITCSS + BEM）

#### BEM命名規則

BEMは「Block, Element, Modifier」の略で、CSSクラス名を構造化し、コンポーネント間の関係を明確にします。

```
.blockName__elementName--modifierName
```

- **Block**: 独立した意味を持つコンポーネント（例: `.button`）
- **Element**: ブロックを構成する部品（例: `.button__icon`）
- **Modifier**: ブロックまたは要素の見た目や状態（例: `.button--primary`）

#### ITCSSレイヤー構成

ITCSSは「Inverted Triangle CSS」の略で、CSSを詳細度に基づいて階層化して管理する設計手法です。

```scss
@layer settings, tools, generic, elements, objects, components, utilities;
```

1. **Settings** - 変数や設定
2. **Tools** - ミックスインや関数
3. **Generic** - リセットやノーマライズ
4. **Elements** - HTML要素の基本スタイル
5. **Objects** - レイアウトパターン
6. **Components** - UIコンポーネント
7. **Utilities** - ユーティリティクラス

### アイランドアーキテクチャ

Astroのアイランドアーキテクチャを活用し、インタラクティブな部分のみをクライアントサイドでレンダリングすることで、パフォーマンスを向上させています。

## 💻 開発

```sh
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# ビルドのプレビュー
npm run preview

# コードのチェック
npm run check
```

## 🔄 最新バージョンへの更新

```sh
# 依存関係の更新
npm update
```

Astroの最新機能やアップデートについては、[公式ブログ](https://astro.build/blog/)で確認できます。

## 👀 ドキュメント

- [Astro 公式ドキュメント](https://docs.astro.build)
- [Biome ドキュメント](https://biomejs.dev/guides/getting-started)
- [Stylelint ドキュメント](https://stylelint.io/)

## 🤝 コントリビューション

プルリクエストや機能提案は大歓迎です。大きな変更を加える前に、まずissueを開いて議論することをお勧めします。

## 📝 ライセンス

[MIT](LICENSE)