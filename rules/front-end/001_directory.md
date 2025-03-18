## フロントエンドのディレクトリ構成
{ここに設計思想を記載}
{ex: 設計思想として、ドメイン駆動開発とオニオンアーキテクチャを採用しています。}

```
astro-template/
├── public/ # 静的アセット
│   └── favicon.svg
├── src/
│   ├── components/ # 再利用可能なUIコンポーネント
│   │   ├── ui/ # 汎用的なUIコンポーネント（ボタン、カード、入力フォームなど）
│   │   ├── layout/ # レイアウト関連コンポーネント（ヘッダー、フッター、サイドバーなど）
│   │   └── feature/ # 特定機能に関連するコンポーネント
│   ├── layouts/ # ページレイアウト
│   │   └── Layout.astro
│   ├── pages/ # ルーティング用ページ
│   │   └── index.astro
│   ├── styles/ # グローバルスタイル、変数、ミックスイン
│   │   ├── variables.scss # 変数定義
│   │   ├── mixins.scss # ミックスイン
│   │   ├── components.scss # コンポーネント共通スタイル
│   │   ├── reset.css # リセットCSS
│   │   └── global.scss # グローバルスタイル
│   ├── utils/ # ユーティリティ関数
│   │   ├── media.ts # メディアクエリ関連
│   │   ├── spacing.ts # スペーシング制御用ヘルパー関数
│   │   └── i18n/ # 国際化ユーティリティ（将来的な拡張用）
│   └── assets/ # 静的アセット（画像、フォントなど）
│       ├── astro.svg
│       └── background.svg
├── astro.config.mjs # Astro設定ファイル
├── package.json # プロジェクト依存関係
├── tsconfig.json # TypeScriptの設定やsrc内で頻繁に使用するディレクトリのパスエイリアス
└── README.md # プロジェクトドキュメント
```

