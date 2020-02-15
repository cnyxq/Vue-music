// 本地存储逻辑

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 100

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 100

export function saveSearch (query) {
  let arr = localStorage.getItem(SEARCH_KEY) ? JSON.parse(localStorage.getItem(SEARCH_KEY)) : []
  insertArray(arr, query, SEARCH_MAX_LENGTH)
  localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
  return arr
}

export function loadSearch () {
  return localStorage.getItem(SEARCH_KEY) ? JSON.parse(localStorage.getItem(SEARCH_KEY)) : []
}

export function delOneSearch (query) {
  let arr = loadSearch()
  let index = arr.indexOf(query)
  if (index === -1) {
    return
  }
  arr.splice(index, 1)
  localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
  return arr
}

export function delAllSearch () {
  localStorage.setItem(SEARCH_KEY, [])
  return []
}

export function savePlay (song) {
  let arr = loadPlay()
  insertArray(arr, song, PLAY_MAX_LENGTH)
  localStorage.setItem(PLAY_KEY, JSON.stringify(arr))
  return arr
}

export function loadPlay () {
  return localStorage.getItem(PLAY_KEY) ? JSON.parse(localStorage.getItem(PLAY_KEY)) : []
}

export function saveFavorite (song) {
  let arr = loadFavorite()
  insertArray(arr, song, FAVORITE_MAX_LENGTH)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(arr))
  return arr
}

export function deleteFavorite (song) {
  let arr = loadFavorite()
  let index = arr.findIndex(item => {
    return item.id === song.id
  })
  if (index !== -1) {
    arr.splice(index, 1)
  }
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(arr))
  return arr
}

export function loadFavorite () {
  return localStorage.getItem(FAVORITE_KEY) ? JSON.parse(localStorage.getItem(FAVORITE_KEY)) : []
}

function insertArray (arr, val, maxLen) {
  let index = arr.findIndex((item) => {
    return item.id === val.id
  })
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
