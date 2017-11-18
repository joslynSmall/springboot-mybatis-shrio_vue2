<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix">
        <span class="name">计划制定时间：</span>
        <el-date-picker type="date" placeholder="选择日期" v-model="search.planEnactTime" style="width:10%"></el-date-picker>-
        <el-date-picker type="date" placeholder="选择日期" v-model="search.planEnactTime" style="width:10%"></el-date-picker>
        <span class="name">项目工作计划名称：</span>
        <el-input placeholder="请输入项目工作计划名称" v-model="search.workPlanName" class="input-with-select" style="width:10%"></el-input>
        <span class="name">指定小组：</span>
        <el-select v-model="search.groupId" filterable placeholder="请选择项目组" style="width:10%" >
          <el-option v-for="item in groups"
                     :key="item.value"
                     :label="item.groupName"
                     :value="item.groupId"></el-option>
        </el-select>
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
      <el-table-column label="项目工作计划名称" align="center">
        <template scope="scope">
          <span>{{scope.row.workPlanName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划制定人" align="center">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划制定时间" align="center">
        <template scope="scope">
          <span>{{scope.row.planEnactTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划完成项目组" align="center">
        <template scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划开始时间" align="center">
        <template scope="scope">
          {{scope.row.planStartTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="计划完成时间">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.planCompleteTime}}</span>
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
      <div slot="title">{{showTitle.title}}页面信息</div>
      <el-form :model="form" label-position="top">

        <el-form-item label="项目工作计划名称" :label-width="formLabelWidth">
          <el-input v-model="form.workPlanName" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="制定人" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" filterable placeholder="请选择制定人">
            <el-option v-for="item in employees"
                       :key="item.value"
                       :label="item.employeeName"
                       :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目工作计划内容:" class="inputform">
          <el-input v-model="form.workPlanContent" auto-complete="off" :disabled="this.isEdit=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="计划完成项目组" :label-width="formLabelWidth">
          <el-select v-model="form.groupId" filterable placeholder="请选择项目组" :disabled="this.isEdit=='show'">
            <el-option v-for="item in groups"
                       :key="item.value"
                       :label="item.groupName"
                       :value="item.groupId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划制定时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.planEnactTime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.planStartTime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'"><i class="fa fa-arrow-circle-left"></i> 返 回</el-button>
        <el-button @click="handleCancle()" v-show="this.isEdit!='show'" icon="circle-close">取 消</el-button>
        <el-button type="primary" @click="handleSure()" v-show="this.isEdit!='show'" icon="circle-check">确 定</el-button>
      </div>
    </el-dialog>


    <!--detailForm  详情框-->
    <el-dialog :visible.sync="commObj.detailFormVisible">
      <div slot="title">{{showTitle.title}}页面信息</div>
      <el-form :model="detailForm" label-position="top">

        <el-form-item label="项目工作计划名称" :label-width="formLabelWidth">
          <el-input v-model="detailForm.workPlanName" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="制定人" :label-width="formLabelWidth">
          <el-select v-model="detailForm.employeeId" filterable placeholder="请选择制定人" :disabled="this.isEdit=='show'">
            <el-option v-for="item in employees"
                       :key="item.value"
                       :label="item.employeeName"
                       :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目工作计划内容:" class="inputform">
          <el-input v-model="detailForm.workPlanContent" auto-complete="off" :disabled="this.isEdit=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="计划完成项目组" :label-width="formLabelWidth">
          <el-select v-model="detailForm.groupId" filterable placeholder="请选择项目组" :disabled="this.isEdit=='show'">
            <el-option v-for="item in groups"
                       :key="item.value"
                       :label="item.groupName"
                       :value="item.groupId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划制定时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.planEnactTime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.planStartTime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'"><i class="fa fa-arrow-circle-left"></i> 返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getWorkPlanList, getWorkPlanInfo, insertWorkPlan, updateWorkPlan, deleteWorkPlan,
    getGroupList, getEmployeeList } from '@/api/basic'
  import { baseObj } from '@/api/baseObj'

  const commObj = Object.assign({}, baseObj, {
  })
  var formData = {
    workPlanName: '',
    workPlanContent: '',
    employeeId: '',
    groupId: '',
    planEnactTime: '',
    planStartTime: ''
  }
  var clearData = {}

  export default {
    data() {
      return {
        commObj: commObj,
        employees: null,
        groups: null,
        list: null,
        isEdit: 'insert',     // 用于判断新增或修改  insert   update show 查看
        form: formData,
        search: formData,
        detailForm: formData,
        params: {
          // TODO 用于id操作
          workPlanId: ''
        },
        pages: {
          total: '',
          pageNum: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
        detailFormVisible: false,
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
        this.form = clearData
        getWorkPlanList(Object.assign({}, commObj.pages, this.form)).then(response => {
          // console.log(response)
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
        getGroupList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          this.groups = response.page.list
          commObj.listLoading = false
        })
        getEmployeeList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          this.employees = response.page.list
          commObj.listLoading = false
        })
      },
      searchInfo() {
        // this.form = this.search
        this.fetchData()
      },
      getWorkPlanInfo() {
        return new Promise((resolve, reject) => {
          getWorkPlanInfo(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      insertWorkPlan() {
        return new Promise((resolve, reject) => {
          insertWorkPlan(this.form).then(response => {
            this.form = formData
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateWorkPlan() {
        return new Promise((resolve, reject) => {
          updateWorkPlan(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteWorkPlan() {
        return new Promise((resolve, reject) => {
          deleteWorkPlan(this.params).then(response => {
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
          this.form = formData
        } else if (edit === 'update') {
          this.form = row
          this.isEdit = 'update'
          this.showTitle.title = '编辑'
        } else {
          this.form = row
          this.params.workPlanId = row.workPlanId
          this.isEdit = 'show'
          this.showTitle.title = '查看'
        }
      },
      handleSure() {
        console.log(this.isEdit + '====')
        if (this.isEdit === 'insert') {
          // 新增
          this.insertWorkPlan()
        } else if (this.isEdit === 'update') {
          // 修改
          this.updateWorkPlan()
        } else {
          // 查看
          this.getWorkPlanInfo()
        }
      },
      handleCancle() {
        if (this.isEdit === 'insert') {
          commObj.dialogFormVisible = false
        } else {
          // this.fetchData()
          commObj.dialogFormVisible = false
        }
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？')
          .then(_ => {
            console.log(row.pageId + '======')
            this.params.workPlanId = row.workPlanId
            this.deleteWorkPlan()
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
        this.pages.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(currentPage) {
        this.pages.pageNum = currentPage
        this.fetchData()
      }
    }
  }
</script>
