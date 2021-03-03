import req from '../https.js'

const users = {
  detail() {
    return req('get', '/v1/users/detail')
  }
}

export default users;