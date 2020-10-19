<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>系统管理</span><span>/角色管理</span>
         </div>
        </div>


        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">

            <el-button style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增角色</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>   
              <th style="text-align: center;">角色名称</th>  
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.roleName }}</td>
                <td style="text-align: center;"><el-button size="mini" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button></td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        title="请填写相关类容"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="roleName "
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加角色名</template>
        </el-input>

    

        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认添加</el-button>
        </el-dialog>  

        
         
         <!-- 分页器 -->
        <div class="page-box" v-show="list.length!=0||pageNum>10" style="margin-bottom: 30px;overflow: hidden;">
            <el-pagination
            style="margin-right: 100px;float:right;"
            class="page"
            background
            layout="prev, pager, next"
            :total="pageNum"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            >
          </el-pagination>
        </div>

        <!--没数据要显示的  -->
        <div v-show="list.length==0" class="noView" style="text-align: center;margin-top: 100px;font-size: 20px;color: rgb(233, 18, 10);">
            暂无数据
        </div>

    </div>
       

</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
export default {

     data() {
      return {
          
            roleName :"",
            currentPage:1,
            pageNum:1000,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
      }
    },
     methods:{



            // 添加按钮弹出框出现
            addTode(){
                this.showAd=true;
                this.dialogVisible=true;
                this.roleName = "";

            },
            //提交确认添加一条数据
            submitAdd(){
               
                this.dialogVisible=false;

           this.$ajax(
                  url.root()+url.roleInsertRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token") ,  
                        pagenum: this.currentPage,
                        roleName : this.roleName ,                     
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                              case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data.data.records)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10
                            break;
                    }
                   }, (response) => {
                    switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
                });   
            },




            // 删除某一条
            removeTodo(index){
                // console.log("删除的index",this.list[index].id);
                // console.log("当前页",this.currentPage);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                                    this.$ajax(
                                        url.root()+url.roleDeleteRole(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                  token:getCookie("token") ,
                                                pagenum: this.currentPage,
                                                roleId:this.list[index].id

                                            }                      
                                        }).then((response) => {
                                        
                                            var data=response.data;
                                            var status=data.status;
                                            switch(status){
                                                case 400:
                                                this.$alert(data.msg);
                                                this.$router.push({ path: '/login' })
                                                break
                                                case 401:
                                                        this.$alert(data.msg);   
                                                        this.showLoad=false
                                                    break;
                                                    case 555:
                                                        this.$alert(data.msg);                              
                                                        this.showLoad=false
                                                    break;
                                                    case 500:
                                                        this.$alert('sorry，请求异常，请稍后重试');                              
                                                        this.showLoad=false
                                                    break;
                                                    case 200://请求成功
                                                    // console.log("请求成功的数据",data.data.records)
                                                    this.list=data.data.records
                                                    var pageNums=data.data.totalpage
                                                    var currentPages=data.data.pageNum
                                                
                                                
                                                    
                                                    this.pageNum=pageNums*10
                                                    this.currentPage=currentPages*10
                                                    break;
                                            }
                                        }, (response) => {
                                            switch(response.response.status){
                                                    case 400:
                                                    this.$message({
                                                            type: 'error',
                                                            message: "登录信息已过期，请重新登录"
                                                            });

                                                            this.$router.replace({ path: 'login' })
                                                        break
                                                    default:
                                                        this.$message({
                                                            type: 'error',
                                                            message: "请求错误，请重试"
                                                            });
                                                    break;    
                                                
                                            }
                                        });

                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                
                 
            },
            // 选择删除及其全部删除
            deletChoose(){
                 this.$alert('sorry，暂未开放批量删除');
                 return
                let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                // console.log("删除的chooseArr",chooseStr);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                                    this.$ajax(
                                        url.root()+url.roleDeleteRole(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                  token:getCookie("token") ,
                                                pagenum: this.currentPage,
                                                id: chooseStr
                                                //  `${url.root()}${url.roleDeleteRole()}?id=${chooseArr}&pagenum=${this.currentPage}`,{

                                            }                      
                                        }).then((response) => {
                                        
                                            var data=response.data;
                                            var status=data.status;
                                            switch(status){
                                                case 400:
                                                    this.$alert(data.msg);
                                                    this.$router.push({ path: '/login' })
                                                    break
                                                case 401:
                                                        this.$alert(data.msg);   
                                                        this.showLoad=false
                                                    break;
                                                    case 555:
                                                        this.$alert(data.msg);                              
                                                        this.showLoad=false
                                                    break;
                                                    case 500:
                                                        this.$alert('sorry，请求异常，请稍后重试');                              
                                                        this.showLoad=false
                                                    break;
                                                    case 200://请求成功
                                                    // console.log("请求成功的数据",data.data.records)
                                                    this.list=data.data.records
                                                    var pageNums=data.data.totalpage
                                                    var currentPages=data.data.pageNum
                                                
                                                
                                                    
                                                    this.pageNum=pageNums*10
                                                    this.currentPage=currentPages*10
                                                    break;
                                            }
                                        }, (response) => {
                                            switch(response.response.status){
                                                    case 400:
                                                    this.$message({
                                                            type: 'error',
                                                            message: "登录信息已过期，请重新登录"
                                                            });

                                                            this.$router.replace({ path: 'login' })
                                                        break
                                                    default:
                                                        this.$message({
                                                            type: 'error',
                                                            message: "请求错误，请重试"
                                                            });
                                                    break;    
                                                
                                            }
                                        });

                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                
                 
            },





            //切换分页
          handleCurrentChange:function(){
            this.$ajax(
                  url.root()+url.roleSelectAllRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token") ,
                        pagenum: this.currentPage

                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                        case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data.data.records)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10
                            break;
                    }
                   }, (response) => {
                   switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
                }); 
         },
            
   //控制checkbox复选框
      handleCheckAllChange(val) {
            this.checkedCities = val ? this.list : [];
            this.isIndeterminate = false;
    //    console.log(this.checkedCities,"打印的checkedCities值")
       if(val==true){

       }
      },
      handleCheckedCitiesChange(value) {
        //   console.log(value,"打印的value值")
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
      },
     

     },
  
 

     created:function(){

         
     
            this.$ajax(
                  url.root()+url.roleSelectAllRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")                        
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                        case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data.data.records)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10
                            break;
                    }
                   }, (response) => {
                    switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
                });         
     },
     
}
</script>
    
<style scoped>


</style>

