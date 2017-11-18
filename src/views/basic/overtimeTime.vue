<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">时段名称：</span><el-input  v-model="overtimetimeName" style="width:20%"></el-input>
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
      <el-table-column label="时段ID">
        <template scope="scope">
          {{scope.row.overtimetimeId}}
        </template>
      </el-table-column>
      <el-table-column label="时段名称" align="center">
        <template scope="scope">
          <span>{{scope.row.overtimetimeName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时段类型" align="center">
        <template scope="scope">
          <span>{{scope.row.overtimetimeType}}</span>
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
      <div slot="title">{{showTitle.title}}-时段信息</div>
      <el-form :model="form"label-position="top">
        <el-form-item label="时段Id" :label-width="formLabelWidth" v-if="showTime">
          <el-input v-model="form.overtimetimeId" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="时段名称" :label-width="formLabelWidth">
          <el-input v-model="form.overtimetimeName" auto-complete="off" :disabled="this.state=='show'"></el-input>
        </el-form-item>
        <el-form-item label="时段类型" :label-width="formLabelWidth">
          <el-input v-model="form.overtimetimeType" auto-complete="off" :disabled="this.state=='show'"></el-input>
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
  import {getOvertimeTimeList, getOvertimeTimeInfo, insertOvertimeTime, updateOvertimeTime, deleteOvertimeTime} from '@/api/basic'
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
          overtimetimeId: '',
          overtimetimeName: '',
          overtimetimeType: '',
          createTime: '',
          updateTime: '',
        },
        params: {
          // TODO 用于id操作
          overtimetimeId: ''
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
        this.form.overtimetimeName = this.overtimetimeName
        getOvertimeTimeList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response);
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
      },
      insertOvertimeTime() {
        return new Promise((resolve, reject) => {
          insertOvertimeTime(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateOvertimeTime() {
        return new Promise((resolve, reject) => {
          updateOvertimeTime(this.form).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteOvertimeTime() {
        return new Promise((resolve, reject) => {
          deleteOvertimeTime(this.params).then(response => {
            commObj.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      getOvertimeTimeInfo() {
        return new Promise((resolve, reject) => {
          getOvertimeTimeInfo(this.params).then(response => {
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
        if (state === 'insert')
        {
          this.state = 'insert';
          this.showTitle.title = '新增';
          this.form.overtimetimeName = row.overtimetimeName;
          this.form.overtimetimeType=row.overtimetimeType;
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
          this.params.overtimetimeId = row.overtimetimeId;
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
          this.insertOvertimeTime();
          commObj.dialogFormVisible = true
        }
        else if (this.state === 'update')
        {
          this.updateOvertimeTime();
        }
        else if (this.state === 'show')
        {
          this.getOvertimeTimeInfo();
        }
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.params.overtimetimeId = row.overtimetimeId;
            this.deleteOvertimeTime();
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




