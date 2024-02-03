<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input placeholder="請輸入用戶名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="請輸入密碼" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="請再次輸入密碼" v-model="form.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">註冊</el-button>
          <el-link type="primary">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 前端綁定對象的屬性名，最好跟後端接口的參數名一致
export default {
  name: 'my-register',
  data () {
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    registerFn () {
      console.log(11)
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
