<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button @click="addCateFn" type="primary" size="mini">添加分类</el-button>
      </div>
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <!-- scope對象: { row:行對象 } -->
          <template v-slot="scope">
            <el-button @click="updateFn(scope.row)" type="primary" size="mini">修改</el-button>
            <el-button @click="delCateFn(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加文章分类" :visible.sync="dialogVisible" width="35%" @close="dialogCloseFn">
      <!-- 添加的表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleFn" size="mini">取 消</el-button>
        <el-button v-if='!isEdit' @click="confirmFn" size="mini" type="primary">添 加</el-button>
        <el-button v-else @click="confirmFn" size="mini" type="primary">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtCateListAPI, addArtCateAPI, updateArtCateAPI,
  delArtCateAPI
} from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      // 文章的分类列表
      cateList: [],
      dialogVisible: false, // 添加分类-对话框是否显示
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      isEdit: false, // true為編輯狀態, false為新增狀態
      editId: '' // 修改目標的id
    }
  },
  methods: {
    async initCateListFn () {
      const { data } = await getArtCateListAPI()
      if (data.code === 0) {
        this.cateList = data.data
      } else {
        this.$message.error('分類獲取失敗')
      }
    },
    // 新增分類
    addCateFn () {
      this.isEdit = false
      this.editId = ''
      this.dialogVisible = true
    },
    // 對話框裡的取消按鈕
    cancleFn () {
      this.dialogVisible = false
    },
    // 對話框裡的確認按鈕
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
            const { data } = await addArtCateAPI(this.addForm)
            if (data.code === 0) {
              this.$message.success('添加分类成功！')
            } else {
              return false
            }
          } else {
            const { data } = await updateArtCateAPI({
              id: this.editId,
              ...this.addForm
            })
            if (data.code === 0) {
              this.$message.success('更新分类成功！')
            }
          }
        }
        this.initCateListFn()
      })
      this.dialogVisible = false
    },
    // 對話框關閉時的回調
    dialogCloseFn () {
      this.$refs.addRef.resetFields()
    },
    // 修改分類
    updateFn (obj) {
      const { cate_alias, cate_name, id } = obj
      this.isEdit = true
      this.dialogVisible = true

      // 真實DOM綁訂好了，再給數據回填
      this.$nextTick(() => {
        this.addForm.cate_alias = cate_alias
        this.addForm.cate_name = cate_name
        this.editId = id
      })
    },
    // 刪除分類
    async  delCateFn (obj) {
      const { data } = await delArtCateAPI(obj.id)
      if (data.code !== 0) return this.$message.error('删除分类失败！')
      this.$message.success('删除分类成功！')
      // 重新请求列表数据
      this.initCateListFn()
    }
  },
  created () {
    this.initCateListFn()
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
