<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if = "!avatar" class="the_img" src="../../assets/images/avatar.jpg" alt="" />
      <img v-else class="the_img" :src="avatar" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button @click="uploadFn" type="success" icon="el-icon-upload" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateAvatarAPI } from '@/api'
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: this.$store.state.userInfo.user_pic || ''
    }
  },
  methods: {
    chooseImg () {
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
      const files = e.target.files // 拿到用戶選擇的文件數組
      if (files.length === 0) {
        // 證明文件選擇窗口打開了，但用戶沒有選擇文件就按下確定並關掉了
      } else {
        // 用戶有選擇文件
        // console.log(files[0])
        // 第一種方法
        // 使用URL.createObjURL()来转换文件变成图片地址(纯前端本地)
        // this.avatar = URL.createObjectURL(files[0])

        // 第二種方法
        // 使用FileReader来读取选择的前端文件, 转换为base64字符串, 给img标签渲染
        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，開始读取文件内容
        fr.readAsDataURL(files[0])
        // 3. 监听 fr 的 onload 事件
        // 文件讀成base64字符串後會觸發onload事件函數
        fr.onload = e => {
          // 4. e.target.result 就是读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
          // console.log(e.target.result)
        }
      }
    },
    async uploadFn () {
      const { data } = await updateAvatarAPI(this.avatar)
      if (data.code === 0) {
        this.$message.success('上传头像成功！')
        this.$store.dispatch('getUserInfoActions')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
}
</style>
