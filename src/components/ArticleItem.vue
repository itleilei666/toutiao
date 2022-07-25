<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图 -->
          <lazy-component>
            <img v-if="artObj.cover.type === 1" class="thumb" v-lazy="artObj.cover.images[0]">
          </lazy-component>
        </div>
        <!-- 三张图片 -->
        <div v-if="artObj.cover.type === 3" class="thumb-box">
          <lazy-component>
            <img class="thumb" v-for="(url, index) in artObj.cover.images" v-lazy="url" :key="index" >
          </lazy-component>
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ dateFromat(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" :actions="actions" :cancel-text="bottomName" @cancel="onCancel" @select="onSelect"
      @close="close" />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomName: '取消'
    }
  },
  methods: {
    dateFromat: timeAgo,
    onCancel () {
      if (this.bottomName === '返回') { // 点击返回
        this.bottomName = '取消'
        this.show = true
        this.actions = firstActions
      } else { // 点击取消
        this.show = false
      }
    },
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomName = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeArtFn', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('reportArt', { id: this.artObj.art_id, type: action.value })
        this.show = false
      }
    },
    close () {
      this.actions = firstActions
      this.bottomName = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;

  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
