<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button @click="showDialog(0)" type="info" icon="plus">新增</el-button> -->
      <!--<el-button @click="dialogFormVisible = true">新增bug等级</el-button>
      <el-button @click="dialogFormVisible = true">新增bug等级</el-button>-->
      <div class="demo-input-suffix"><span class="name">功能名称：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="showDialog(0)" type="info" icon="plus" class="btnadd">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="commObj.listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="功能id">
        <template scope="scope">
          {{scope.row.functionId}}
        </template>
      </el-table-column>

      <el-table-column label="功能名称" align="center">
        <template scope="scope">
          <span>{{scope.row.functionName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能描述" align="center">
        <template scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目id" align="center">
        <template scope="scope">
          <span>{{scope.row.projectId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块id" align="center">
        <template scope="scope">
          <span>{{scope.row.moduleId}}</span>
        </template>
      </el-table-column><el-table-column label="页面id" align="center">
      <template scope="scope">
        <span>{{scope.row.pageId}}</span>
      </template>
    </el-table-column><el-table-column label="难度等级id" align="center">
      <template scope="scope">
        <span>{{scope.row.difficultyLevelId}}</span>
      </template>
    </el-table-column><el-table-column label="功能点id" align="center">
      <template scope="scope">
        <span>{{scope.row.functionTypeId}}</span>
      </template>
    </el-table-column><el-table-column label="是否需要外部接口" align="center">
      <template scope="scope">
        <span>{{scope.row.isNeedOuterInterface}}</span>
      </template>
    </el-table-column>
      <el-table-column label="外部接口名称" align="center">
        <template scope="scope">
          <span>{{scope.row.outerInterfaceName}}</span>
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
      <el-table-column label="操作" width="150px">
        <template scope="scope">
          <el-button size="small" @click="showDialog(1, scope.row)" icon="edit">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="circle-cross">删除</el-button>
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
      <div slot="title">{{commObj.title}}功能</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="功能名称" :label-width="formLabelWidth">
          <el-input v-model="form.functionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目ID" :label-width="formLabelWidth">
          <my-select url="getBugLevelList" v-model="form.projectId" @change="change"></my-select>
          <!--<my-select url="getBugLevelList" v-model="value"></my-select>-->
        </el-form-item>
        
         <el-form-item label="功能描述1:" class="inputform" style="width: 92%;">
          <el-input v-model="form.remark" auto-complete="off" :disabled="this.isEdit=='show'" :rows="2" type="textarea"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commObj.dialogFormVisible = false" icon="circle-close">取 消</el-button>
        <el-button type="primary" @click="handleData" icon="circle-check">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getFunctionList, insertFunction, updateFunction, deleteFunctionByPrimaryKey} from '@/api/basic'
  import {baseObj} from '@/api/baseObj'
  import mySelect from '@/components/select/select'

  let commObj = Object.assign({}, baseObj, {
    // 方便拓展页面数据

  })

  export default {
    data() {
      return {
        commObj:commObj,
        list: null,
        value:'',
        form: {
          functionId:'',
          functionName: '',
          remark:'',
          projectId:'',
          moduleId:'',
          pageId:'',
          difficultyLevelId:'',
          functionTypeId:'',
          isNeedOuterInterface:'',
          outerInterfaceName:'',
          createTime:null,
          updateTime:null
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        commObj.listLoading = true
        getFunctionList(commObj.pages).then(response => {
          console.log(response);
          commObj.pages.total = response.data.totalPage
          this.list = response.data.result
          commObj.listLoading = false
        })
      },
      insertFunction() {
        return new Promise((resolve, reject) => {
          insertFunction(this.form).then(response => {
            commObj.listLoading = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      updateFunction() {
        return new Promise((resolve, reject) => {
          updateFunction(this.form).then(response => {
            commObj.listLoading = false
            this.fetchData()
            resolve()
          }).catch(error => {
            reject(error.msg)
          })
        })
      },
      deleteFunctionByPrimaryKey(row) {
        return new Promise((resolve, reject) => {
          deleteFunctionByPrimaryKey(row).then(response => {
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
        }
        commObj.dialogFormVisible = true
      },
      handleData() {
        switch (commObj.isEdit) {
          case 0:
            this.insertFunction();
            break;
          case 1:
            this.updateFunction();
            break;
        }
      },
      handleDelete(index, row, done) {
        this.$confirm('确认删除？')
          .then(_ => {
            this.deleteFunctionByPrimaryKey(row);
            done();
          })
          .catch(_ => {
          });
      },
      handleSizeChange(size) {
        commObj.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage) {
        commObj.pages.pageNum = currentPage
        this.fetchData();
      },
      change(value){
        this.form.projectId = value
      }
    },
    components: {
      mySelect
    },
    watch: {
      'commObj.isEdit': function (val, oldVa) {
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
