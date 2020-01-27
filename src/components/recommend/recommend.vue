// 推荐页
<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recomPlayList">
      <div>
        <div v-if="swiper.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in swiper" :key="index">
              <a :href="item.jump_info.url">
                <img @load="loadImage()" :src="item.pic_info.url">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list" v-show="recomPlayList.length">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) in recomPlayList" :key="index">
              <div class="icon">
                <img height="60" width="60" v-lazy="item.cover" alt="">
              </div>
              <div class="text">
                <h2 class="name">{{item.title}}</h2>
                <p class="desc">播放量：{{(item.listen_num/10000).toFixed(1)}}万</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!recomPlayList.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  name: 'recommend',
  data () {
    return {
      swiper: [],
      recomPlayList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRecommend().then(response => {
        if (response.code === ERR_OK) {
          this.swiper = response.focus.data.content
          this.recomPlayList = response.recomPlaylist.data.v_hot
        }
      })
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background-color: $color-background
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
