// import jsonp from 'common/js/jsonp'
import {commonParams} from 'api/config'
import axios from 'axios'

// 歌手排行列表
export function getSingerList () {
  const url = '/api/getSingerList'
  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI8942665664729095',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: '{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 歌手详细信息包含歌单
export function getSingerDetail (singerId) {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    singerId: `${singerId}`,
    '-': 'getSingerSong6610998178583072',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"${singerId}","begin":0,"num":10},"module":"musichall.song_list_server"}}`
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
