import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,getuserName } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})
console.log(process.env.VUE_APP_BASE_API);
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log(store.getters.token);
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Token'] = getToken();
      config.headers['Username'] = getuserName();
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(response);
    // if the custom code is not 20000, it is judged as an error.
    if(res.resCode !== 0){
      console.log(11111)
      Message.error(res.message);
      return Promise.reject(data);
    }else{
      console.log(22222)
      return res;
    }
   
  },
  error => {
    console.log(333333)
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
