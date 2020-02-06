// 排行页
<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <ul v-show="topList.length > 0">
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" :src="item.frontPicUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, i) in item.song" :key="i">
              <span>{{i + 1}}</span>
              <span>{{song.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length > 0">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  name: 'rank',
  mixins: [playListMixin],
  data () {
    return {
      topList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRecommend().then(response => {
        if (response.code === ERR_OK) {
          this.topList = response.toplist.data.group[0].toplist
          console.log(this.topList)
        }
      })
    },
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.rank.style['bottom'] = bottom
      this.$refs.topList.refresh()
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.topId}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background-color: $color-background
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
