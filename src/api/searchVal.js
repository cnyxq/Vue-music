// import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams} from 'api/config'

export function getSearchVal (query, page, isZhiDa, perpage) {
  const url = '/api/getSearchVal'
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    '_': 1581043083246,
    uin: 1178187041,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    catZhida: isZhiDa ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}
