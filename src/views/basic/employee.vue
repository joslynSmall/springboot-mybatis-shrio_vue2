<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix">
        <el-input placeholder="请输入员工姓名" v-model="form.employeeName" class="input-with-select" style="width:20%"></el-input>
        <el-button type="info" icon="search" class="btnsearch" @click="fetchData">搜索</el-button>
        <el-button @click="handleShow('','','insert')" type="info" icon="plus"
                   v-if="commObj.hasBtnPermission('basic:employee:add')" class="btnadd">新增
        </el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="commObj.listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="员工ID">
        <template scope="scope">
          {{scope.row.employeeId}}
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" align="center">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template scope="scope">
          {{scope.row.gender == 0 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column label="工龄(年)" align="center">
        <template scope="scope">
          <span>{{scope.row.workingYears}}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template scope="scope">
          <span>{{scope.row.dutyName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template scope="scope">
          <el-button size="small" type="info" @click="handleShow(scope.$index, scope.row, 'show')" icon="view">查看</el-button>
          <el-button size="small" type="primary" @click="handleShow(scope.$index, scope.row, 'update')" icon="edit">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="circle-cross">删除</el-button>
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

    <el-dialog :visible.sync="commObj.dialogFormVisible" class="dialog-two" top="4vh">
      <div slot="title">{{showTitle.title}}员工信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="员工姓名" :label-width="formLabelWidth">
          <el-input v-model="form.employeeName" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender" :disabled="this.state=='show'">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  :label-width="formLabelWidth">
         <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
         <el-form-item label="电话号码：" :label-width="formLabelWidth" style="clear: both;">
          <el-input v-model="form.workingYears" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="入职时间：" :label-width="formLabelWidth">

          <el-date-picker type="date" placeholder="选择日期" v-model="form.hireTime" :disabled="this.state=='show'"></el-date-picker>
        </el-form-item>
        <el-form-item label="工龄(年)：" :label-width="formLabelWidth">
          <el-input v-model="form.workingYears" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="职位：" :label-width="formLabelWidth">
          <el-select v-model="form.dutyId" filterable placeholder="请选择职位信息：" :disabled="this.state=='show'">
            <el-option v-for="item in dutys"
                       :key="item.value"
                       :label="item.dutyName"
                       :value="item.dutyId"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="QQ：" :label-width="formLabelWidth" >
          <el-input v-model="form.workingYears" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
         <el-form-item label="邮箱：" :label-width="formLabelWidth" >
          <el-input v-model="form.workingYears" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <!-- <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.photograph" auto-complete="off" :disabled="this.state=='show'" type="hidden"></el-input>
        </el-form-item> -->
         <el-form-item label="技术偏好:" class="inputform" style="width: 92%;">
          <el-checkbox-group v-model="type">
          <el-checkbox label="前端" name="type"></el-checkbox>
          <el-checkbox label="后台" name="type"></el-checkbox>
          <el-checkbox label="数据库" name="type"></el-checkbox>
          <el-checkbox label="软件使用" name="type"></el-checkbox>
          <el-checkbox label="综合" name="type"></el-checkbox>
          <el-checkbox label="框架" name="type"></el-checkbox>
    </el-checkbox-group>
        </el-form-item>
 <el-form-item label="上传附件:" class="inputform" style="width: 92%;">
 <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">附件列表：</div>
</el-upload>
 </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.state=='show'">
          <i class="fa fa-arrow-circle-left"></i>
          返 回
        </el-button>
        <el-button @click="handleCancel()" v-show="this.state!='show'" icon="circle-close">取 消</el-button>
        <el-button type="primary" @click="handleSure()" v-show="this.state!='show'" icon="circle-check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getEmployeeList, getEmployeeInfo, insertEmployee, updateEmployee, deleteEmployee, getDutyList} from '@/api/basic'
  import {baseObj} from '@/api/baseObj'

  const commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {

    data()
    {
      return {
        fileList:[{name:"1111"},{name:"2222"}],
        type: ['选中且禁用','复选框 A'],

        commObj: commObj,
        list: null,
        dutys: null,
        listLoading: true,
        form: {
          employeeName: '',
          gender: '',
          workingYears: '',
          dutyId: '',
          hireTime: '',
          photograph: ''
        },
        params: {
          employeeId: ''
        },
        pages: {
          total: '',
          pageNum: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
        state: 'insert',
        showTitle: {
          title: ''
        },
      }
    },
    created()
    {
      this.fetchData()
    },
    methods: {
      fetchData()
      {
        commObj.listLoading = true
        getEmployeeList(Object.assign({}, commObj.pages, this.form)).then(response =>
        {
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
        getDutyList(Object.assign({}, commObj.pages, this.form)).then(response =>
        {
          commObj.pages.total = response.page.total
          this.dutys = response.page.list
          commObj.listLoading = false
        })
      },
      getEmployeeInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getEmployeeInfo(this.params).then(response =>
          {
            commObj.dialogFormVisible = false
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertEmployee()
      {
        return new Promise((resolve, reject) =>
        {
          insertEmployee(this.form).then(response =>
          {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      updateEmployee()
      {
        return new Promise((resolve, reject) =>
        {
          updateEmployee(this.form).then(response =>
          {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error =>
          {
            reject(error.msg)
          })
        })
      },
      deleteEmployee()
      {
        return new Promise((resolve, reject) =>
        {
          deleteEmployee(this.params).then(response =>
          {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error =>
          {
            reject(error.msg)
          })
        })
      },
      handleShow(index, row, state)
      {
        commObj.dialogFormVisible = true
        if (state == 'insert')
        {
          this.state = 'insert';
          this.showTitle.title = '新增';
          this.form.employeeName = row.employeeName;
          this.form.gender = row.gender;
          this.form.workingYears = row.workingYears;
          this.form.dutyId = row.dutyId;
          this.form.hireTime = row.hireTime;
        }
        else if (state == 'update')
        {
          this.form = row;
          this.state = 'update';
          this.showTitle.title = '编辑';
        }
        else if (state == 'show')
        {
          this.form = row;
          this.params.employeeId = row.employeeId;
          this.state = 'show';
          this.showTitle.title = '查看';
        }
      },
      handleSure()
      {
        if (this.state == 'insert')
        {
          this.insertEmployee();
        }
        else if (this.state == 'update')
        {
          this.updateEmployee();
        }
        else if (this.state == 'show')
        {
          this.getEmployeeInfo();
        }
      },
      handleDelete(index, row)
      {
        this.$confirm('确认删除？')
          .then(_ =>
          {
            this.params.employeeId = row.employeeId;
            this.deleteEmployee();
            done();
          })
          .catch(_ =>
          {

          });
      },
      handleCancel()
      {
        if (this.state == 'insert')
        {
          commObj.dialogFormVisible = false
        }
        else
        {
          this.fetchData()
          commObj.dialogFormVisible = false
        }
      },
      returnBack()
      {
        commObj.dialogFormVisible = false
      },
      handleSizeChange(size)
      {
        commObj.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage)
      {
        commObj.pages.pageNum = currentPage
        this.fetchData();
      },
      watch: {
        state: function (val, oldVa)
        {
          if (val == 0)
          {
            for (var p in this.form)
            {
              if (typeof ( this.form [p]) != " function ")
              {
                this.form [p] = '';
              }
            }
          }
        }
      }
    }
  }
</script>
<style scoped lang="css">
.dialog-two{width: 146%;margin-left: -14%;}
.inputform .el-checkbox{width: 14.5%;}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px solid #409EFF;
    border-radius: 6px;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
