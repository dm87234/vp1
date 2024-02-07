// 封裝具體的接口請求函數
// 每個函數只負責請求一個url地址

// 引入自定義axios函數
import request from '@/utils/request'

// 註冊接口
/**
 * @param {*} param0 { username:用戶名, password:密碼, repassword:確認
 * 密碼 }
 * @returns Promise對象
 */
export const registerAPI = ({ username, password, repassword }) => {
  // 原地是一個Promise對象 (內部包含原生ajax請求)
  // return 這個Promise對象到邏輯頁面，去那裏對Promise對象提取結果
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

// 登錄街口
export const loginAPI = (username, password) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 獲取用戶信息
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}

// 獲取側邊欄數據
export const getMenusAPI = () => {
  return request({
    url: '/my/menus'
  })
}

// 更新用戶基本資料
export const updateUserInfoAPI = ({ id, email, nickname, user_pic, username }) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data: {
      id,
      email,
      nickname,
      user_pic,
      username
    }
  })
}

// 更新用戶頭像
export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'patch',
    data: {
      avatar
    }
  })
}

// 更新用戶頭像
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'patch',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

// 獲取文章分類
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}
