<template>
    <div class="user-edit-container">
        <!-- Header 区域 -->
        <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

        <!-- 用户资料 -->
        <van-cell-group class="action-card">
            <van-cell title="头像" is-link center>
                <template #default>
                    <van-image round class="avatar" :src="userObj.photo" @click="upload" />
                    <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
                </template>
            </van-cell>
            <van-cell title="名称" is-link :value="userObj.name" @click="updateName" />
            <van-cell title="生日" is-link :value="userObj.birthday" @click="updateBirthday" />
        </van-cell-group>
        <van-dialog :beforeClose="beforeClose" v-model="show" title="修改用户名" show-cancel-button>
            <input @blur="blur" v-model="uName" v-autoFocus type="text">
        </van-dialog>
        <van-popup position="bottom" v-model="showDate">
            <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate"
                :max-date="maxDate" @cancel="cancel" @confirm="confirm" />
        </van-popup>
    </div>
</template>

<script>
import { getUserInfoAPI, setUserHead, setUserEdit } from '@/api'
import { Notify } from 'vant'
import { formatDate } from '@/utils/date'
export default {
  name: 'UserEdit',
  data () {
    return {
      userObj: {},
      uName: '',
      show: false,
      showDate: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17)
    }
  },
  async created () {
    const res = await getUserInfoAPI()
    this.userObj = res.data.data
  },
  methods: {
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      const file = e.target.files[0]
      const fd = new FormData()
      fd.append('photo', file)
      try {
        const res = await setUserHead(fd)
        this.userObj.photo = res.data.data.photo
      } catch (error) {
        console.log(error.message)
      }
    },
    upload () {
      this.$refs.iptFile.click()
    },
    updateName () {
      this.show = true
    },
    blur (el) {
      el.target.focus()
    },
    async beforeClose (action, done) {
      if (action === 'confirm') {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,11}$/
        if (reg.test(this.uName)) {
          try {
            await setUserEdit({ name: this.uName })
            this.userObj.name = this.uName
          } catch (error) {
            console.log(error.message)
          }
          done()
        } else {
          Notify({ type: 'warning', message: '名称应该时由1-11位数字字母组合' })
        }
      } else {
        done()
      }
    },
    updateBirthday () {
      this.showDate = true
      this.currentDate = new Date(this.userObj.birthday)
    },
    cancel () {
      this.showDate = false
    },
    async confirm () {
      const birthday = formatDate(this.currentDate)
      await setUserEdit({ birthday: birthday })
      this.userObj.birthday = birthday
      this.showDate = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
    padding-top: 46px;

    .avatar {
        width: 50px;
        height: 50px;
    }
}

/deep/ .van-dialog__content {
    text-align: center;

    input {
        border: none;
        outline: none;
        text-align: center;
    }
}
</style>
