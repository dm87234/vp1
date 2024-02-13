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

// 新增文章分類
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_name,
      cate_alias
    }
  })
}

// 修改文章分類
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

// 刪除文章分類
export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}

// 發布文章 or 存草稿
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd // 参数要的是表单对象, 不能写普通对象, axios内部会判断, 如果是表单对象, 传递的请求体会设置Content-Type: form-data与后端对应
  })
}

// 獲取文章
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

// 獲取文章詳情
export const getArticleDetailFn = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

// 刪除文章
export const delArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'delete',
    params: {
      id
    }
  })
}
