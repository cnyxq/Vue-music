<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisPlayName(item)"></p>
        </div>
      </li>
      <div class="loading-container" v-show="hasMore">
        <loading :title="''"></loading>
      </div>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result :title="'抱歉，暂无搜索结果！'"></no-result>
    </div>
  </scroll>
</template>

<script>
import {getSearchVal} from 'api/searchVal'
import {ERR_OK} from 'api/config'
import {filterSinger} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations, mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'
const PER_PAGE = 20 // 每页数据量
const TYPE_SINGER = 'singer'
export default {
  name: 'suggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      result: [],
      page: 1,
      pullup: true, // 是否启用上拉到底监听
      hasMore: true // 是否允许加载更多数据
    }
  },
  created () {

  },
  methods: {
    getData () {
      // 重新请求将参数初始化
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      // 请求数据
      getSearchVal(this.query, this.page, this.showSinger, PER_PAGE).then(response => {
        if (response.code === ERR_OK) {
          this.result = this._genResult(response.data)
          this._checkMore(response.data)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      getSearchVal(this.query, this.page, this.showSinger, PER_PAGE).then(response => {
        if (response.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(response.data))
          this._checkMore(response.data)
        }
      })
    },
    _checkMore (data) {
      if (!data.song.list.length || (data.song.curnum + data.song.curpage * PER_PAGE) >= data.song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singermid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song.list) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisPlayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.songname}-${filterSinger(item.singer)}`
      }
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        this.$router.push({
          path: `/search/${item.singermid}`
        })
        this.setSinger({
          id: item.singermid,
          name: item.singername,
          avatar: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singermid}.webp`
        })
      } else {
        this.insertSong({
          id: item.songid,
          mid: item.songmid,
          name: item.songname,
          album: item.albumname,
          duration: item.interval,
          image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
          url: `http://ws.stream.qqmusic.qq.com/C400${item.songmid}.m4a?guid=2023010286&vkey=C753E93770F92A6A760173D3B56ADD6DEFB2274B9300579A5CF26D6A94B13A3A5BD8C1B4A61B2056CDBF91434DF636E7FB0AA6F827D5454A&uin=0&fromtag=66`
        })
        this.$emit('insert', this.query)
      }
    },
    refresh () {
      this.$refs.suggest.refresh()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query (newVal) {
      if (!newVal) {
        return
      }
      this.getData()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
