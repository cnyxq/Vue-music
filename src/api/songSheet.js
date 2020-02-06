import axios from 'axios'
import { commonParams } from 'api/config'

export function getSongSheet (id) {
  const url = '/api/getSongSheet'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: id,
    loginUin: 1178187041,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
