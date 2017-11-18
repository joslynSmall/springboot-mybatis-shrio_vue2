<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button v-if="commObj.hasBtnPermission('basic:bugLevel:add')" @click="showDialog(0)" type="info" icon="plus">
        新增
      </el-button>
      <el-input placeholder="请输入内容" v-model="form.bugLevelName" class="input-with-select">
        <el-button slot="append" type="info" icon="search" @click="fetchData">搜索</el-button>
      </el-input> -->
      <div class="demo-input-suffix"><span class="name">Bug名称：</span><el-input style="width:20%" v-model="form.bugLevelName"></el-input>
       <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button  @click="showDialog(0)" type="info" icon="plus" class="btnadd" v-if="commObj.hasBtnPermission('basic:bugLevel:add')">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="commObj.listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="BugID">
        <template scope="scope">
          {{scope.row.bugLevelId}}
        </template>
      </el-table-column>
      <el-table-column label="BUG名称" align="center">
        <template scope="scope">
          <span>{{scope.row.bugLevelName}}</span>
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
          <el-button size="small" v-if="commObj.hasBtnPermission('basic:bugLevel:view')"  icon="view" type="primary"
                     @click="showDialog(2, scope.row, 'show')">查看
          </el-button>
          <el-button v-if="commObj.hasBtnPermission('basic:bugLevel:edit')" size="small"
                     @click="showDialog(1, scope.row)" type="info" icon="edit">编辑
          </el-button>
          <el-button v-if="commObj.hasBtnPermission('basic:bugLevel:delete')" size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)" icon="circle-cross">删除
          </el-button>
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
      <div slot="title">{{commObj.title}}bug等级</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="BUG名称">
          <el-input v-model="form.bugLevelName" auto-complete="off" placeholder="请输入等级名称"
                    :disabled="this.commObj.isEdit==2"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          
          <el-input v-model="form.createTime" auto-complete="off" :disabled="this.commObj.isEdit==2"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
         
          <el-input v-model="form.updateTime" auto-complete="off" :disabled="this.commObj.isEdit==2"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commObj.dialogFormVisible = false" v-show="this.commObj.isEdit==2"><i
          class="fa fa-arrow-circle-left"></i> 返回
        </el-button>
        <el-button @click="commObj.dialogFormVisible = false" icon="circle-close" v-show="this.commObj.isEdit!==2">取 消
        </el-button>
        <el-button type="primary" @click="handleData" icon="circle-check" v-show="this.commObj.isEdit!==2">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getBugLevelList, insertBugLevel, updateBugLevel, deleteBugLevelByPrimaryKey} from '@/api/basic'
  import {baseObj} from '@/api/baseObj'

  let commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据
  })

  export default {

    data() {
      return {
        commObj: commObj,
        list: null,
        form: {
          bugLevelName: '',
          createTime: '',
          updateTime: '',
          bugLevelId: '',
        },
        // formLabelWidth:'120px'
      }
    },
    created() {

      this.fetchData()
    },
    methods: {
      fetchData() {
        commObj.listLoading = true
        getBugLevelList(Object.assign({}, commObj.pages, this.form)).then(response => {
          commObj.pages.total = response.page.total
          this.list = response.page.list
          commObj.listLoading = false
        })
      },
      insertBugLevel() {
        return new Promise((resolve, reject) => {
          insertBugLevel(this.form).then(response => {
            commObj.listLoading = false
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateBugLevel() {
        return new Promise((resolve, reject) => {
          updateBugLevel(this.form).then(response => {
            commObj.listLoading = false
            this.fetchData()
            resolve()
            this.form = {
              bugLevelName: '',
              createTime: '',
              updateTime: '',
              bugLevelId: '',

            }
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteBugLevelByPrimaryKey(row) {
        return new Promise((resolve, reject) => {
          deleteBugLevelByPrimaryKey(row).then(response => {
            commObj.listLoading = false
            resolve(response)
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      showDialog(index, row) {
        if (row != undefined) this.form = row;
        commObj.isEdit = index;
        switch (commObj.isEdit) {
          case 0:
            this.commObj.title = '新增'
            break;
          case 1:
            this.commObj.title = '编辑'
            break;
          case 2:
            this.commObj.title = '查看';
            break;
        }
        commObj.dialogFormVisible = true
      },
      handleData(index, row) {
        console.log(row)
        switch (commObj.isEdit) {
          case 0:
            this.insertBugLevel();
            commObj.dialogFormVisible = false
            break;
          case 1:
            this.updateBugLevel();
            commObj.dialogFormVisible = false
            break;
        }
      },
      handleDelete(index, row, done) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.deleteBugLevelByPrimaryKey(row);
            done();
          })
          .catch(_ => {
          });
      },
      //分页
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






