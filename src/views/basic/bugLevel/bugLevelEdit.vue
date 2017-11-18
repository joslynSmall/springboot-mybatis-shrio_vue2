<template>
  <div class="app-container">
    <el-form :model="form" label-position="top">
      <el-form-item label="BUG名称">
        <el-input v-model="form.bugLevelName" auto-complete="off" placeholder="请输入等级名称"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker
          v-model="form.updateTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)" icon="circle-close">返回
      </el-button>
      <el-button type="primary" @click="updateBugLevel" icon="circle-check">保存
      </el-button>
    </div>
  </div>
</template>


<script>
  import {updateBugLevel} from '@/api/basic'

  export default {

    data() {
      return {
        form: {
          bugLevelName: '',
          createTime: '',
          updateTime: '',
          bugLevelId: '',
        }
      }
    },
    created() {
    },
    mounted() {
      console.log(this.$route);
      console.log(this.$route.query);
      this.form = this.$route.query;
    },
    methods: {
      updateBugLevel() {
        return new Promise((resolve, reject) => {
          updateBugLevel(this.form).then(response => {
            this.baseObj.listLoading = false
            this.$router.go(-1)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
</script>
<style lang="css" scoped>

</style>
