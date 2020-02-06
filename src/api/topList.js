// import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams} from 'api/config'

export function getTopList (topId, period) {
  const url = '/api/getTopList'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI8587345143729257',
    loginUin: 1178187041,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    data: `{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":${topId},"offset":0,"num":20,"period":"${period}"}},"comm":{"ct":24,"cv":0}}`
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}
