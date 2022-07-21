  <template>
    <div>
        <!-- Header 区域 -->
        <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

        <!-- 文章信息区域 -->
        <div class="article-container">
            <!-- 文章标题 -->
            <h1 class="art-title">{{artObj.title}}</h1>

            <!-- 用户信息 -->
            <van-cell center :title="artObj.aut_name" :label="timeAgo(artObj.pubdate)">
                <template #icon>
                    <img :src="artObj.aut_photo" alt="" class="avatar">
                </template>
                <template #default>
                    <div>
                        <van-button @click="follwing(true)" type="info" size="mini" v-if="artObj.is_followed">已关注</van-button>
                        <van-button @click="follwing(false)" v-else icon="plus" type="info" size="mini" plain>关注</van-button>
                    </div>
                </template>
            </van-cell>

            <!-- 分割线 -->
            <van-divider></van-divider>

            <!-- 文章内容 -->
            <div class="art-content" v-html="artObj.content"></div>

            <!-- 分割线 -->
            <van-divider>End</van-divider>

            <!-- 点赞 -->
            <div class="like-box">
                <van-button @click="loveFn (true) " v-if="artObj.attitude===1" icon="good-job" type="danger" size="small">已点赞</van-button>
                <van-button  @click="loveFn (false) " v-else icon="good-job-o" type="danger" plain size="small">点赞</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getArtDetailAPI, userfollowingsAPI, unUserfollowingsAPI, artLiking, unArtLiking } from '@/api'
//, userfollowingsAPI, unUserfollowingsAPI
import { timeAgo } from '@/utils/date'
export default {
  data () {
    return {
      artObj: {}
    }
  },
  async created () {
    const res = await getArtDetailAPI(this.$route.query.article_id)
    this.artObj = res.data.data
  },
  methods: {
    timeAgo,
    async follwing (b) {
      if (b) {
        // 点击了已关注按钮
        this.artObj.is_followed = false
        // 说明要取消关注
        await unUserfollowingsAPI(this.artObj.aut_id)
      } else {
        this.artObj.is_followed = true
        await userfollowingsAPI(this.artObj.aut_id)
      }
    },
    async loveFn (b) {
      if (b) {
        // 点击 已经点赞 ，要取消点赞，无态度
        this.artObj.attitude = -1
        await unArtLiking(this.artObj.art_id)
      } else {
        // 点击 未点赞，要点赞，有态度-喜欢
        this.artObj.attitude = 1
        await artLiking(this.artObj.art_id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
    padding: 10px;
    margin-top: 46px;
}

.art-title {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
}

.art-content {
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;

    /deep/ img {
        width: 100%;
    }

    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.van-cell {
    padding: 5px 0;

    &::after {
        display: none;
    }
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;
    margin-right: 5px;
    border: none;
}

.like-box {
    display: flex;
    justify-content: center;
}
</style>
