import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, delOneSearch, delAllSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    index = findIndex(randomList, list[index])
    commit(types.SET_PLAY_LIST, randomList)
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
}

export const randomPlay = function ({commit}, list) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_CURRENT_INDEX, 0)
}

export const insertSong = function ({commit, state}, song) {
  let currentIndex = state.currentIndex
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()

  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前歌曲列表中是否存在当前待插入的歌曲
  let fpIndex = findIndex(playList, song)
  // 指定插入的位置
  currentIndex++
  // 插入
  playList.splice(currentIndex, 0, song)
  // 如果有
  if (fpIndex > -1) {
    // 移除
    if (currentIndex <= fpIndex) {
      playList.splice(fpIndex + 1, 1)
    } else {
      playList.splice(fpIndex, 1)
      currentIndex--
    }
  }

  // 要插入的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 查找顺序播放列表中是否存在当前待插入的歌曲
  let fsIndex = findIndex(sequenceList, song)
  // 插入
  sequenceList.splice(currentSIndex, 0, song)
  // 如果有
  if (fsIndex > -1) {
    if (currentSIndex <= fsIndex) {
      sequenceList.splice(fsIndex + 1, 1)
    } else {
      sequenceList.splice(fsIndex, 1)
    }
  }
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const delOneSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, delOneSearch(query))
}

export const delAllSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, delAllSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let currentIndex = state.currentIndex
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  if (!playList.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }
}

export const deleteAllSong = function ({commit}) {
  commit(types.SET_PLAY_LIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveOneFavorite = function ({commit}, song) {
  commit(types.SET_FAVORITE, saveFavorite(song))
}

export const delOneFavorite = function ({commit}, song) {
  commit(types.SET_FAVORITE, deleteFavorite(song))
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
