import { Toast } from 'vant'
export default ({ message, type }) => {
  if (type === 'danger') {
    type = 'fail'
  }
  Toast({
    message,
    type
  })
}
