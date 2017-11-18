<template>
  <div class="app-container">
    <el-form :model="form" label-position="top">
      <el-form-item label="BUG名称">
        <el-input v-model="form.bugLevelName" auto-complete="off" placeholder="请输入等级名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)" icon="circle-close">返回
      </el-button>
      <el-button type="primary" @click="insertBugLevel" icon="circle-check">保存
      </el-button>
    </div>
  </div>
</template>


<script>
  import {insertBugLevel} from '@/api/basic'

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
      insertBugLevel() {
        return new Promise((resolve, reject) => {
          insertBugLevel(this.form).then(response => {
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
