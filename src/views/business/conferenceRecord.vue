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
      <el-table-column label="项目名称" >
        <template scope="scope">
          {{scope.row.projectName}}
        </template>
      </el-table-column>
      <el-table-column label="会议主题" >
        <template scope="scope">
          {{scope.row.conferenceTheme}}
        </template>
      </el-table-column>
      <el-table-column label="会议内容" align="center">
        <template scope="scope">
          <span>{{scope.row.conferenceContent}}</span>
        </template>
      </el-table-column>
      <el-table-column label="会议开始时间" align="center">
        <template scope="scope">
          {{scope.row.conferenceStarttime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议结束时间">
        <template scope="scope">
          {{scope.row.conferenceEndtime}}
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
      <div slot="title">{{showTitle.title}}加班信息</div>
      <el-form :model="form">
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.projectId" filterable placeholder="请选择项目" :disabled="this.isEdit=='show'">
            <el-option v-for="item in projects"
                             :key="item.value"
                             :label="item.projectName"
                             :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-input v-model="form.conferenceTheme" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <!-- <el-form-item label="会议内容" :label-width="formLabelWidth">
          <el-input v-model="form.conferenceContent" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item> -->
        <el-form-item label="会议内容:" class="inputform" style="width: 92%;">
          <el-input v-model="form.conferenceContent" auto-complete="off" :disabled="this.isEdit=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="会议开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.conferenceStarttime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
        </el-form-item>
        <el-form-item label="会议结束时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.conferenceEndtime" style="width: 100%;" :disabled="this.isEdit=='show'"></el-date-picker>
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
      <el-form :model="detailForm">
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="detailForm.projectId" filterable placeholder="请选择项目">
            <el-option v-for="item in projects"
                             :key="item.value"
                             :label="item.projectName"
                             :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-input v-model="detailForm.conferenceTheme" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" :label-width="formLabelWidth">
          <el-input v-model="detailForm.conferenceContent" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="会议开始时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.conferenceStarttime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="会议结束时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="detailForm.conferenceEndtime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.isEdit=='show'">返 回</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
  import {getConferenceRecordList, getConferenceRecordInfo, insertConferenceRecord, updateConferenceRecord,
          deleteConferenceRecord, getProjectList} from '@/api/basic'
  
    

  export default {
    data()
    {
      return {
     
        list: null,
        projects: null,        //项目信息
        listLoading: true,
        isEdit: 'insert',     //用于判断新增或修改  insert   update  show 查看
        form: {
          conferenceTheme: '',
          conferenceContent: '',
          conferenceStarttime: '',
          conferenceEndtime: '',
          projectId: ''       //项目id
        },
        detailForm: {
          conferenceTheme: '',
          conferenceContent: '',
          conferenceStarttime: '',
          conferenceEndtime: '',
          projectId: ''       //项目id
        },
        params: {
          //TODO 用于id操作
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
        getConferenceRecordList(this.pages).then(response =>
        {
          console.log(response);
          this.pages.total = response.data.totalPage
          this.list = response.data.result
          this.listLoading = false
        }),
        getProjectList().then(response =>
        {
          console.log(response);
          this.projects = response.data.result
        })
      },
      getConferenceRecordInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getConferenceRecordInfo(this.params).then(response =>
          {
            this.detailForm=response.data;
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertConferenceRecord()
      {
        return new Promise((resolve, reject) =>
        {
          insertConferenceRecord(this.form).then(response =>
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
      updateConferenceRecord()
      {
        return new Promise((resolve, reject) =>
        {
          updateConferenceRecord(this.form).then(response =>
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
      deleteConferenceRecord()
      {
        return new Promise((resolve, reject) =>
        {
          deleteConferenceRecord(this.params).then(response =>
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
          this.form.conferenceTheme = row.conferenceTheme;
          this.form.conferenceContent = row.conferenceContent;
          this.form.conferenceStarttime = row.conferenceStarttime;
          this.form.conferenceEndtime = row.conferenceEndtime;
          this.form.conferenceRecordId = row.conferenceRecordId;
          this.form.projectId = row.projectId;
        } else if (edit == 'update')
        {
          this.dialogFormVisible = true
          this.form = row;
          this.isEdit = 'update';
          this.showTitle.title = '编辑';
        } else
        {
          // this.detailFormVisible = true
           this.dialogFormVisible = true
          this.params.conferenceRecordId = row.conferenceRecordId;
          this.isEdit = 'show';
          this.form = row;
          this.showTitle.title = '查看';
          this.getConferenceRecordInfo()
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====');
        if (this.isEdit == 'insert')
        {
          //新增
          this.insertConferenceRecord();
        } else if (this.isEdit == 'update')
        {
          //修改
          this.updateConferenceRecord();
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
            this.params.conferenceRecordId = row.conferenceRecordId
            this.deleteConferenceRecord();
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
