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
    url: `http://ws.stream.qqmusic.qq.com/C400${songInfo.file.media_mid}.m4a?guid=2023010286&vkey=C753E93770F92A6A760173D3B56ADD6DEFB2274B9300579A5CF26D6A94B13A3A5BD8C1B4A61B2056CDBF91434DF636E7FB0AA6F827D5454A&uin=0&fromtag=66` // 播放源
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
