<template>
    <div>
        <!-- 评论列表 -->
        <div class="cmt-list" :class="{ 'art-cmt-container-1': isShow, 'art-cmt-container-2': !isShow }">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                :immediate-check="false">
                <!-- 评论的 Item 项 -->
                <div class="cmt-item" v-for="(obj,index) in commentsList" :key="index">
                    <!-- 头部区域 -->
                    <div class="cmt-header">
                        <!-- 头部左侧 -->
                        <div class="cmt-header-left">
                            <img :src="obj.aut_photo" alt="" class="avatar">
                            <span class="uname">{{ obj.aut_name }}</span>
                        </div>
                        <!-- 头部右侧 -->
                        <div class="cmt-header-right">
                            <van-icon name="like" size="16" color="red" v-if="obj.is_liking === true"
                                @click="likeFn(true, obj)" />
                            <van-icon name="like-o" size="16" color="gray" @click="likeFn(false, obj)" v-else />
                        </div>
                    </div>
                    <!-- 主体区域 -->
                    <div class="cmt-body">
                        {{ obj.content }}
                    </div>
                    <!-- 尾部区域 -->
                    <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
                </div>
            </van-list>
        </div>
        <!-- 底部添加评论区域 - 1 -->
        <div v-if="isShow" class="add-cmt-box van-hairline--top">
            <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
            <div class="ipt-cmt-div" @click="isShow = false">发表评论</div>
            <div class="icon-box" @click="moveTo">
                <van-badge :content="totalCount === 0 ? '' : totalCount" max="99">
                    <van-icon name="comment-o" size="0.53333334rem" />
                </van-badge>
                <van-icon name="star-o" size="0.53333334rem" />
                <van-icon name="share-o" size="0.53333334rem" />
            </div>
        </div>

        <!-- 底部添加评论区域 - 2 -->
        <div v-else class="cmt-box van-hairline--top">
            <textarea @input="input" v-model.trim="content" v-autoFocus placeholder="友善评论、理性发言、阳光心灵"
                @blur="blur"></textarea>
            <van-button type="default" :disabled="isDisabled" @click="fabu">发布</van-button>
        </div>
    </div>
</template>

<script>
import { getArtCommentsAPI, comLiking, unComLiking, putCommentAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  data () {
    return {
      offset: null,
      commentsList: [],
      isShow: true,
      content: '',
      isDisabled: true,
      totalCount: 0,
      loading: false,
      finished: false,
      last_id: null
    }
  },
  async created () {
    const res = await getArtCommentsAPI({ artId: this.$route.query.article_id })
    this.commentsList = res.data.data.results
    this.totalCount = res.data.data.total_count
    this.last_id = res.data.data.last_id
    if (this.commentsList.length === 0) {
      this.finished = true
    }
  },
  methods: {
    async onLoad () {
      if (this.commentsList.length > 0) {
        //
        const res = await getArtCommentsAPI({ artId: this.$route.query.article_id, offset: this.last_id })
        this.commentsList = [...this.commentsList, ...res.data.data.results]
        this.totalCount = res.data.data.total_count
        this.last_id = res.data.data.last_id
        if (this.last_id === null) {
          this.finished = true
        }
      } else {
        this.loading = false
      }
    },
    timeAgo,
    async likeFn (b, obj) {
      if (b) {
        obj.is_liking = false
        // 取消点赞
        await unComLiking(obj.com_id)
      } else {
        obj.is_liking = true
        // 点赞
        await comLiking(obj.com_id)
      }
    },
    async fabu () {
      const res = await putCommentAPI({
        target: this.$route.query.article_id,
        content: this.content
      })
      const obj = res.data.data.new_obj
      this.commentsList.unshift(obj)
      this.totalCount += 1
      this.moveTo()
    },
    input () {
      if (this.content.length > 0) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    blur () {
      setTimeout(() => {
        this.isShow = true
        this.content = ''
        this.isDisabled = true
      })
    },
    moveTo () {
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
    padding: 10px;

    .cmt-item {
        padding: 15px 0;

        +.cmt-item {
            border-top: 1px solid #f8f8f8;
        }

        .cmt-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cmt-header-left {
                display: flex;
                align-items: center;

                .avatar {
                    width: 40px;
                    height: 40px;
                    background-color: #f8f8f8;
                    border-radius: 50%;
                    margin-right: 15px;
                }

                .uname {
                    font-size: 12px;
                }
            }
        }

        .cmt-body {
            font-size: 14px;
            line-height: 28px;
            text-indent: 2em;
            margin-top: 6px;
            word-break: break-all;
        }

        .cmt-footer {
            font-size: 12px;
            color: gray;
            margin-top: 10px;
        }
    }
}

/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
    padding-bottom: 46px;
}

.art-cmt-container-2 {
    padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;

    .ipt-cmt-div {
        flex: 1;
        border: 1px solid #efefef;
        border-radius: 15px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        padding-left: 15px;
        margin-left: 10px;
        background-color: #f8f8f8;
    }

    .icon-box {
        width: 40%;
        display: flex;
        justify-content: space-evenly;
        line-height: 0;
    }
}

.child {
    width: 20px;
    height: 20px;
    background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: white;

    textarea {
        flex: 1;
        height: 66%;
        border: 1px solid #efefef;
        background-color: #f8f8f8;
        resize: none;
        border-radius: 6px;
        padding: 5px;
    }

    .van-button {
        height: 100%;
        border: none;
    }
}
</style>
