<!-- 组件结构 -->
<template>
  <div id="app">
    <van-nav-bar title="头条-登录" />
    <van-form @submit="onSubmit">
      <van-field required v-model="user.mobile" name="mobile" label="手机号" placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写正确的手机号', pattern: /^1[3-9]\d{9}$/ }]" />
      <van-field required v-model="user.code" type="password" name="code" label="密码" placeholder="请输入密码"
        :rules="[{ required: true, message: '密码长度6-18位', pattern: /^\d{6,18}$/ }]" />
      <div style="margin: 16px;">
        <van-button :loading="isLoading" :disabled="isLoading" loading-text="加载中..."  round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<!-- 组件程序 -->
<script>
import { loginTo } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '13888457767',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      try {
        const res = await loginTo(this.user)
        console.log(res)
        this.isLoading = false
        setToken(res.data.data.token)
        // 成功通知
        Notify({ type: 'success', message: '登录成功' })
      } catch (err) {
        this.isLoading = false
        Notify({ type: 'danger', message: '登录失败' })
      }
    }
  }
}
</script>
<!-- 组件样式 -->
<style scoped lang="less">
</style>
