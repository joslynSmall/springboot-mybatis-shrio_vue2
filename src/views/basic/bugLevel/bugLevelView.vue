<template>
  <div class="app-container">
    <el-form :model="form" label-position="top">
      <el-form-item label="BUG名称">
        <el-input v-model="form.bugLevelName" auto-complete="off" placeholder="请输入等级名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="form.updateTime" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)" icon="circle-close">返回
      </el-button>
    </div>
  </div>
</template>


<script>
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
    }
  }
</script>
<style lang="css" scoped>

</style>
