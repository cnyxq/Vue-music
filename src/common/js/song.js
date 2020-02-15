export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (songInfo) {
  return new Song({
    id: songInfo.id,
    mid: songInfo.mid,
    singer: filterSinger(songInfo.singer), // 歌手
    name: songInfo.name, // 歌名
    album: songInfo.album.name, // 专辑
    duration: songInfo.interval, // 歌曲时常单位秒
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album.mid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${songInfo.file.media_mid}.m4a?guid=2023010286&vkey=FDFE2387A101FCD41CE2DD64BD1E03A69C50BA43FD7412D2E8AE3E630B862C7FD3073FFDE2F2A5987994CDA56ACF1EF145A14685A9587A08&uin=0&fromtag=66` // 播放源
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
