<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix">
        <el-input placeholder="请输入项目名称" v-model="search.projectName" class="input-with-select" style="width:20%"></el-input>
        <el-button type="info" icon="search" class="btnsearch" @click="searchInfo()">搜索</el-button>
        <el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd"
                   v-if="true">新增</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="commObj.listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template scope="scope">
          <span>{{scope.row.projectName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template scope="scope">
          <el-button size="small" icon="view" v-if="true" type="info" @click="handleShow(scope.$index, scope.row, 'show')">查看</el-button>
          <el-button size="small" type="primary" v-if="true" icon="edit" @click="handleShow(scope.$index, scope.row, 'update')">编辑</el-button>
          <el-button size="small" type="danger" v-if="true" icon="circle-cross" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="commObj.pages.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commObj.pages.total">
      </el-pagination>
    </div>

    <!-- Form -->

    <el-dialog :visible.sync="commObj.dialogFormVisible">
      <div slot="title">{{showTitle.title}}项目信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.projectName" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'"><i class="fa fa-arrow-circle-left"></i> 返 回</el-button>
        <el-button @click="handleCancle()" v-show="this.isEdit!='show'" icon="circle-close">取 消</el-button>
        <el-button type="primary" @click="handleSure()" v-show="this.isEdit!='show'" icon="circle-check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getProjectList, getProjectInfo, insertProject, updateProject, deleteProject } from '@/api/basic'
  import { baseObj } from '@/api/baseObj'

  const commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {
    data() {
      return {
        commObj: commObj,
        list: null,
        isEdit: 'insert',     // 用于判断新增或修改  insert   update show 查看
        form: {
          projectName: ''
        },
        search: {
          projectName: ''
        },
        params: {
          // TODO 用于id操作
          projectId: ''
        },
        pages: {
          total: '',
          pageNum: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
        showTitle: {
          title: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        commObj.listLoading = true
        getProjectList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
      },
      searchInfo() {
        this.form = this.search
        this.fetchData()
      },
      getProjectInfo() {
        return new Promise((resolve, reject) => {
          getProjectInfo(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      insertProject() {
        return new Promise((resolve, reject) => {
          insertProject(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateProject() {
        return new Promise((resolve, reject) => {
          updateProject(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteProject() {
        return new Promise((resolve, reject) => {
          deleteProject(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      handleShow(index, row, edit) {
        commObj.dialogFormVisible = true
        if (edit === 'insert') {
          this.isEdit = 'insert'
          this.showTitle.title = '新增'
          this.form.projectName = row.projectName
          this.form.remark = row.remark
          this.form.projectId = row.projectId
        } else if (edit === 'update') {
          this.form = row
          this.isEdit = 'update'
          this.showTitle.title = '编辑'
        } else {
          this.form = row
          this.params.projectId = row.projectId
          this.isEdit = 'show'
          this.showTitle.title = '查看'
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====')
        if (this.isEdit === 'insert') {
          // 新增
          this.insertProject()
        } else if (this.isEdit === 'update') {
          // 修改
          this.updateProject()
        } else {
          // 查看
          this.getProjectInfo()
        }
      },
      handleCancle() {
        if (this.isEdit === 'insert') {
          commObj.dialogFormVisible = false
        } else {
          this.fetchData()
          commObj.dialogFormVisible = false
        }
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？')
          .then(_ => {
            console.log(row.projectId + '======')
            this.params.projectId = row.projectId
            this.deleteProject()
            done()
          })
          .catch(_ => {

          })
      },
      returnBack() {
        commObj.dialogFormVisible = false
      },
      // 分页
      handleSizeChange(size) {
        commObj.pages.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(currentPage) {
        commObj.pages.pageNum = currentPage
        this.fetchData()
      }
    }
  }
</script>
