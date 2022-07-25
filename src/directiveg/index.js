import Vue from 'vue'
export default {
  install () {
    Vue.directive('autoFocus', {
      inserted (el) {
        const tagName = el.tagName
        if (tagName === 'TEXTAREA' || tagName === 'INPUT') {
          el.focus()
        } else {
          const input = el.querySelector('input')
          const textarea = el.querySelector('textarea')
          el = input || textarea
          el.focus()
        }
      },
      update (el) {
        const tagName = el.tagName
        if (tagName === 'TEXTAREA' || tagName === 'INPUT') {
          el.focus()
        } else {
          const input = el.querySelector('input')
          const textarea = el.querySelector('textarea')
          el = input || textarea
          el.focus()
        }
      }
    })
  }
}
