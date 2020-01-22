// 推荐页
<template>
  <div class="recommend">
    <slider v-if="swiper.length">
      <div v-for="(item, index) in swiper" :key="index">
        <a :href="item.jump_info.url">
          <img :src="item.pic_info.url" alt="">
        </a>
      </div>
    </slider>
  </div>
</template>

<script>
import {getFocusList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
export default {
  name: 'recommend',
  data () {
    return {
      swiper: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getFocusList().then(response => {
        if (response.code === ERR_OK) {
          this.swiper = response.focus.data.content
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
