<template>
  <transition name="slide">
    <music-list class="song-sheet" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongSheet} from 'api/songSheet'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  name: 'song-sheet',
  data () {
    return {
      songList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (!this.songSheet.content_id) {
        this.$router.push('/recommend')
        return
      }
      getSongSheet(this.songSheet.content_id).then(response => {
        if (response.code === ERR_OK) {
          this.songList = this._normalizeSongs(response.cdlist[0].songlist)
          console.log(this.songList)
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
  computed: {
    title () {
      return this.songSheet.title
    },
    bgImage () {
      return this.songSheet.cover
    },
    songs () {
      return this.songList
    },
    ...mapGetters([
      'songSheet'
    ])
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
