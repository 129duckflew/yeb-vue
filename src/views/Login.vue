<template>
    <div>
      <el-form :rules="rules" ref="loginForm" :model="loginForm"   class="loginContainer">
        <h3 class="loginTitle">登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text"  v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <img :src="captchaUrl" @click="updateCaptcha">
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        <el-button @click="submitLogin" type="primary" style="width: 100%">登录</el-button>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
          return {
            captchaUrl: '/captcha?time='+new Date(),
            // captchaUrl:'http://localhost:8081/captcha?time='+new Date(),
            loginForm:{
                username:'',
                password:'',
                code:"",
                rememberMe:true
            },
            rules:{
              username:[
                {
                  required:true,
                  message:'请输入用户名',
                  trigger:'blur'
                }
              ],
              password:[
                {
                  required:true,
                  message:'请输入密码',
                  trigger:'blur'
                }
              ],
              code:[
                {
                  required:true,
                  message:'请输入验证码',
                  trigger:'blur'
                }
              ]
            }
          }
        },
        methods:{
          updateCaptcha()
          {
            this.captchaUrl='/captcha?time='+new Date();
          },
          submitLogin()
          {
            this.$refs.loginForm.validate(
              valid=>{
                if (valid){
                  /**
                   * 发送登录请求
                   */
                  this.postRequest('/login',this.loginForm).then(resp=>{
                    if (resp){
                      /**
                       * 响应存在
                       */
                      window.sessionStorage.setItem('tokenStr',resp.obj.tokenHead+resp.obj.token);
                      console.log(resp);
                      this.$router.replace({path:'/home'})
                    }
                    else {
                    }
                  })

                }
                else {
                  this.$message.error('请输入所需信息')
                  return false;
                }
              }
            )
          }
        }
    }
</script>

<style>
  .loginContainer{
     border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }
</style>
