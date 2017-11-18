<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">技术名称：</span><el-input  v-model="technologyPreferenceName" style="width:20%"></el-input>
        <el-button type="info" icon="search" class="btnsearch" @click="fetchData">搜索</el-button>
        <el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>
      <!-- <el-button @click="handleShow('','','insert')"type="info" icon="plus">新增</el-button> -->
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="技术偏好ID">
        <template scope="scope">
          {{scope.row.technologypreferenceId}}
        </template>
      </el-table-column>
      <el-table-column label="技术名称" align="center">
        <template scope="scope">
          <span>{{scope.row.technologypreferenceName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="技术描述" align="center">
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
      <el-table-column label="操作" align="center" width="250px">
        <template scope="scope">
          <el-button size="small" icon="view" type="info"  @click="handleShow(scope.$index, scope.row, 'show')">查看</el-button>
          <el-button size="small" type="primary" icon="edit"  @click="handleShow(scope.$index, scope.row, 'update')">编辑</el-button>
          <el-button size="small" type="danger" icon="circle-cross" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage6"
        :page-size="commObj.pages.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commObj.pages.total">
      </el-pagination>
    </div>

    <!-- Form -->

    <el-dialog :visible.sync="commObj.dialogFormVisible">
      <div slot="title">{{showTitle.title}}-技术偏好信息</div>
      <el-form :model="form"label-position="top">
        <el-form-item label="技术Id" :label-width="formLabelWidth" v-if="showTime" >
          <el-input v-model="form.technologypreferenceId" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="技术名称" :label-width="formLabelWidth" >
          <el-input v-model="form.technologypreferenceName" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="技术描述:"  class="inputform" style="width: 430px" >
          <el-input v-model="form.remark" auto-complete="off" :disabled="this.state=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth" v-if="showTime" >
          <el-input v-model="form.createTime" auto-complete="off" :disabled="this.state=='show'" ></el-input>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth" v-if="showTime" >
          <el-input v-model="form.updateTime" auto-complete="off" :disabled="this.state=='show'" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnBack()" v-show="this.state=='show'">返 回</el-button>
        <el-button @click="handleCancle()" v-show="this.state!='show'" icon="circle-close">取 消</el-button>
        <el-button type="primary" @click="handleSure()" v-show="this.state!='show'" icon="circle-check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getTechnologyPreferenceList, getTechnologyPreferenceInfo, insertTechnologyPreference, updateTechnologyPreference, deleteTechnologyPreference} from '@/api/basic'
  import {baseObj} from '@/api/baseObj'

  const commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {

    data() {
      return {
        commObj: commObj,
        list: null,
        listLoading: false,
        state: 'insert',
        form: {
          technologypreferenceId: '',
          technologyPreferenceName: '',
          remark: '',
          createTime: '',
          updateTime: '',
        },
        params: {
          // TODO 用于id操作
          technologypreferenceId: ''
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
        this.form.technologyPreferenceName = this.technologyPreferenceName
        getTechnologyPreferenceList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response);
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
      },
      insertTechnologyPreference() {
        return new Promise((resolve, reject) => {
          insertTechnologyPreference(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateTechnologyPreference() {
        return new Promise((resolve, reject) => {
          updateTechnologyPreference(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteTechnologyPreference() {
        return new Promise((resolve, reject) => {
          deleteTechnologyPreference(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      getTechnologyPreferenceInfo() {
        return new Promise((resolve, reject) => {
          getTechnologyPreferenceInfo(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      handleShow(index, row, state)
      {
        commObj.dialogFormVisible = true
        this.showTime = false
        this.IshowTime = true
        if (state === 'insert')
        {
          this.state = 'insert';
          this.showTitle.title = '新增';
          this.form.technologypreferenceName = row.technologypreferenceName;
          this.form.remark = row.remark;
          this.form.createTime= row.createTime;
          this.form.updateTime= row.updateTime;
        }
        else if (state === 'update')
        {
          this.form = row;
          this.state = 'update';
          this.showTitle.title = '编辑';
        }
        else if (state === 'show')
        {
          this.form = row;
          this.params.technologypreferenceId = row.technologypreferenceId;
          this.state = 'show';
          // this.form.functionTypeName = row.functionTypeName;
          this.showTitle.title = '查看';
          this.showTime = true;
        }
      },
      handleSure()
      {
        if (this.state === 'insert')
        {
          this.insertTechnologyPreference();
          commObj.dialogFormVisible = true
        }
        else if (this.state === 'update')
        {
          this.updateTechnologyPreference();
        }
        else if (this.state === 'show')
        {
          this.getTechnologyPreferenceInfo();
        }
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.params.technologypreferenceId = row.technologypreferenceId;
            this.deleteTechnologyPreference();
            done();
          })
          .catch(_ => {
          });
      },
      handleCancle() {
        if (this.state === 'insert') {
          commObj.dialogFormVisible = false
        } else {
          this.fetchData()
          commObj.dialogFormVisible = false
        }
      },
      returnBack() {
        commObj.dialogFormVisible = false
      },
      // 分页
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
<style lang="css" scoped>

</style>




