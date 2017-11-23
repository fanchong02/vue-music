import jsonp from '@/common/js/jsonp'
import {commonParams,options} from '@/api/config'
// import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pageSize: 100,
    pagenum: 1,
    hostUin: 0,
    nneNewCode: 0,
    platfrom: 'yqq',
    g_tk: 672789467
  })

  return jsonp(url, data, options)
}


export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({},commonParams,{
    hostUin: 0,
    nnedNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId,

  })
  return jsonp(url, data, options)
}