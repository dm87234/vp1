<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input placeholder="請輸入用戶名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="請輸入密碼" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" placeholder="請再次輸入密碼" v-model="form.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">註冊</el-button>
          <el-link type="primary" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index'
// 前端綁定對象的屬性名，最好跟後端接口的參數名一致
export default {
  name: 'my-register',
  data () {
    const samePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('兩次輸入的密碼不一致'))
      } else {
        callback()
      }
    }
    return {
      form: { // 表單的數據對象
        username: '',
        password: '',
        repassword: ''
      },
      rulesObj: { // 表單規則驗證對象
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    registerFn () {
      this.$refs.form.validate(async valid => {
        if (!valid) return false
        // 通過校驗 拿到用户输入的内容 傳給後端
        const { data: { code, message } } = await registerAPI(this.form)
        if (code !== 0) {
          return this.$message.error(message)
        }
        this.$message.success(message)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
