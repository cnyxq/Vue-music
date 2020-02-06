import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false, // 播放/暂停
  fullScreen: false, // 全屏/缩小
  playList: [], // 播放列表
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1,
  songSheet: {},
  topList: {}
}

export default state
