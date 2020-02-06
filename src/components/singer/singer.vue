// 歌手页
<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="tags" ref="listView"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import pyfl from 'pyfl'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin'
// const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  name: 'singer',
  mixins: [playListMixin],
  data () {
    return {
      tags: [],
      singerList: [],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.singer.style['bottom'] = bottom
      this.$refs.listView.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    getData () {
      getSingerList().then(response => {
        if (response.code === ERR_OK) {
          this.tags = response.singerList.data.tags.index
          this.singerList = response.singerList.data.singerlist
          this._normalizeSinger(this.tags, this.singerList)
        }
      })
    },
    _normalizeSinger (tags, singerList) {
      tags.forEach((item, index) => {
        item.items = []
      })
      for (let i = 1; i < tags.length; i++) {
        singerList.forEach((item, index) => {
          if (index < HOT_SINGER_LEN && tags[0].items.length < HOT_SINGER_LEN) {
            tags[0].items.push({
              id: item.singer_mid,
              name: item.singer_name,
              avatar: item.singer_pic
            })
          }
          if (tags[i].name === pyfl(item.singer_name).substring(0, 1).toUpperCase()) {
            tags[i].items.push({
              id: item.singer_mid,
              name: item.singer_name,
              avatar: item.singer_pic
            })
          }
        })
      }
    },
    ...mapMutations({ // 映射
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
