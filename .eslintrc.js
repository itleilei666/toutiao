module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // files: ['src/views/index.vue','src/views/**/index.vue'],   // 匹配views和二级目录中的index.vue
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/multi-word-component-names': 'off',
    'vue/multi-word-component-names': ['error', {
      ignores: ['index']// 需要忽略的组件名
    }]
  }
}
