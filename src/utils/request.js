// 基於axios封裝網路請求的函數
// 先導入axios
import axios from 'axios'

// 用axios.create() 創建一個帶配置項的自定義axios函數
// myAxios 請求的時候，地址是 baseURL + url
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 導出
export default myAxios
