<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix">
        <el-input placeholder="请输入模块名称" v-model="search.moduleName" class="input-with-select" style="width:20%"></el-input>
        <el-button type="info" icon="search" class="btnsearch" @click="searchInfo()">搜索</el-button>
        <el-button @click="handleShow('','','insert')" type="info" icon="plus"
                   v-if="true" class="btnadd">新增</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="commObj.listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="模块名称" align="center">
        <template scope="scope">
          <span>{{scope.row.moduleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template scope="scope">
          <span>{{scope.row.projectName}}</span>
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
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="form.moduleName" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-select v-model="form.projectId" filterable placeholder="请选择项目" :disabled="this.isEdit=='show'">
            <el-option v-for="item in projects"
                       :key="item.value"
                       :label="item.projectName"
                       :value="item.projectId"></el-option>
          </el-select>
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
  import { getModuleList, getModuleInfo, insertModule, updateModule, deleteModule, getProjectList } from '@/api/basic'
  import { baseObj } from '@/api/baseObj'

  const commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {
    data() {
      return {
        commObj: commObj,
        projects: null,       // 项目
        list: null,
        isEdit: 'insert',     // 用于判断新增或修改  insert   update show 查看
        form: {
          moduleName: '',
          projectId: ''
        },
        search: {
          moduleName: ''
        },
        params: {
          // TODO 用于id操作
          moduleId: ''
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
        getModuleList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
        getProjectList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          this.projects = response.page.list
          commObj.listLoading = false
        })
      },
      searchInfo() {
        this.form = this.search
        this.fetchData()
      },
      getModuleInfo() {
        return new Promise((resolve, reject) => {
          getModuleInfo(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      insertModule() {
        return new Promise((resolve, reject) => {
          insertModule(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateModule() {
        return new Promise((resolve, reject) => {
          updateModule(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteModule() {
        return new Promise((resolve, reject) => {
          deleteModule(this.params).then(response => {
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
          this.form.moduleName = row.moduleName
          this.form.projectId = row.projectId
          this.form.moduleId = row.moduleId
        } else if (edit === 'update') {
          this.form = row
          this.isEdit = 'update'
          this.showTitle.title = '编辑'
        } else {
          this.form = row
          this.params.moduleId = row.moduleId
          this.isEdit = 'show'
          this.showTitle.title = '查看'
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====')
        if (this.isEdit === 'insert') {
          // 新增
          this.insertModule()
        } else if (this.isEdit === 'update') {
          // 修改
          this.updateModule()
        } else {
          // 查看
          this.getModuleInfo()
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
            console.log(row.moduleId + '======')
            this.params.moduleId = row.moduleId
            this.deleteModule()
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
