<template>
  <transition name="slide">
    <music-list class="top-list" :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getTopList} from 'api/topList'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  name: 'top-list',
  data () {
    return {
      topData: {},
      songs: [],
      rank: true
    }
  },
  created () {
    this.getData()
  },
  computed: {
    title () {
      return this.topList.title
    },
    bgImage () {
      return this.topList.mbFrontPicUrl
    },
    ...mapGetters(['topList'])
  },
  methods: {
    getData () {
      console.log(1)
      getTopList(this.topList.topId, this.topList.period).then(response => {
        console.log(2)
        if (response.code === ERR_OK) {
          this.topData = response.detail.data
          console.log(this.topData)
          this.songs = this._normalizeSongs(this.topData.songInfoList)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
