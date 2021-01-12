<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="人员数量" prop="number">
            <el-input v-model="form.number" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="禁启用">
            <el-radio-group v-model="form.status">
              <el-radio label="禁用"></el-radio>
              <el-radio label="启用"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="描述" prop="content">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
     
     
      
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit('form')">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { DepartmentAddApi,GetDepartDetails,EditDepartDetails } from '@/api/user'
import {  Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        name: '',
        number:'',
        status: '禁用',
        content: '',
        dpId:null,
      },
      loading:false,
      rules: {
        name: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        number: [
          { required: true, message: '请输入人数', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min:1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    
  },
  mounted(){
    if(this.$route.query.id){
      this.dpId =this.$route.query.id;
      this.getDepartmentDetails(this.$route.query.id);
    }
  },
  methods: {
    //获取编辑信息
    getDepartmentDetails(id){
      GetDepartDetails({id:id}).then(res =>{
          const data = res.data;
          this.form.name =data.name;
          this.form.number =data.number;
          this.form.status =data.status;
          this.form.content =data.content;
      }).catch(err =>{
          Message.error(err.message);
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            var params={
              name:this.form.name,
              number:this.form.number,
              status:this.form.status=='禁用'?false:true,
              content:this.form.content
            }
            this.loading =true;
            if(this.$route.query.id){
              this.editFun(params,formName);
            }else{
              this.addFun(params,formName);
            }         
          } else {
            return false;
          }
        });
    },
    //新增
    addFun(params,formName){
      DepartmentAddApi(params).then(res =>{
          this.loading =false;
          Message.success(res.message);       
          this.$refs[formName].resetFields(); 
          this.$router.push({ path: '/example/tree'});
      }).catch(err =>{   
           this.loading =false;                   
      })
    },
    //编辑
    editFun(params,formName){
      params.id =this.$route.query.id;
      EditDepartDetails(params).then(res =>{
          this.loading =false;
          Message.success(res.message);
          this.$router.push({ path: '/example/tree'});
      }).catch(err =>{
          this.loading =false;  
      })
    }
  }
}
</script>
