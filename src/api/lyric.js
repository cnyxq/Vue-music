import { commonParams } from 'api/config'
import axios from 'axios'

// 获取歌曲歌词
export function getSongLyric (mid) {
  const url = '/api/getSongLyric'
  const data = Object.assign({}, commonParams, {
    '-': 'MusicJsonCallback_lrc',
    loginUin: 1178187041,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    songmid: mid,
    pcachetime: 1580646963793
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
