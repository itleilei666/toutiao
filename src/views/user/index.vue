<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="$store.state.userPhoto" alt="" class="avatar">
        </template>
        <template #title>
          <span class="username">{{$store.state.userName}}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{userBaseInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{userBaseInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{userBaseInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/user-edit" />
      <van-cell icon="chat-o" title="小思同学" is-link to="/chat" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="exit" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfoAPI, getUserPersonalInfoAPI } from '@/api'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/token'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userBaseInfo: {},
      userInfo: {}
    }
  },
  async created () {
    try {
      // 获取用户个人资料
      const res = await getUserInfoAPI()
      this.userInfo = res.data.data
      // 用户用户基本信息
      const res2 = await getUserPersonalInfoAPI()
      this.userBaseInfo = res2.data.data
      this.SET_USERPHOTO(this.userInfo.photo)
      this.SET_USERNAME(this.userInfo.name)
    } catch (error) {
      console.log(error.message)
    }
  },
  methods: {
    exit () {
      Dialog.confirm({
        title: '退出程序',
        message: '你真的要走吗？不爱了吗？🙁'
      })
        .then(() => {
          // on confirm
          removeToken()
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    ...mapMutations(['SET_USERPHOTO', 'SET_USERNAME'])
  }
}
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
