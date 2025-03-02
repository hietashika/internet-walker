# Astro Starter Kit

```sh
npm create astro@latest -- --template hietahika/astro-template
```

## 🚀 プロジェクト構成

```text
/
├── public/                 # 静的アセット（ファビコンなど）
│   └── favicon.svg
├── src/
│   ├── assets/             # 画像、アイコンなどのアセット
│   ├── components/         # 再利用可能なUIコンポーネント
│   ├── layouts/            # ページのレイアウト
│   │   └── Layout.astro
│   ├── pages/              # ルーティング用ページ
│   │   └── index.astro
│   └── styles/             # スタイル関連ファイル
│       ├── elements/       # HTML要素の基本的なスタイル
│       ├── generic/        # リセットCSSなど
│       ├── settings/       # 変数や設定
│       ├── tools/          # ミックスインや関数
│       └── global.scss     # グローバルスタイル
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

## 💻 開発

```sh
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# ビルドのプレビュー
npm run preview

# コードのチェック
npm run check
```

## 👀 ドキュメント

- [Astro 公式ドキュメント](https://docs.astro.build)
- [Biome ドキュメント](https://biomejs.dev/guides/getting-started)
- [Stylelint ドキュメント](https://stylelint.io/)