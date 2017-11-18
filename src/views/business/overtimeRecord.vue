<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">员工姓名：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>

    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="45">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" >
        <template scope="scope">
          {{scope.row.employeeName}}
        </template>
      </el-table-column>
      <el-table-column label="职位" >
        <template scope="scope">
          {{scope.row.dutyName}}
        </template>
      </el-table-column>
      <el-table-column label="员工性别" >
        <template scope="scope">
          {{scope.row.sex==0?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" >
        <template scope="scope">
          {{scope.row.projectName}}
        </template>
      </el-table-column>
      <el-table-column label="加班日期" align="center">
        <template scope="scope">
          <span>{{scope.row.overtimeTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="加班原因" align="center">
        <template scope="scope">
          {{scope.row.overtimeReason}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="加班时段">
        <template scope="scope">
          {{scope.row.overtimeTimeName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否是节假日加班">
        <template scope="scope">
          {{scope.row.isHoliday==0?'是':'否'}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250">
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
      <div slot="title">{{showTitle.title}}加班信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="员工" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" v-on:change="changeEmployeeInsert()"  filterable placeholder="请选择加班人员" :disabled="this.isEdit=='show'" style="margin-bottom:12px;">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
          职位：<el-input v-model="this.dutyName" :disabled="true" auto-complete="off" style="width:30%;margin-right:10%;"></el-input>
          性别：<el-input v-model="this.gender" :disabled="true" auto-complete="off" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.projectId" filterable placeholder="请选择项目" :disabled="this.isEdit=='show'">
            <el-option v-for="item in projects"
                             :key="item.value"
                             :label="item.projectName"
                             :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="加班原因" :label-width="formLabelWidth" style="clear:both">
          <el-input v-model="form.overtimeReason" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item> -->
         <el-form-item label="加班原因:" class="inputform" style="width: 92%;">
          <el-input v-model="form.overtimeReason" auto-complete="off" :disabled="this.isEdit=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="加班日期">
          
            <el-date-picker type="date" placeholder="选择日期" v-model="form.overtimeTime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
          
        </el-form-item>
        <el-form-item label="加班时段" :label-width="formLabelWidth">
          <el-select v-model="form.overtimetimeId" filterable placeholder="请选择时段" :disabled="this.isEdit=='show'">
            <el-option v-for="item in overtimeTimes"
                             :key="item.value"
                             :label="item.overtimetimeName"
                             :value="item.overtimetimeId"></el-option>
          </el-select>
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

    <!--感觉这个查看的form有点多余-->

    <!--detailForm -->
    <!-- <el-dialog :visible.sync="detailFormVisible">
      <div slot="title">{{showTitle.title}}加班信息</div>
      <el-form :model="detailForm" label-position="top">
        <el-form-item label="员工" :label-width="formLabelWidth">
          <el-select v-model="detailForm.employeeId" filterable v-on:change="changeEmployeeSelect()" placeholder="请选择加班人员">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
          职位：<el-input v-model="this.dutyName" :disabled="true" auto-complete="off" style="width:30%"></el-input>
          性别：<el-input v-model="this.gender" :disabled="true" auto-complete="off" style="width:30%"></el-input>
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
        <el-form-item label="加班时段" :label-width="formLabelWidth">
          <el-select v-model="detailForm.overtimetimeId" filterable placeholder="请选择项目">
            <el-option v-for="item in overtimeTimes"
                             :key="item.value"
                             :label="item.overtimetimeName"
                             :value="item.overtimetimeId"></el-option>
          </el-select>
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
  import {getOvertimeRecordList, getOvertimeRecordInfo, insertOvertimeRecord, updateOvertimeRecord,
          deleteOvertimeRecord, getEmployeeList, getProjectList, getOvertimeTimeList} from '@/api/basic'

  export default {
    data()
    {
      return {
        list: null,
        employees: null,       //员工表信息
        projects: null,        //项目信息
        overtimeTimes: null,   //时段信息
        dutyName: '',          //
        gender: '',            //
        listLoading: true,
        isEdit: 'insert',     //用于判断新增或修改  insert   update  show 查看
        form: {
          overtimeReason: '',
          isHoliday: '',
          overtimeHour: '',
          overtimeTime: '',
          employeeId: '',     //员工id
          projectId: '',       //项目id
          overtimetimeId: ''      //时段id
        },
        detailForm: {
          overtimeReason: '',
          isHoliday: '',
          overtimeHour: '',
          overtimeTime: '',
          overtimetimeId: ''
        },
        params: {
          overtimerecordId: ''
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
      changeEmployeeSelect(){
          for(var i in this.employees){
            if(this.employees[i].employeeId==this.detailForm.employeeId){
              this.dutyName=this.employees[i].dutyName;
              this.gender=this.employees[i].gender==0?'男':'女';
            }
          }
      },
      changeEmployeeInsert(){
        for(var i in this.employees){
          if(this.employees[i].employeeId==this.form.employeeId){
            this.dutyName=this.employees[i].dutyName;
            this.gender=this.employees[i].gender==0?'男':'女';
          }
        }
      },
      fetchData()
      {
        this.listLoading = true
        getOvertimeRecordList(this.pages).then(response =>
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
        }),
        getOvertimeTimeList().then(response =>
        {
          console.log(response);
          this.overtimeTimes = response.data.result
        })
      },
      getOvertimeRecordInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getOvertimeRecordInfo(this.params).then(response =>
          {
            this.detailForm=response.data;
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertOvertimeRecord()
      {
        return new Promise((resolve, reject) =>
        {
          insertOvertimeRecord(this.form).then(response =>
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
      updateOvertimeRecord()
      {
        return new Promise((resolve, reject) =>
        {
          updateOvertimeRecord(this.form).then(response =>
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
      deleteOvertimeRecord()
      {
        return new Promise((resolve, reject) =>
        {
          deleteOvertimeRecord(this.params).then(response =>
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
          this.isEdit = 'insert'
          this.dialogFormVisible = true
          this.showTitle.title = '新增'
          this.form.overtimeReason = row.overtimeReason
          this.form.isHoliday = row.isHoliday
          this.form.overtimeHour = row.overtimeHour
          this.form.overtimeTime = row.overtimeTime
          this.form.overtimetimeId = row.overtimetimeId
          this.dutyName=''
          this.gender=''
          this.form.employeeId = row.employeeId
          this.form.projectId = row.projectId
          this.form.overtimerecordId = row.overtimerecordId
        } else if (edit == 'update')
        {
          this.isEdit = 'update'
          this.dialogFormVisible = true
          this.form = row
          this.changeEmployeeInsert()
          this.showTitle.title = '编辑'
        } else
        {
          this.dialogFormVisible = true
          this.params.overtimerecordId = row.overtimerecordId
           this.form = row
          this.isEdit = 'show'
          this.showTitle.title = '查看'
          this.getOvertimeRecordInfo()
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====')
        if (this.isEdit == 'insert')
        {
          //新增
          this.insertOvertimeRecord()
        } else if (this.isEdit == 'update')
        {
          //修改
          this.updateOvertimeRecord()
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
          this.fetchData()
          this.dialogFormVisible = false
        }
      },
      handleDelete(index, row)
      {
        this.$confirm('确认删除？')
          .then(_ =>
          {
            this.params.overtimerecordId = row.overtimerecordId
            this.deleteOvertimeRecord();
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
