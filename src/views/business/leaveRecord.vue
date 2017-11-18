<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">员工姓名：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="请假人" align="center">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template scope="scope">
          <span>{{scope.row.gender}}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template scope="scope">
          <span>{{scope.row.dutyName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假事由" align="center">
        <template scope="scope">
          <span>{{scope.row.leaveReasons}}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假开始时间" align="center">
        <template scope="scope">
          <span>{{scope.row.leaveStartTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假结束时间" align="center">
        <template scope="scope">
          <span>{{scope.row.leaveEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template scope="scope">
         <el-button size="small" icon="view" type="info" @click="handleShow(scope.$index, scope.row, 'show')">查看</el-button>
          <el-button size="small" type="primary" icon="edit" @click="handleShow(scope.$index, scope.row, 'update')">编辑</el-button>
          <el-button size="small" type="danger" icon="circle-cross" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage6"
        :page-size="pages.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>

    <!-- Form -->

    <el-dialog :visible.sync="dialogFormVisible">
      <div slot="title">{{showTitle.title}}请假记录</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="请假人" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" filterable placeholder="请选择请假人信息" :disabled="this.state=='show'">
            <el-option v-for="item in employees"
                       :key="item.value"
                       :label="item.employeeName"
                       :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender" :disabled="this.state=='show'">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" style="clear:both">
          <el-input v-model="form.duty" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <!-- <el-form-item label="请假事由" :label-width="formLabelWidth">
          <el-input v-model="form.leaveReasons" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item> -->
         <el-form-item label="请假事由:" class="inputform" style="width: 92%;">
          <el-input v-model="form.leaveReasons" auto-complete="off" :disabled="this.state=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="请假开始时间" :label-width="formLabelWidth">
          
            <el-date-picker type="date" placeholder="选择日期" :disabled="this.state=='show'" v-model="form.leaveStartTime" style="width: 100%;"></el-date-picker>
          
        </el-form-item>
        <el-form-item label="请假结束时间" :label-width="formLabelWidth">
          
            <el-date-picker type="date" placeholder="选择日期" :disabled="this.state=='show'" v-model="form.leaveEndTime" style="width: 100%;"></el-date-picker>
         
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.state=='show'">返 回</el-button>
        <el-button @click="handleCancel()" v-show="this.state!='show'">取 消</el-button>
        <el-button type="primary" @click="handleSure()" v-show="this.state!='show'">确 定</el-button>
      </div>
    </el-dialog>

    <!-- showForm -->

    <el-dialog :visible.sync="showFormVisible">
      <div slot="title">{{showTitle.title}}请假记录</div>
      <el-form :model="showForm">
        <el-form-item label="请假人" :label-width="formLabelWidth">
          <el-input v-model="showForm.employeeId" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="showForm.gender" :disabled="this.state=='show'">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="showForm.dutyName" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="请假事由" :label-width="formLabelWidth">
          <el-input v-model="showForm.leaveReasons" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="请假开始时间" :label-width="formLabelWidth">
          <el-input v-model="showForm.leaveStartTime" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="请假结束时间" :label-width="formLabelWidth">
          <el-input v-model="showForm.leaveEndTime" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.state=='show'">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getLeaveRecordPageInfoList, getLeaveRecordInfo, insertLeaveRecord, deleteLeaveRecord, updateLeaveRecord, getEmployeeList} from '@/api/basic'

  export default {
    data()
    {
      return {
        list: null,
        employees: null,
        listLoading: true,
        state: 'insert',
        form: {
          employeeId: '',
          gender: '',
          dutyId: '',
          leaveReasons: '',
          leaveStartTime: '',
          leaveEndTime: ''
        },
        showForm: {
          employeeId: '',
          gender: '',
          dutyId: '',
          leaveReasons: '',
          leaveStartTime: '',
          leaveEndTime: ''
        },
        params: {
          leaveId: ''
        },
        pages: {
          total: '',
          pageNum: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
        showFormVisible: false,
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
        this.listLoading = true
        getLeaveRecordPageInfoList(this.pages).then(response =>
        {
          this.pages.total = response.data.totalPage
          this.list = response.data.result
          this.listLoading = false
        })
        getEmployeeList().then(response =>
        {
          this.employees = response.data.result
        })
      },
      getLeaveRecordInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getLeaveRecordInfo(this.params).then(response =>
          {
            this.showFormVisible = false
            resolve()
          }).catch(error =>
          {
            reject(error.msg)
          })
        })
      },
      insertLeaveRecord()
      {
        return new Promise((resolve, reject) =>
        {
          insertLeaveRecord(this.form).then(response =>
          {
            this.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      deleteLeaveRecord()
      {
        return new Promise((resolve, reject) =>
        {
          deleteLeaveRecord(this.params).then(response =>
          {
            this.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error =>
          {
            reject(error.msg)
          })
        })
      },
      updateLeaveRecord()
      {
        return new Promise((resolve, reject) =>
        {
          updateLeaveRecord(this.form).then(response =>
          {
            this.dialogFormVisible = false
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
        if (state == 'insert')
        {
          this.dialogFormVisible = true;
          this.state = 'insert';
          this.showTitle.title = '新增';
          this.form.employeeId = row.employeeId;
          this.form.gender = row.gender;
          this.form.dutyId = row.dutyId;
          this.form.leaveReasons = row.leaveReasons;
          this.form.leaveStartTime = row.leaveStartTime;
          this.form.leaveEndTime = row.leaveEndTime;
        }
        else if (state == 'update')
        {
          this.dialogFormVisible = true;
          this.form = row;
          this.state = 'update';
          this.showTitle.title = '编辑';
        }
        else if (state == 'show')
        {
          this.dialogFormVisible = true;
          this.form = row;
          this.params.leaveId = row.leaveId;
          this.state = 'show';
          this.showTitle.title = '查看';
          this.getLeaveRecordInfo();
        }
      },
      handleSure()
      {
        if (this.state == 'insert')
        {
          this.insertLeaveRecord();
        }
        else if (this.state == 'update')
        {
          this.updateLeaveRecord();
        }
        else if (this.state == 'show')
        {
          this.getLeaveRecordInfo();
        }
      },
      handleDelete(index, row)
      {
        this.$confirm('确认删除？')
          .then(_ =>
          {
            this.params.leaveId = row.leaveId;
            this.deleteLeaveRecord();
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
          this.dialogFormVisible = false
        }
        else
        {
          this.fetchData()
          this.dialogFormVisible = false
        }
      },
      returnBack()
      {
        this.showFormVisible = false
      },
      handleSizeChange(size)
      {
        this.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage)
      {
        this.pages.pageNum = currentPage
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
