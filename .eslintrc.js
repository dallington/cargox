module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'prettier'],
  plugins: ['vue', 'prettier'],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'import/no-extraneous-dependencies': 'off',
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@assets', './src/assets'],
          ['@views', './src/views'],
        ],
        extensions: ['.js', '.svg', '.vue', '.json'],
      },
    },
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
