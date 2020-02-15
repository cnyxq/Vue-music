// 搜索页
<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange" :placeholder="query"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" @click="fill(item.query)" v-for="(item, index) in hotKey" :key="index">
                <span>{{item.query}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="deleteAllItem">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-history-list :searches="searchHistory" @select="selectItem" @delete="deleteItem"></search-history-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query" @insert="saveSHistory" ref="suggest"></suggest>
    </div>
    <confirm ref="confirm" @confirm="confirm" @cancel="cancel" :text="'确定要删除所有搜索记录嘛？'" :confirmBtnText="'清除'"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import {getHotKey} from 'api/hotKey'
import {ERR_OK} from 'api/config'
import {mapActions, mapGetters} from 'vuex'
import SearchHistoryList from 'base/search-history-list/search-history-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import {playListMixin} from 'common/js/mixin'
export default {
  name: 'search',
  mixins: [playListMixin],
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  computed: {
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  created () {
    this.getData()
  },
  methods: {
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.shortcutWrapper.style['bottom'] = bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style['bottom'] = bottom
      this.$refs.suggest.refresh()
    },
    getData () {
      getHotKey().then(response => {
        if (response.code === ERR_OK) {
          this.hotKey = response.hotkey.data.vec_hotkey.slice(0, 10)
        }
      })
    },
    fill (query) {
      this.$refs.searchBox.fillQuery(query)
    },
    onQueryChange (query) {
      this.query = query
    },
    saveSHistory (query) {
      this.saveSearchHistory(query)
    },
    selectItem (query) {
      this.$refs.searchBox.fillQuery(query)
    },
    deleteItem (query) {
      this.delOneSearchHistory(query)
    },
    deleteAllItem () {
      this.$refs.confirm.show()
      // this.delAllSearchHistory()
    },
    confirm () { // 清除所有历史
      this.delAllSearchHistory()
    },
    cancel () { // 取消清除
    },
    ...mapActions([
      'saveSearchHistory',
      'delOneSearchHistory',
      'delAllSearchHistory'
    ])
  },
  watch: {
    query (newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchHistoryList,
    Confirm,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    height: 100vh
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
