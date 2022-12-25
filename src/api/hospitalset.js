import request from '@/utils/request'

const API = "/admin/hosp/hospitalSet"

export default {
  getHospitalSetPage(page, size, searchObj) {
    return request({
      url: `${API}/${page}/${size}`,
      method: 'post',
      data: searchObj
    })
  },
  removeDataById(id) {
    return request({
      url: `${API}/${id}`,
      method: 'delete'
    })
  },
  save(hospitalSet) {
    return request({
      url: `${API}/saveHospSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  getHospitalSetById(id) {
    return request({
      url: `${API}/getHospSet/${id}`,
      method: 'get'
    })
  },
  updateById(hospitalSet) {
    return request({
      url: `${API}/updateHospSet`,
      method: 'put',
      data: hospitalSet
    })
  },
  removeBatchData(ids){
    return request({
      url: `${API}/batchRemove`,
      method: 'delete',
      data: ids
    })
  }
}
