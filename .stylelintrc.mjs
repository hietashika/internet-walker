/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-html'],
  rules: {
    // Astroの疑似クラス :global は指摘させない
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
  },
  overrides: [
    // *.astroファイルのカスタムプロパティは指摘させない
    {
      files: ['*.astro'],
      rules: {
        'custom-property-pattern': null,
      },
    },
  ],
};