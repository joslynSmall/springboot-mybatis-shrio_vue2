<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="demo-input-suffix"><span class="name">员工姓名：</span><el-input style="width:20%"></el-input> <el-button type="info" icon="search" class="btnsearch">查询</el-button><el-button @click="handleShow('','','insert')" type="info" icon="plus" class="btnadd">新增</el-button></div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="技术名称" align="center">
        <template scope="scope">
          <span>{{scope.row.technologyPreferenceName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工名称" align="center">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
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
      <el-table-column label="操作" align="center" width="186">
        <template scope="scope">
           <el-button size="small" icon="view" type="info" @click="handleShow(scope.$index, scope.row, 'show')">查看</el-button>
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
      <div slot="title">{{showTitle.title}}技术信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="技术名称" :label-width="formLabelWidth">
          <el-select v-model="form.technologypreferenceId" filterable placeholder="请选择">
            <el-option v-for="item in technologyPreferences"
                             :key="item.value"
                             :label="item.technologypreferenceName"
                             :value="item.technologypreferenceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工" :label-width="formLabelWidth">
          <el-select v-model="form.employeeId" filterable placeholder="请选择">
            <el-option v-for="item in employees"
                             :key="item.value"
                             :label="item.employeeName"
                             :value="item.employeeId"></el-option>
          </el-select>
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
  import {getTechnologyPreference_RelList, getTechnologyPreference_RelInfo, insertTechnologyPreference_Rel,
          updateTechnologyPreference_Rel, deleteTechnologyPreference_Rel, getEmployeeList,
          getTechnologyPreferenceList} from '@/api/basic'

  export default {
    data()
    {
      return {
        list: null,
        employees: null,
        technologyPreferences: null,
        listLoading: true,
        isEdit: 'insert',     //用于判断新增或修改  insert   update show 查看
        form: {
          technologypreferenceId: '',
          employeeId: ''
        },
        params: {
          //TODO 用于id操作
          technologypreferenceId: '',
          employeeId: ''
        },
        pages: {
          total: '',
          pageNum: 1,
          pageSize: 10
        },
        dialogFormVisible: false,
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
        getTechnologyPreference_RelList(this.pages).then(response =>
        {
          console.log(response);
          this.pages.total = response.data.totalPage
          this.list = response.data.result
          this.listLoading = false
        }),
        getEmployeeList().then(response =>
        {
          this.employees = response.data.result
        }),
        getTechnologyPreferenceList().then(response =>
        {
          this.technologyPreferences = response.data.result
        })
      },
      getTechnologyPreference_RelInfo()
      {
        return new Promise((resolve, reject) =>
        {
          getTechnologyPreference_RelInfo(this.params).then(response =>
          {
            this.dialogFormVisible = false
            resolve()
          }).catch(error =>
          {
            reject(error)
          })
        })
      },
      insertTechnologyPreference_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          insertTechnologyPreference_Rel(this.form).then(response =>
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
      updateTechnologyPreference_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          updateTechnologyPreference_Rel(this.form).then(response =>
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
      deleteTechnologyPreference_Rel()
      {
        return new Promise((resolve, reject) =>
        {
          deleteTechnologyPreference_Rel(this.params).then(response =>
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
        this.dialogFormVisible = true
        if (edit == 'insert')
        {
          this.isEdit = 'insert';
          this.showTitle.title = '新增';
          this.form.technologypreferenceId = row.technologypreferenceId;
          this.form.employeeId = row.employeeId;
        } else if (edit == 'update')
        {
          this.form = row;
          this.isEdit = 'update';
          this.showTitle.title = '编辑';
        } else
        {
          this.form = row;
          this.params.technologypreferenceId = row.technologypreferenceId;
          this.isEdit = 'show';
          this.showTitle.title = '查看';
        }
      },
      handleSure()
      {
        console.log(this.isEdit + '====');
        if (this.isEdit == 'insert')
        {
          //新增
          this.insertTechnologyPreference_Rel();
        } else if (this.isEdit == 'update')
        {
          //修改
          this.updateTechnologyPreference_Rel();
        } else
        {
          //查看
          this.getTechnologyPreference_RelInfo()
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
            console.log(row.projectId + '======');
            this.params.technologypreferenceId = row.technologypreferenceId;
            this.params.employeeId = row.employeeId;
            this.deleteTechnologyPreference_Rel();
            done();
          })
          .catch(_ =>
          {

          });
      },
      returnBack()
      {
        this.dialogFormVisible = false
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
    },
    watch: {
      isEdit: function (val, oldVa)
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
</script>
