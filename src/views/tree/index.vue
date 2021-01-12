<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称:">
            <el-input v-model="name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-button type="primary" @click="onSubmit('form')">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
     <el-table
      ref="multipleTable"
      :row-key="getRowKeys"
      :data="datalist"
      tooltip-effect="dark"
      style="width: 100%"
      border
      v-loading = "tableloading"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        :reserve-selection="true"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        label="部门名称"
         align="center"
        width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="禁启用"
         align="center"
        width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status=='1'?true:false"
            @change="changeStatus(scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="人员数量"
         align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.number}}
        </template> 
      </el-table-column>
      <el-table-column
        label="操作"
         align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="onEdit(scope.row.id)">编辑</el-button>
          <el-button plain @click="DeleteList(scope.row)">删除</el-button>
        </template> 
      </el-table-column>
  </el-table>
  <div style="margin-top:10px;">
    <el-button type="primary" @click="DeleteList" style="float:left">批量删除</el-button>
    <el-pagination
    style="float:right;"
    background
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage1"
    :page-size="5"
    layout="total, prev, pager, next"
    :total="totals">
  </el-pagination>
  </div>
  
  </div>
</template>

<script>
import { GetDepartmentList,StatusDepartmentList,DeleteDepartmentList } from '@/api/user'
import {  Message } from 'element-ui'
export default {

  data() {
    return {
      name:'',
        multipleSelection: [],
        pageNumber:1,
        pageSize:5,
        keyword:null,
        datalist:[],
        totals:null,
        tableloading:false,
        currentPage1: 1,
        selectedRowKeys:[],
        loading:false,
        selectarr:[3535,3536]
    }
  },
  watch: {
    
  },

  methods: {
    getRowKeys(row) { //checkbox记忆       
        return row.id             
    },
    //去编辑
    onEdit(id){
      this.$router.push({ path: '/example/table', query: { id: id }});
    },
    //批量删除
    DeleteList(val){
      if(val.id){
        this.selectedRowKeys.push(val.id);
      }
      if(this.selectedRowKeys.length>0){
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DeleteListFun();
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }else{
        Message.error('请选择删除的部门!');
      }
    },
    DeleteListFun(){
      DeleteDepartmentList({id:this.selectedRowKeys.toString()}).then(res =>{
        Message.success(res.message);
        this.getDataList()
        this.selectedRowKeys =[];
      }).catch(err =>{
      })
    },
    //切换状态
    changeStatus(val){
      var params={
        id:val.id,
        status:val.status==="1"?false:true
      }
      StatusDepartmentList(params).then(res =>{
        Message.success(res.message);
        this.getDataList()
      }).catch(err =>{
        Message.error(err.message);
      })
    },
    handleCurrentChange(val) {
      this.pageNumber =val;
      this.getDataList();
    },
   handleSelectionChange(val) {
        this.selectedRowKeys=[];
        for(var i = 0 ;i<val.length;i++){
          this.selectedRowKeys.push(val[i].id)
        }
        this.multipleSelection = val;
   },

   getDataList(){
    const params={
      pageNumber:this.pageNumber,
      pageSize:this.pageSize
    }
    if(this.keyword){
      params.name = this.keyword
    }
    this.tableloading =true;
    GetDepartmentList(params).then(res =>{
      this.datalist=res.data.data,
      this.totals=res.data.total,
      this.tableloading=false;
      var arr = [];
      for(var i = 0;i<this.datalist.length;i++){
        for(var j = 0;j<this.selectarr.length;j++){
          if(this.datalist[i].id==this.selectarr[j]){
            arr.push(this.datalist[i])
          }
        }
      }
      arr.forEach(row => {
        if(row){
          this.$refs.multipleTable.toggleRowSelection(row,true);
        }else{
          this.$refs.multipleTable.clearSelection();
        }
      }); 

    }).catch(err =>{
    })
   }
  },
  mounted(){
    this.getDataList()
  }
}
</script>

