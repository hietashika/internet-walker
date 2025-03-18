## 既存ファイルの例
常にこれらのファイルの記法を参考にして、実装を行ってください。

### Astro Element
- [BaseElement.astro](astro:src/components/elements/BaseElement.astro)
  - DRY原則を守り、Elementの実装を共通化する。
- [Link.astro](astro:src/components/elements/Link.astro)
  - BaseElementを継承して、リンクを表示するためのコンポーネントを作成する。

### Astro Component
- [Button.astro](astro:src/components/Button.astro)
  - Elementを継承して、ボタンを表示するためのコンポーネントを作成する。

### Astro Layout
- [Layout.astro](astro:src/layouts/Layout.astro)
  - ページのレイアウトを作成する。

### Astro Page
- [Index.astro](astro:src/pages/Index.astro)
  - ホームページを作成する。

### Astro Style
- [global.scss](astro:src/styles/global.scss)
  - グローバルなスタイルを定義する。
  - ITCSSを採用して、スタイルを管理する。