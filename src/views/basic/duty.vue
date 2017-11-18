<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">职位名称：</span><el-input style="width:20%" v-model="dutyName"></el-input> <el-button type="info" icon="search" class="btnsearch" @click="fetchData()">查询</el-button><el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="职位名称" align="center">
        <template scope="scope">
          <span>{{scope.row.dutyName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位描述" align="center">
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
      <el-table-column label="操作" align="center" width="250">
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
        :current-page="currentPage6"
        :page-size="pages.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>

    <!-- Form -->

    <el-dialog :visible.sync="dialogFormVisible">
      <div slot="title">{{showTitle.title}}职位信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="职位编号" :label-width="formLabelWidth" v-if="flagShow">
          <el-input v-model="form.dutyId" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" :label-width="formLabelWidth">
          <el-input v-model="form.dutyName" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth" v-if="flagShow">
          <el-input v-model="form.createTime" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth" v-if="flagShow">
          <el-input v-model="form.updateTime" auto-complete="off" :disabled="this.isEdit=='show'"></el-input>
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
  import {getDutyList, getDutyInfo, insertDuty, updateDuty, deleteDuty} from '@/api/basic'
  import {baseObj} from '@/api/baseObj'

  let commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {
    data() {
      return {
        commObj: commObj,
        list: null,
        isEdit: 'insert',     //用于判断新增或修改  insert   update show 查看
        form: {
          dutyName: ''
        },
        params: {
          //TODO 用于id操作
          dutyId: ''
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
        this.form.dutyName = this.dutyName
        getDutyList(Object.assign({}, commObj.pages, this.form)).then(response => {
          console.log(response)
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
      },
      getDutyInfo() {
        return new Promise((resolve, reject) => {
          getDutyInfo(this.params).then(response => {
            this.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      insertDuty() {
        return new Promise((resolve, reject) => {
          insertDuty(this.form).then(response => {
            this.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateDuty() {
        return new Promise((resolve, reject) => {
          updateDuty(this.form).then(response => {
            this.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteDuty() {
        return new Promise((resolve, reject) => {
          deleteDuty(this.params).then(response => {
            this.dialogFormVisible = false
            resolve()
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      handleShow(index, row, edit) {
        this.dialogFormVisible = true
        this.flagShow = false;
        if (edit == 'insert') {
          this.isEdit = 'insert';
          this.showTitle.title = '新增';
          this.form.dutyName = row.dutyName;
          this.form.remark = row.remark;
          this.form.dutyId = row.dutyId;
        } else if (edit == 'update') {
          this.form = row;
          this.isEdit = 'update';
          this.showTitle.title = '编辑';
        } else {
          this.form = row;
          this.params.dutyId = row.dutyId;
          this.isEdit = 'show';
          this.showTitle.title = '查看';
          this.flagShow = true;
        }
      },
      handleSure() {
        console.log(this.isEdit + '====');
        if (this.isEdit == 'insert') {
          //新增
          this.insertDuty();
        } else if (this.isEdit == 'update') {
          //修改
          this.updateDuty();
        } else {
          //查看
          this.getDutyInfo()
        }
      },
      handleCancle() {
        if (this.isEdit == 'insert') {
          this.dialogFormVisible = false
        } else {
          this.fetchData()
          this.dialogFormVisible = false
        }
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？').then(_ => {
          console.log(row.projectId + '======');
          this.params.dutyId = row.dutyId;
          this.deleteDuty();
          done();
        }) .catch(_ => {

        });
      },
      returnBack() {
        this.dialogFormVisible = false
      },
      handleSizeChange(size) {
        commObj.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage) {
        commObj.pages.pageNum = currentPage
        this.fetchData();
      }
    },
    watch: {
      isEdit: function (val, oldVa) {
        if (val == 0) {
          for (var p in this.form) {
            if (typeof ( this.form [p]) != " function ") {
              this.form [p] = '';
            }
          }
        }
      }
    }
  }
</script>
<style lang="css" scoped>

</style>
