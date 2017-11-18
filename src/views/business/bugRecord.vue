<template>
  <div class="app-container">
    <div class="filter-container">
        <div class="demo-input-suffix"><span class="name">员工姓名：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="65">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="Bug记录编号" >
        <template scope="scope">
          {{scope.row.bugId}}
        </template>
      </el-table-column>
      <el-table-column label="项目任务确认名称" align="center" width="156">
        <template scope="scope">
          {{scope.row.projectName}}
        </template>
      </el-table-column>
      <el-table-column label="Bug等级" align="center">
        <template scope="scope">
          <span>{{scope.row.bugLevelName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Bug记录时间" align="center">
        <template scope="scope">
          {{scope.row.bugRecordTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="记录人">
        <template scope="scope">
          {{scope.row.employeeName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Bug状态">
        <template scope="scope">
          {{scope.row.bugStateName}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template scope="scope">
          <!-- <el-button size="small" @click="handleShow(scope.$index, scope.row, 'show')">查看</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
      <div slot="title">{{showTitle.title}}加班信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="员工" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" filterable placeholder="请选择加班人员" :disabled="this.isEdit=='show'">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.projectId" filterable placeholder="请选择项目" :disabled="this.isEdit=='show'">
            <el-option v-for="item in projects"
                             :key="item.value"
                             :label="item.projectName"
                             :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加班原因" :label-width="formLabelWidth">
          <el-input v-model="form.overtimeReason" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="加班日期">
          
            <el-date-picker type="date" placeholder="选择日期" v-model="form.overtimeTime" style="width: 100%;":disabled="this.isEdit=='show'"></el-date-picker>
          
        </el-form-item>
        <el-form-item label="加班时长(小时)" :label-width="formLabelWidth">
          <el-input v-model="form.overtimeHour" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="是否是节假日加班">
          <el-radio-group v-model="form.isHoliday" :disabled="this.isEdit=='show'">
            <el-radio label="0"  >是</el-radio>
            <el-radio label="1"  >否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="handleSure()" v-show="this.isEdit!='show'">确 定</el-button>
        <el-button @click="handleCancle()" v-show="this.isEdit!='show'">取 消</el-button> -->
        <el-button type="primary" @click="handleCancle()" v-show="this.isEdit=='show'"><i class="fa fa-arrow-circle-left"></i> 返回</el-button>
        <el-button @click="handleCancle()" icon="circle-close" v-show="this.isEdit!=='show'">取 消</el-button>
        <el-button type="primary" @click="handleSure()" icon="circle-check" v-show="this.isEdit!=='show'">确 定</el-button>
      </div>
    </el-dialog>

    <!--detailForm -->
    <!-- <el-dialog :visible.sync="detailFormVisible">
      <div slot="title">{{showTitle.title}}加班信息</div>
      <el-form :model="detailForm" label-position="top">
        <el-form-item label="员工" :label-width="formLabelWidth">
          <el-select v-model="detailForm.employeeId" filterable placeholder="请选择加班人员">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="detailForm.projectId" filterable placeholder="请选择项目">
            <el-option v-for="item in projects"
                             :key="item.value"
                             :label="item.projectName"
                             :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加班原因" :label-width="formLabelWidth">
          <el-input v-model="detailForm.overtimeReason" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="加班日期">
          
            <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.overtimeTime" style="width: 100%;"></el-date-picker>
         
        </el-form-item>
        <el-form-item label="加班时长(小时)" :label-width="formLabelWidth">
          <el-input v-model="detailForm.overtimeHour" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="是否是节假日加班">
          <el-radio-group v-model="detailForm.isHoliday" >
            <el-radio label="0"  >是</el-radio>
            <el-radio label="1"  >否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'">返 回</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
  import {getBugRecordList, getBugRecordInfo, insertBugRecord, updateBugRecord,
          deleteBugRecord } from '@/api/basic'

  export default {
    data()
    {
      return {
        list: null,
        employees: null,       //员工表信息
        projects: null,        //项目信息
        listLoading: true,
        isEdit: 'insert',     //用于判断新增或修改  insert   update  show 查看
        form: {
          overtimeReason: '',
          isHoliday: '',
          overtimeHour: '',
          overtimeTime: '',
          employeeId: '',     //员工id
          projectId: ''       //项目id
        },
        detailForm: {
          overtimeReason: '',
          isHoliday: '',
          overtimeHour: '',
          overtimeTime: ''
        },
        params: {
          //TODO 用于id操作
          employeeId: ''
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
        getBugRecordList(this.pages).then(response =>
        {
          console.log(response);
          this.pages.total = response.data.totalPage
          this.list = response.data.result
          this.listLoading = false
        }),
        getEmployeeList().then(response =>
        {
          console.log(response);
          this.employees = response.data.result
        }),
        getProjectList().then(response =>
        {
          console.log(response);
          this.projects = response.data.result
        })
      },
      getBugRecordInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getBugRecordInfo(this.params).then(response =>
          {
            this.detailForm=response.data;
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertBugRecord()
      {
        return new Promise((resolve, reject) =>
        {
          insertBugRecord(this.form).then(response =>
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
      updateBugRecord()
      {
        return new Promise((resolve, reject) =>
        {
          updateBugRecord(this.form).then(response =>
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
      deleteBugRecord()
      {
        return new Promise((resolve, reject) =>
        {
          deleteBugRecord(this.params).then(response =>
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
      handleShow(index, row, edit)
      {

        if (edit == 'insert')
        {
          this.dialogFormVisible = true
          this.isEdit = 'insert';
          this.showTitle.title = '新增';
          this.form.overtimeReason = row.overtimeReason;
          this.form.isHoliday = row.isHoliday;
          this.form.overtimeHour = row.overtimeHour;
          this.form.overtimeTime = row.overtimeTime;
          this.form.employeeId = row.employeeId;
          this.form.projectId = row.projectId;
        } else if (edit == 'update')
        {
          this.dialogFormVisible = true
          this.form = row;
          this.isEdit = 'update';
          this.showTitle.title = '编辑';
        } else
        {
          this.dialogFormVisible = true
          this.params.employeeId = row.employeeId;
          this.isEdit = 'show';
           this.form = row;
          this.showTitle.title = '查看';
          this.getOvertimeRecordInfo()
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====');
        if (this.isEdit == 'insert')
        {
          //新增
          this.insertBugRecord();
        } else if (this.isEdit == 'update')
        {
          //修改
          this.updateBugRecord();
        } else
        {
          //查看

        }
      },
      handleCancle()
      {
        if (this.isEdit == 'insert')
        {
          this.dialogFormVisible = false
        } else
        {
          // this.fetchData()
          this.dialogFormVisible = false
        }
      },
      handleDelete(index, row)
      {
        this.$confirm('确认删除？')
          .then(_ =>
          {
            this.params.employeeId = row.employeeId
            this.deleteBugRecord();
            done();
          })
          .catch(_ =>
          {

          });
      },
      returnBack()
      {
        this.detailFormVisible = false
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
      }
    }
  }
</script>
