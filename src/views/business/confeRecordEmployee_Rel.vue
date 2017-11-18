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
      <el-table-column label="会议记录名称" >
        <template scope="scope">
          {{scope.row.conferenceTheme}}
        </template>
      </el-table-column>
      <el-table-column label="记录员工名称" >
        <template scope="scope">
          {{scope.row.employeeName}}
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
          <el-button size="small" type="info" @click="handleShow(scope.$index, scope.row, 'show')" icon="view" >查看</el-button>
          <el-button size="small" type="primary" @click="handleShow(scope.$index, scope.row, 'update')" icon="edit">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="circle-cross">删除</el-button>
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
      <div slot="title">{{showTitle.title}}会议记录与员工信息</div>
      <el-form :model="form">
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-select v-model="form.conferenceRecordId" filterable placeholder="请选择会议主题" :disabled="this.isEdit=='show'" >
            <el-option v-for="item in conferenceRecords"
                             :key="item.value"
                             :label="item.conferenceTheme"
                             :value="item.conferenceRecordId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="记录员工" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" filterable placeholder="请选择记录人员" :disabled="this.isEdit=='show'" >
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCancle()" v-show="this.isEdit=='show'"><i class="fa fa-arrow-circle-left"></i> 返回</el-button>
        <el-button @click="handleCancle()" icon="circle-close" v-show="this.isEdit!=='show'">取 消</el-button>
        <el-button type="primary" @click="handleSure()" icon="circle-check" v-show="this.isEdit!=='show'">确 定</el-button>
      </div>
    </el-dialog>

    <!--detailForm -->
    <!-- <el-dialog :visible.sync="detailFormVisible">
      <div slot="title">{{showTitle.title}}会议记录与员工信息</div>
      <el-form :model="detailForm">
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-select v-model="detailForm.conferenceRecordId" filterable placeholder="请选择会议主题">
            <el-option v-for="item in conferenceRecords"
                             :key="item.value"
                             :label="item.conferenceTheme"
                             :value="item.conferenceRecordId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="记录员工" :label-width="formLabelWidth">
          <el-select v-model="detailForm.employeeId" filterable placeholder="请选择记录人员">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'">返 回</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
  import {getConfeRecordEmployee_RelList, getConfeRecordEmployee_RelInfo, insertConfeRecordEmployee_Rel,
          updateConfeRecordEmployee_Rel, deleteConfeRecordEmployee_Rel, getEmployeeList,
          getConferenceRecordList } from '@/api/basic'

  export default {
    data()
    {
      return {
        list: null,
        employees: null,       //员工信息
        conferenceRecords: null,        //会议信息
        listLoading: true,
        isEdit: 'insert',     //用于判断新增或修改  insert   update  show 查看
        form: {
          employeeId: '',     //员工id
          conferenceRecordId: ''       //会议id
        },
        detailForm: {
          employeeId: '',     //员工id
          conferenceRecordId: ''       //会议id
        },
        params: {
          employeeId: '',
          conferenceRecordId: ''
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
        getConfeRecordEmployee_RelList(this.pages).then(response =>
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
        getConferenceRecordList().then(response =>
        {
          console.log(response);
          this.conferenceRecords = response.data.result
        })
      },
      getConfeRecordEmployee_RelInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getConfeRecordEmployee_RelInfo(this.params).then(response =>
          {
            this.detailForm=response.data;
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertConfeRecordEmployee_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          insertConfeRecordEmployee_Rel(this.form).then(response =>
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
      updateConfeRecordEmployee_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          updateConfeRecordEmployee_Rel(this.form).then(response =>
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
      deleteConfeRecordEmployee_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          deleteConfeRecordEmployee_Rel(this.params).then(response =>
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
          this.form.employeeId = row.employeeId;
          this.form.conferenceRecordId = row.conferenceRecordId;
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
          this.params.conferenceRecordId = row.conferenceRecordId;
          this.isEdit = 'show';
           this.form = row;
          this.showTitle.title = '查看';
          this.getConfeRecordEmployee_RelInfo()
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====');
        if (this.isEdit == 'insert')
        {
          //新增
          this.insertConfeRecordEmployee_Rel();
        } else if (this.isEdit == 'update')
        {
          //修改
          this.updateConfeRecordEmployee_Rel();
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
            this.params.employeeId = row.employeeId;
            this.params.conferenceRecordId = row.conferenceRecordId;
            this.deleteConfeRecordEmployee_Rel();
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
