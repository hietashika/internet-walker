## フロントエンドのディレクトリ構成
Astroをベースとしたコンポーネント指向の設計を採用しています。再利用可能なUIコンポーネントとレイアウトプリミティブを組み合わせて効率的な開発を実現します。

```
astro-template/
├── public/ # 静的アセット
│   └── favicon.svg
├── src/
│   ├── components/ # 再利用可能なUIコンポーネント
│   │   ├── elements/ # レイアウトプリミティブ（Box, Stack, Cluster等）
│   │   │   └── base/ # 基本要素
│   │   ├── Button.astro # 汎用的なUIコンポーネント
│   │   ├── Header.astro # ヘッダーコンポーネント
│   │   ├── Footer.astro # フッターコンポーネント
│   │   ├── Section.astro # セクションコンポーネント
│   │   └── Welcome.astro # ウェルカムコンポーネント
│   ├── layouts/ # ページレイアウト
│   │   └── Layout.astro # 基本レイアウト
│   ├── pages/ # ルーティング用ページ
│   │   ├── index.astro # ホームページ
│   │   └── test.astro # テストページ
│   ├── styles/ # ITCSSに基づくスタイル構成
│   │   ├── settings/ # 変数や設定
│   │   │   └── _variables.scss # カラー、フォント、スペーシング等の変数
│   │   ├── tools/ # ミックスインや関数
│   │   │   └── _function.scss # レスポンシブ関数等
│   │   ├── generic/ # リセットやノーマライズ
│   │   │   └── _reset.css # リセットCSS(destyle.css)
│   │   ├── elements/ # HTML要素の基本スタイル
│   │   │   └── _base.scss # ベーススタイル
│   │   └── global.scss # グローバルスタイルとレイヤー定義
│   ├── utils/ # ユーティリティ関数
│   │   └── spacing.ts # スペーシング制御用ヘルパー関数
│   └── assets/ # 静的アセット（画像、フォントなど）
├── astro.config.mjs # Astro設定ファイル
├── package.json # プロジェクト依存関係
├── tsconfig.json # TypeScript設定
└── README.md # プロジェクトドキュメント
```

