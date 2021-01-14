<template>
  <div class="login-wrapper">
    <div class="container" :class="!loginType? 'right-panel-active' : ''">
      <div class="form-container sign-up-container">
        <el-form :model="ruleRegisterForm" :rules="rulesRegister" ref="ruleRegisterForm">
           <h1>注册</h1>
            <el-form-item prop="username">
                <el-input v-model="ruleRegisterForm.username" placeholder="用户名" suffix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleRegisterForm.password" placeholder="密码" suffix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="confirmpassword">
              <el-input type="password" v-model="ruleRegisterForm.confirmpassword" placeholder="确认密码" suffix-icon="el-icon-lock"></el-input>
            </el-form-item>         
            <el-form-item prop="code">
                <el-row>
                  <el-col :span="12">  
                    <el-input v-model="ruleRegisterForm.code" placeholder="验证码" suffix-icon="el-icon-chat-dot-round"></el-input>  
                  </el-col>
                  <el-col :span="10" :offset="2">  
                    <el-button type="primary" @click="getCode('register')" :loading="buttonloading">{{codeButtonStatus.text}}</el-button>  
                  </el-col>
                </el-row>
            </el-form-item>  
                
            
            <el-button type="primary" @click="submitRegisterForm('ruleRegisterForm')">注册</el-button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form :model="ruleLoginForm" :rules="rulesLogin" ref="ruleLoginForm">
           <h1>登录</h1>
           <el-form-item prop="username">
                <el-input v-model="ruleLoginForm.username" placeholder="用户名" suffix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleLoginForm.password" placeholder="密码" suffix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row>
                  <el-col :span="12">  
                    <el-input v-model="ruleLoginForm.code" placeholder="验证码" suffix-icon="el-icon-chat-dot-round"></el-input>  
                  </el-col>
                  <el-col :span="10" :offset="2">  
                    <el-button type="primary" @click="getCode('login')" :loading="buttonloading">{{codeButtonStatus.text}}</el-button>  
                  </el-col>
                </el-row>
            </el-form-item>  
            <el-button type="primary" :loading="loading" @click="submitLoginForm('ruleLoginForm')">
                登录
            </el-button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-left">
                <h1 class="text-white">欢迎回来！</h1>
                <p>请您先登录的个人信息，进行操作。</p>
                <button class="ghost" data-type="primary" id="signIn" @click="toggleClass">登录</button>
            </div>
            <div class="overlay-panel overlay-right">
                <h1 class="text-white">注册新账号！</h1>
                <p>输入您的个人信息注册账号。</p>
                <button class="ghost" data-type="primary" id="signUp" @click="toggleClass">注册</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername,chkEmail } from '@/utils/validate'
import {  Message } from 'element-ui'
import { GetSms,login,register } from "../../api/user"
export default {
  name: 'Login',
  data() {
    
    return {
      loginType: true,
      buttonloading:false,
      loading: false,
      ruleLoginForm: {
        username: '929915906@qq.com',
        password: '123456',
        code:''
      },
      ruleRegisterForm: {
        username: '',
        password: '',
        confirmpassword: '',
        code:''
      },
      codeButtonStatus:{
          status:false,
          text:'获取验证码'
      },
      rulesRegister: {
        username: [{ required: true,trigger: 'blur', message: '用户名不能为空'}],
        password: [{ required: true,trigger: 'blur', message: '密码不能为空'}],
        confirmpassword: [{ required: true,trigger: 'blur', message: '确认密码不能为空'}],
        code: [{ required: true,trigger: 'blur', message: '验证码不能为空'}],
      },
      rulesLogin: {
        username: [{ required: true,trigger: 'blur', message: '用户名不能为空'}],
        password: [{ required: true,trigger: 'blur', message: '密码不能为空'}],
        code: [{ required: true,trigger: 'blur', message: '验证码不能为空'}],
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    toggleClass(){
      this.loginType = !this.loginType;
      this.codeButtonStatus={
          status:false,
          text:'获取验证码'
      }
    },
    //获取验证码
    //获取验证码
    getCode(val){
      this.countDown(60)
      let params={
          username:val==="login"?this.ruleLoginForm.username:this.ruleRegisterForm.username,
          module:val
      }
      this.codeButtonStatus ={
        status:true,
        text:'发送中'
      }
      this.buttonloading =true;
      GetSms(params).then(res =>{
          this.buttonloading=false;
          Message({
             message: res.message,
             type: 'success',
             duration: 5 * 1000
          });
          this.codeButtonStatus.status =false;
          this.countDown(60);
      }).catch(err =>{
      })
    },
     countDown(val){
        let time = val;
        if(this.timer){
          clearInterval(this.timer)
        }
        this.timer = setInterval(() =>{
          time--;
          if(time===0){
            clearInterval(this.timer)
            this.codeButtonStatus ={
              text:"再次获取",
              status:false
            }
          }else{
            this.codeButtonStatus ={
              text:`倒计时${time}秒`,
              status:false
            }
          }
        },1000)
    },
    //注册
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({...this.ruleRegisterForm}).then(res =>{
              Message.success({
                message:res.message,
                duration: 5000
              });
              
              this.clearCountDown();

          }).catch(err =>{
              console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //登录
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.ruleLoginForm).then((res) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
     //清除倒计时
    clearCountDown(){
      this.codeButtonStatus={
          status:false,
          text:'获取验证码'
      },
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

.login-wrapper{
width:100%;
height:100vh;
background-color:#f6f5f7;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: 'Montserrat', sans-serif;
margin: -20px 0 50px;



h1 {
    font-size: 2em;
    font-weight: bold;
  }
  
  h2 {
    text-align: center;
  }
  
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  
  span {
    font-size: 12px;
  }
  
  a {
    color: #333;
    font-size: 14px;
  /* 	text-decoration: none; */
    margin: 15px 0;
  }
  
  button {
    border-radius: 20px;
    border: 1px solid #eee;
    background-color: #fff;
    color: #333;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 30px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }
  button[data-type="primary"] {
    border: 1px solid #1890ff;
    background-color: #1890ff;
    color: #FFFFFF;
  }
  
  button:active {
    transform: scale(0.95);
  }
  
  button:focus {
    outline: none;
  }
  
  button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
  }
  
  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }
  
  // input {
  //   background-color: #eee;
  //   border: none;
  //   padding: 12px 15px;
  //   margin: 8px 0;
  //   width: 100%;
  // }
  
 .container{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px; 
 }
 .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  
  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }  
  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }
    
    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  } 

  .container.right-panel-active .overlay-container{
    transform: translateX(-100%);
  }
  .overlay {
    background: #369eff;
    background: -webkit-linear-gradient(to right, #1890ff, #369eff);
    background: linear-gradient(to right, #1890ff, #369eff);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
      transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  
  .container.right-panel-active .overlay {
      transform: translateX(50%);
  }
  
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  
  .overlay-left {
    transform: translateX(-20%);
  }
  
  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  
  .overlay-right {
    right: 0;
    transform: translateX(0);
  }
  
  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  
  .social-container {
    margin: 20px 0;
  }
  
  .social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
  .text-white{
      color:#fff;
  }
}
</style>
