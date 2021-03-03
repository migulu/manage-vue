import req from '../https.js'

const clients = {
  list() {
    return req('get', '/v1/clients/list')
  }
}

export default clients;