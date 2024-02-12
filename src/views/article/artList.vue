<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="red">文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option v-for="obj in cateList" :label="obj.cate_name" :value="obj.id" :key="obj.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button @click="showPubDialogFn" type="primary" size="small" class="btn-pub">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%;" border stripe>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页区域 -->

      <!-- 发表文章的 Dialog 对话框 -->
      <el-dialog title="发表文章" :visible.sync="pubDialogVisible" fullscreen :before-close="handleClose" @close="dialogCloseFn">
        <!-- 发布文章的內容區 -->
        <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
              <el-option v-for="obj in cateList" :label="obj.cate_name" :value="obj.id" :key="obj.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 文章編輯器 -->
          <el-form-item label="文章内容" prop="content">
            <!-- 使用 v-model 进行双向的数据绑定 -->
            <quill-editor @change="contentChangeFn" v-model="pubForm.content"></quill-editor>
          </el-form-item>
          <!-- 上傳圖片 -->
          <el-form-item label="文章封面">
            <!-- 用来显示封面的图片 -->
            <img v-if="!pubForm.cover_img" src="../../assets/images/cover.jpg" class="cover-img"/>
            <img v-else :src="pubForm.coverImg" class="cover-img" />
            <br />
            <!-- 文件选择框，默认被隐藏 -->
            <input type="file" @change="changeCoverFn" style="display: none;" accept="image/*" ref="iptFileRef" />
            <!-- 选择封面的按钮 -->
            <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
          </el-form-item>
          <!-- 發布 or 存草稿 -->
          <el-form-item>
            <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
            <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getArtCateListAPI, uploadArticleAPI, getArticleListAPI } from '@/api'
export default {
  name: 'ArtList',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1, // 默認拿第一頁數據
        pagesize: 5, // 當前頁要幾條數據
        cate_id: '',
        state: ''
      },
      // 控制发表文章对话框的显示与隐藏
      pubDialogVisible: false,
      // 表单的数据对象
      pubForm: {
        title: '',
        cate_id: '',
        content: '', // 文章內容
        cover_img: null, // 文章封面(傳給後台)
        coverImg: null, // 文章封面(前台)
        state: '' // 文章發布狀態
      },
      // 表单的验证规则对象
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请輸入文章內容', trigger: 'blur' }
        ]
      },
      cateList: [], // 儲存文章分類
      artList: [], // 儲存文章列表
      total: 0 // 文章總數
    }
  },
  methods: {
    async  handleClose (done) {
      const confirmResult = await this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
    },
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // 請求文章分類
    async getCateListFn () {
      const { data } = await getArtCateListAPI()
      this.cateList = data.data
    },
    // 請求文章
    async getArticleListFn () {
      const { data: res } = await getArticleListAPI(this.q)
      if (res.code !== 0) return this.$message.error('获取文章列表失败!')
      this.artList = res.data
      this.total = res.total
    },
    // 富文本編輯器內容改變觸發此事件方法
    contentChangeFn () {
      this.$refs.pubFormRef.validateField('content')
    },
    // 觸發圖片上傳
    selCoverFn () {
      this.$refs.iptFileRef.click()
    },
    // 獲取用戶上傳的圖片
    changeCoverFn (e) {
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择封面
        this.pubForm.cover_img = null
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0]
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.pubForm.coverImg = e.target.result
        }
      }
    },
    // 發布或存草稿
    pubArticleFn (state) {
      // 設置發布狀態
      this.pubForm.state = state
      this.$refs.pubFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请完善文章信息！')
        // 3. 判断是否提供了文章封面
        if (!this.pubForm.cover_img) return this.$message.error('请选择文章封面！')
        // 4. TODO：发布文章
        const fd = new FormData()
        fd.append('title', this.pubForm.title)
        fd.append('cate_id', this.pubForm.cate_id)
        fd.append('content', this.pubForm.content)
        fd.append('cover_img', this.pubForm.cover_img)
        fd.append('state', this.pubForm.state)
        // 傳給後台
        const { data: res } = await uploadArticleAPI(fd)
        if (res.code !== 0) return this.$message.error('发布文章失败！')
        this.$message.success('发布文章成功！')
        this.pubDialogVisible = false
        this.getArticleListFn()
      })
    },
    // 對話框關閉時清空表單
    dialogCloseFn () {
      this.$refs.pubFormRef.resetFields()
      this.pubForm = {
        title: '',
        cate_id: '',
        content: '', // 文章內容
        cover_img: null, // 文章封面(傳給後台)
        coverImg: null, // 文章封面(前台)
        state: '' // 文章發布狀態
      }
      console.log(this.pubForm)
    }
  },
  created () {
    this.getCateListFn()
    this.getArticleListFn()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
