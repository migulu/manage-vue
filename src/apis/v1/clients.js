import req from '../https.js'

const clients = {
  list() {
    return req('get', '/v1/clients/list')
  },
  list2xeleonxeleon() {
    return req('get', '/v1/clients/list')
  },
  detail(id) {
    return req('get', '/v1/clients/detail/'+id);
  },
  detailUpdate(params){
    return req('put', '/v1/clients/detail',params)
  }

}

export default clients;