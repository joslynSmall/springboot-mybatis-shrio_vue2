<template>
  <div class="app-container">
    <div class="filter-container">
  <div class="demo-input-suffix"><span class="name">Bug名称：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="showDialog(0)" type="info" icon="plus" class="btnadd">新增</el-button></div>
  <div class="senior">
   <div class="backicon"></div>
    <i :class="searchicon" @click="showsearch()"></i>
    <el-collapse-transition>
    <div class="cenior-search" v-show="showsearchstate">
      <span class="bugname">Bug名称：</span><el-input style="width:20%"></el-input>
      <span class="bugname">Bug名称：</span><el-input style="width:20%"></el-input>
      <span class="bugname">Bug名称：</span><el-input style="width:20%"></el-input>
      <el-button type="info" icon="search" style="margin-left:10px;">查询</el-button>
    </div>
    </el-collapse-transition>
  </div>
    </div>
    <el-table :data="list"   border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="项目计划名称" prop="name" width="130">
      </el-table-column>
    <el-table-column align="center" label="计划制定人" prop="mappeople"  width="130">
      </el-table-column>
     <el-table-column align="center" label="计划完成小组" prop="teams"  width="130">
    
      </el-table-column>
      <el-table-column align="center" label="项目计划内容" prop="content"  width="130">
    
      </el-table-column>
      <el-table-column label="计划制定时间" align="center" prop="mapdate"  width="130">
        
      </el-table-column>
       <el-table-column label="计划开始时间" align="center" prop="startdate"  width="130">
        
      </el-table-column>
       <el-table-column label="计划完成时间" align="center" prop="enddate"  width="130">
        
      </el-table-column>
      <el-table-column label="操作" width="250px" align="center">
        <template scope="scope">
          <el-button size="small" icon="view" type="info" @click="showDialog(2, scope.row, 'show')">查看</el-button>
          <el-button size="small" @click="showDialog(1, scope.row)" type="primary" icon="edit">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="circle-cross" >删除</el-button>
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
<div>
</div>
    <!-- Form -->
    <el-dialog :visible.sync="commObj.dialogFormVisible" top="10vh">
      <div slot="title">项目工作计划-{{commObj.title}}</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="项目计划名称:">
          <el-input v-model="form.name" auto-complete="off" :disabled="this.commObj.isEdit==2"></el-input>
        </el-form-item>
        <el-form-item label="计划制定人:">
         <el-select v-model="value" placeholder="请选择" :disabled="this.commObj.isEdit==2"><el-option v-for="item in options":key="item.value":label="item.label":value="item.value"></el-option></el-select>
        </el-form-item>
        <el-form-item label="项目工作计划内容:" class="inputform">
          <el-input v-model="form.content" auto-complete="off" :disabled="this.commObj.isEdit==2" :rows="2" type="textarea"></el-input>
        </el-form-item>
        
        <el-form-item label="计划完成小组:" >
         <el-select v-model="value" placeholder="请选择" :disabled="this.commObj.isEdit==2"><el-option v-for="item in options":key="item.value":label="item.label":value="item.value"></el-option></el-select>
        </el-form-item>
        
        <el-form-item label="计划制定时间:" >
          <el-date-picker v-model="value1" :disabled="this.commObj.isEdit==2" type="date"placeholder="选择日期":picker-options="pickerOptions0" class="dateform"></el-date-picker>
        </el-form-item>

         
        <el-form-item label="计划开始时间:" >
          <el-date-picker v-model="value1" :disabled="this.commObj.isEdit==2" type="date"placeholder="选择日期":picker-options="pickerOptions0" class="dateform"></el-date-picker>
        </el-form-item>
        
         
        <el-form-item label="计划完成时间:">
          <el-date-picker v-model="value1" :disabled="this.commObj.isEdit==2" type="date"placeholder="选择日期":picker-options="pickerOptions0" class="dateform"></el-date-picker>
        </el-form-item>
         
        <el-form-item label="创建时间:" >
          <el-date-picker v-model="value1" :disabled="this.commObj.isEdit==2" type="date"placeholder="选择日期":picker-options="pickerOptions0" class="dateform"></el-date-picker>
        </el-form-item>

       
        <el-form-item label="更新时间:">
          <el-date-picker v-model="value1" :disabled="this.commObj.isEdit==2" type="date"placeholder="选择日期":picker-options="pickerOptions0" class="dateform"></el-date-picker>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commObj.dialogFormVisible = false" v-show="this.commObj.isEdit==2"><i class="fa fa-arrow-circle-left"></i> 返回</el-button>
        <el-button @click="commObj.dialogFormVisible = false" icon="circle-close" v-show="this.commObj.isEdit!==2">取 消</el-button>
        <el-button type="primary" @click="handleData" icon="circle-check" v-show="this.commObj.isEdit!==2">确 定</el-button>
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
        commObj:commObj,
        
        options: [{
          value: '选项1',
          label: '上海计划负责人'
        }, {
          value: '选项2',
          label: '成都计划负责人'
        }, {
          value: '选项3',
          label: '重庆计划负责人'
        }, {
          value: '选项4',
          label: '长沙计划负责人'
        }, {
          value: '选项5',
          label: '北京计划负责人'
        }],
        value:'',
        value1:'',
        list: [  {
                  label:"序号",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                   {
                  label:"序号",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                   {
                  label:"序号",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                  {
                  label:"项目计划名称",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  }, 
                  { 
                   label:"序号",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                  {
                  label:"项目计划名称",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                   {
                  label:"项目计划名称",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  },
                   {
                  label:"项目计划名称",
                  name: '上海交委项目计划',
                  mappeople:'上海负责人',
                  content:'修改非预计数据没有的情况',
                  teams:'成都研发小组',
                  mapdate: '2016-05-04',
                  startdate:'2017-02-04',
                  enddate:'2017-11-09',
                  }
                  ],
        form: {
          name: '',
          mappeople: '',
          content: '',
          teams: '',
          mapdate: '',
          startdate: '',
          enddate: ''
        },
        showsearchstate:0,
        searchicon:"fa fa-chevron-circle-up"
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // fetchData() {
      //   commObj.listLoading = true
      //   getBugLevelList(commObj.pages).then(response => {
      //     console.log(response);
      //     commObj.pages.total = response.data.totalPage
      //     this.list = response.data.result
      //     commObj.listLoading = false
      //   })
      // },
      // insertBugLevel() {
      //   return new Promise((resolve, reject) => {
      //     insertBugLevel(this.form).then(response => {
      //       commObj.listLoading = false
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // },
      // updateBugLevel() {
      //   return new Promise((resolve, reject) => {
      //     updateBugLevel(this.form).then(response => {
      //       commObj.listLoading = false
      //       this.fetchData()
      //       resolve()
      //     }).catch(error => {
      //       reject(error.msg)
      //     })
      //   })
      // },
      // deleteBugLevelByPrimaryKey(row) {
      //   return new Promise((resolve, reject) => {
      //     deleteBugLevelByPrimaryKey(row).then(response => {
      //       commObj.listLoading = false
      //       resolve(response)
      //       this.fetchData()
      //     }).catch(error => {
      //       reject(error.msg)
      //     })
      //   })
      // },
      showDialog(index, row) {
        if(index==0){
          this.form={
             name: '',
            mappeople: '',
            content: '',
            teams: '',
            mapdate: '',
            startdate: '',
            enddate: ''
          }
        }
        // if (row != undefined) this.form = row;
        commObj.isEdit = index;
        switch (commObj.isEdit) {
          case 0:
            this.commObj.title = '新增'
            break;
          case 1:
            this.form = row;
            this.commObj.title = '编辑'
            break;
          case 2:
          this.form = row;
          this.commObj.title='查看';
          break;
        }
        commObj.dialogFormVisible = true
       
      },

      showDialogtwo(index, row) {
        if(index==0){
          this.form={
             name: '',
            mappeople: '',
            content: '',
            teams: '',
            mapdate: '',
            startdate: '',
            enddate: ''
          }
        }
        // if (row != undefined) this.form = row;
        commObj.isEdit = index;
        switch (commObj.isEdit) {
          case 0:
            this.commObj.title = '新增'
            break;
          case 1:
            this.form = row;
            this.commObj.title = '编辑'
            break;
          case 2:
          this.form = row;
          this.commObj.title='查看';
          break;
        }
        commObj.dialogFormVisible_1 =true
      },
      handleData() {
        switch (commObj.isEdit) {
          case 0:
            this.insertBugLevel();
            break;
          case 1:
            this.updateBugLevel();
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
      handleSizeChange(size) {
        commObj.pages.pageSize = size
        this.fetchData();
      },
      handleCurrentChange(currentPage) {
        commObj.pages.pageNum = currentPage
        this.fetchData();
      },
      //高级搜索
      showsearch(){
       if(this.showsearchstate==true){
         this.showsearchstate=false;
         this.searchicon="fa fa-chevron-circle-up"
       }
       else{
         this.showsearchstate=true;
         this.searchicon="fa fa-chevron-circle-down"
       }
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

<style scoped lang="css">
.dialog-two{width: 146%;margin-left: -14%;}
.filter-container{margin-bottom: 30px;}
</style>

