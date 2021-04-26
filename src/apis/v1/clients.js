import req from '../https.js'

const clients = {
  list(params) {
    return req('get', '/v1/clients/list',params)
  },
  configure() {
    return req('get', '/v1/clients/configure')
  },
  detail(id) {
    return req('get', '/v1/clients/detail/'+id);
  },
  detailUpdate(params){
    return req('put', '/v1/clients/detail',params)
  },

}

export default clients;