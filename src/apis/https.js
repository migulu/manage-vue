import axios from 'axios'
import router from '../router/index.js';
import store from '@/store'
//import router from '../router.js'
import {toLogin, to403Page} from './utils.js'
import utils from '@/helper/utils.js'


//有正常連上 api server，然後 server 回傳的錯誤
const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      utils.tip(msg);
      break;
    
    case 401:
      if (router.currentRoute == 'Login') {
        //test
      } else {
        store.dispatch('auth/setAuth', {
          'token': '',
          'isLogin': false
        });
        utils.tip('登入過期，請重新登入')
      setTimeout(() => {
        toLogin();
      },1000);
      }
      break;
    
    case 403:
      to403Page();
      break;
    
    case 404:
      utils.tip(msg);
      break;
    
    default:
      console.log("resp沒有欄截到的錯誤：" + msg);
  }
}

// axios的實例
var instance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST
  //baseURL: 'https://ngrok.smartweb.adsli.org'
})

// request攔截器
instance.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  //console.log("auth=",store.state.auth);
  token && (config.headers.Authorization = token);
  //console.log("config=",config);
  return config;
},(error) => {
  console.log("error from request",error);
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => {
  //console.log("axio response=",response)
  return response;
}, 
  (error) => {
  if (error && error.response) {
    errorHandle(error.response.status, error.response.data.error);
    return Promise.reject(error);
  } else {
    return Promise.reject(new Error("API server 連不上!"));
    //utils.tip("API server 連不上")
  }
})

export default function (method, url, data=null) {
  method = method.toLowerCase();
  console.log("method="+method);
  if (method == 'post') {
    return instance.post(url, data)
  } else if (method == 'get') {
    return instance.get(url, {params: data})
  } else if (method == 'delete') {
    return instance.delete(url, {params: data})
  } else if (method == 'put') {
    return instance.put(url, data)
  } else {
    console.error('未知的method'+method);
    return false;
  }

}
