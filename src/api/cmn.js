import request from '@/utils/request'

const API = "/admin/cmn/dict"

export default {
  findChildData(pid) {
    return request({
      url: `${API}/findChildData/${pid}`,
      method: 'get'
    })
  }
}
