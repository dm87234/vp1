// 基於axios封裝網路請求的函數
// 先導入axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 用axios.create() 創建一個帶配置項的自定義axios函數
// myAxios 請求的時候，地址是 baseURL + url
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 請求發起前的代碼，如果有異常報錯，會直接進入這裡

  // 返回一個拒絕狀態的Promise對象
  return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // console.dir(error)
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // 本次響應token過期了
    // 清除vuex裡的一切，然後切換回到登錄頁面
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})

    router.push('/login')
  }
  return Promise.reject(error)
})
// 導出
export default myAxios
