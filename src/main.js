import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'highlight.js/styles/default.css' // 代码高亮的样式
import './vantbase.js'
import autoFocus from './directiveg/index.js'
Vue.use(autoFocus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
