<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">Bug名称：</span>
        <el-input style="width:20%" v-model="form.bugLevelName"></el-input>
        <el-button type="info" icon="search" class="btnsearch">查询</el-button>
        <el-button type="info" icon="plus" class="btnadd"
                   v-if="baseObj.hasBtnPermission('basic:bugLevel:add')">
          <router-link v-bind:to="{path:'/basic/bugLevelAdd',query:this.form}">新增</router-link>
        </el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="baseObj.listLoading" element-loading-text="加载中..." border fit
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
          <el-button size="small" v-if="baseObj.hasBtnPermission('basic:bugLevel:view')" icon="view" type="primary">
            <router-link v-bind:to="{path:'/basic/bugLevelView',query:scope.row}">查看</router-link>
          </el-button>
          <el-button v-if="baseObj.hasBtnPermission('basic:bugLevel:edit')" size="small" icon="edit">
          <router-link v-bind:to="{path:'/basic/bugLevelEdit',query:scope.row}">编辑</router-link>
          </el-button>
          <el-button v-if="baseObj.hasBtnPermission('basic:bugLevel:delete')" size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)" icon="circle-cross">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="baseObj.pages.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="baseObj.pages.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {getBugLevelList,deleteBugLevelByPrimaryKey} from '@/api/basic'

  export default {

    data() {
      return {
        list: null,
        form: {
          bugLevelName: '',
          createTime: '',
          updateTime: '',
          bugLevelId: '',
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.baseObj.listLoading = true
        getBugLevelList(Object.assign({}, this.baseObj.pages, this.form)).then(response => {
          this.baseObj.pages.total = response.page.total
          this.list = response.page.list
          this.baseObj.listLoading = false
        })
      },
      deleteBugLevelByPrimaryKey(row) {
        return new Promise((resolve, reject) => {
          deleteBugLevelByPrimaryKey(row).then(response => {
            this.baseObj.listLoading = false
            resolve(response)
            this.fetchData()
          }).catch(error => {
            reject(error.msg)
          })
        })
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
        this.baseObj.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage) {
        this.baseObj.pages.pageNum = currentPage
        this.fetchData();
      }
    }
  }
</script>
<style lang="css" scoped>

</style>
