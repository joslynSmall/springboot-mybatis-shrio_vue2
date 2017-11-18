<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <!-- <img src="../../assets/login-logo.png" alt="" srcset=""> -->
      <!-- <h3 class="title">绩效管理系统</h3> -->
       <el-form-item prop="username" class="border username" >
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="password" class="border">
        <span class="svg-container">
          <icon-svg icon-class="mima" ></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>账号:admin 密码随便填</div>
      <div class='tips'>账号:editor  密码随便填</div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'yansen',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  // @import "static/font-awesome.min.css";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 662px;
    // background-color: $bg;
    background:url(../../assets/beijian_img.jpg) no-repeat;
    background-size:100% 100%;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #4db3ff;
      height: 40px;
    }
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .el-form-item__content{
      line-height:0;
    }
    .title {
      font-size: 30px;
      font-weight: 400;
      color: #6d9db7;
      margin: 0px auto 36px 15px;
      text-align: center;
      font-weight: bold;
      letter-spacing:21px;
    }
    .login-form {
    background: url(../../assets/index_05.png) no-repeat;
    position: absolute;
    left: 0;
    right: 0;
    width: 475px;
    height: 563px;
    padding: 35px 84px 15px 98px;
    margin: 49px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      transition: all 0.30s ease-in-out;
      -webkit-transition: all 0.30s ease-in-out;
      -moz-transition: all 0.30s ease-in-out;
      outline:none;

    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .login-form{
    //  background-color:rgba(115, 172, 214, 0.25);
     border-radius: 8px;
    }
    .border{
      border-radius: 30px;
    }
    .username{margin-top: 154px;}
    .border:hover{
      border: 1px solid #4ebce6;
      box-shadow: 0 0 4px #4aaad2;

    }
    .el-button--primary{
      border-radius: 20px;
      padding:13px 15px
    }
    .btn{border-radius: 25px;margin-top:42px;}
    .svg-icon{fill: #4db3ff}

  }
</style>
