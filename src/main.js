import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider } from 'vant'
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Row)
Vue.use(Search)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
const autoFocus = {
  install (Vue) {
    Vue.directive('autoFocus', {
      inserted (el) {
        const input = el.querySelector('input')
        input.focus()
      }
    })
  }
}
Vue.use(autoFocus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
