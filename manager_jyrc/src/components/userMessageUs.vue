<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>系统管理</span><span>/用户管理</span>
         </div>
        </div>

        <!-- 搜索栏 -->
         <div class="top-search" style="text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
            <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
        </el-input>
        </div>
        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">
            <el-button style="float:right; margin-right:5%;margin-bottom:20px" type="primary"  @click="addTode()">新增用户</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" back cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center;"></caption>
            <thead style="background: #666666; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>  
		      
		      <th style="text-align: center; " >昵称</th>
              <th style="text-align: center; " >角色名</th>
		      <th style="text-align: center; " >用户名</th>

              <th style="text-align: center;  width: 35%;">操作</th>

		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.nikename}}</td>
                <td style="text-align: center;">{{item.roleName}}</td>
                <td style="text-align: center;">{{item.username}}</td>


                <td style="text-align: center;" >
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" class="btn" type="primary" @click="permit(index)" >授权</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" @click="changeTode1(index)" class="btn" type="primary">修改</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'"  @click="changePw(index)" class="btn" type="danger">重置密码</el-button>
                </td>

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
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="40%"
        center>

        <!-- 修改基本信息 -->
        <div v-show="baseMessagePop">

        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="username"
                    v-show="showUsername"
                    style=""
                     v-on:blur="blurCount()"
                    clearable>
                    <template slot="prepend">用户名</template>
        </el-input>
        <div style="width:100%; overflow: hidden; margin-top:8px; height:16px; font-size:10px; color:red; text-align: center;">
            <p>{{toastCheck}}</p>
        </div>        
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="nikename"
                    style="margin-bottom:20px"
                    clearable>
                    <template slot="prepend">昵称</template>
        </el-input>

        <div style="width:100%; overflow: hidden; margin-top:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择角色</span>
                    <el-select v-model="rolename" @change="changRole()" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                    </el-select>
        </div>
        <el-button v-show="showCha" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitChange(changeIndex)" style="width:100%; margin-top:20px">确认修改</el-button>
        </div>
        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%; margin-top:20px">确认添加</el-button>
        

        <div v-show="addPermitPop">
            
           
            <el-checkbox v-model="checkedAdd" @change="checkRoot('add',checkedAdd,changeIndex)">增加</el-checkbox>
            <el-checkbox v-model="checkedDetel" @change="checkRoot('detel',checkedDetel,changeIndex)">删除</el-checkbox>
            <el-checkbox v-model="checkedChange" @change="checkRoot('change',checkedChange,changeIndex)">修改</el-checkbox>
            <el-checkbox v-model="checkedFind" @change="checkRoot('find',checkedFind,changeIndex)">查找</el-checkbox>
        </div>

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
            checkList:[],
             nikename:"",
             username:"",
             rolename:"",
             dialogTitle:"请填写相关类容",
             currentPage:1,
            pageNum:1000,//总页数
            showCha:false,
            showAd:false,
            showPw:true,//显示输入密码
            showUsername:true,   
            baseMessagePop:true,  
            addPermitPop:false ,
            //弹窗权限增加
            checkedAdd:false,
            rootCheckd:false,
            checkedDetel:false,
            checkedChange:false,
            checkedFind:false,
            
            showAddNums:false,
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             permitListAll:[],
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数

              options1: [],//select

              apartmentV: '',
              roleV: '',
              apartmentId: '',
              roleId:"",
              toastCheck:"",
              
      }
    },
     methods:{
         chellksldsf(){
            // console.log("当前选中的状态")
         },
            
         //select框发生值变化事件
            CheckItem(item){
 
            item.state = !item.state;
            // console.log(item.state,"当前选中的状态")
            },

            changRole(){
                    this.roleId= this.rolename;
                    // console.log(this.roleId,"select框发生值变化事件")
            },
           blurCount(){
           //判断用户名失去焦点时的用户名是否相同
        //    console.log(this.username,"11111111111111111111111111111")
            this.$ajax(
                   url.root()+url.userCheckName(),{
                //    'http://192.168.2.48:8080/user/login.action',{
                    params: {
                        username: this.username,
                         token:getCookie("token") ,  
                    }
                   } ).then((response) => {
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
                            //  console.log("请求成功的数据",data.data)
                            this.toastCheck=data.data
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
            //授权和产看权限
           permit(index){
               this.dialogTitle="请设置相关权限"
               this.dialogVisible=true;
               this.baseMessagePop=false
               this.addPermitPop=true 
               this.changeIndex=index; 
               this.showAd=false

            //所有的权限
            this.$ajax(
                  url.root()+url.trjnSelectAll(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")  ,
                          pagenum: this.currentPage,                      
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
                            //  console.log("请求成功的数据",data.data)
                            this.permitListAll=data.data;
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

                //某个用户对应的权限
                this.$ajax(
                  url.root()+url.trjnSelectAllById(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          id: this.list[index].id,                      
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
                            //  console.log("权限请求成功的数据",data.data)

                             let choosepermit=data.data
                             for(let i=0;i<choosepermit.length;i++){
                                 let permitName=choosepermit[i].jurisdictionName
                                switch (permitName) {
                                    case "user:insert":
                                        this.checkedAdd=true;
                                        break;
                                     case "user:delete":
                                        this.checkedDetel=true;
                                        break;
                                     case "user:update":
                                        this.checkedChange=true;
                                        break;  
                                     case "user:select":
                                        this.checkedFind=true;
                                        break;      
                                    default:
                                        break;
                                }


                             }


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
// 添加权限
            checkRoot(values,blCheck,index){
                var curentId=""
                switch (values) {
                    case 'add':
                        curentId=this.permitListAll[0].id
                        break;
                    case 'detel':
                        curentId=this.permitListAll[1].id
                        break;
                    case 'change':
                        curentId=this.permitListAll[2].id
                        break;
                    case 'find':
                        curentId=this.permitListAll[3].id
                        break;            
                
                    default:
                        break;
                }
                let currentUrl=""
                if(!blCheck){
                    currentUrl=url.trjnDelete();
                }else{
                    currentUrl=url.trjnInsert();
                }
                // console.log("userId111111111111111111111",this.list[index].id)
                // console.log("curentId222222222222222222222",curentId)
                // console.log("currentUrl3333333333333333333333",currentUrl)
                 this.$ajax(
                  url.root()+currentUrl,{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token : getCookie("token"),   
                          userId : this.list[index].id,
                          jurisdictionId: curentId
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
                            //  console.log("请求成功的数据",data)
                           
 
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



            goSearch(){//搜索
               
            this.$ajax(
                  url.root()+url.userSelectAllUser(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token") ,
                          keyword: this.search,                       
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




            // 弹出修改弹出按钮
            changeTode1(index){
                this.dialogTitle="请填写相关信息"
                this.toastCheck="",
                this.showUsername=false;
                this.showCha=true;
                this.showAd=false;
                this.dialogVisible=true;
                this.baseMessagePop=true;
                this.addPermitPop=false;
                this.nikename= this.list[index].nikename;
                this.username=this.list[index].username;
                this.rolename= this.list[index].roleName;   

                this.changeIndex=index;     
                this.showPw=false;
            
                            // 添加时出现的select
             this.$ajax(
                 url.root()+url.roleSelectAllRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                         
                                                  
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
                            //  console.log("select请求成功的数据",data.data.records)
                             this.options1=data.data.records


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


            // 提交确认修改某条数据
            submitChange(index){
                 
             if(!this.nikename||!this.rolename){
                    // console.log("输入不能为空")
                    return
             }  
             var currentRoleId=""   
             if(this.roleId){
                currentRoleId=this.roleId
             }else{
                 currentRoleId=this.list[index].roleId
             }
            //  console.log("6666666666666666666666",currentRoleId)
            this.dialogVisible=false;

            this.$ajax(
                  url.root()+url.userUpdateUser(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token"),
                        nikename: this.nikename,
                        roleId:currentRoleId,
                        id:this.list[index].id,
                        pagenum: this.currentPage,                        
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
            // 添加按钮弹出框出现
            addTode(){
                this.dialogTitle="请填写相关信息"
                this.toastCheck="",
                this.showUsername=true
                this.showCha=false;
                this.showAd=true;
                this.showAddNums=true;
                this.dialogVisible=true;
                this.baseMessagePop=true;
                this.addPermitPop=false;

                this.nikename= "";
                this.username="";
                this.rolename="";

            // 添加时出现的select
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
                            //  console.log("select请求成功的数据",data.data.records)
                             this.options1=data.data.records


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
            //提交确认添加一条数据
            submitAdd(){
             if(!this.nikename||!this.rolename||!this.username){
                    // console.log("输入不能为空")
                    return
             }  

                this.dialogVisible=false;

            this.$ajax(
                  url.root()+url.userInsertUser(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token"),                        
                        nikename: this.nikename,
                        username: this.username,
                        roleId:this.roleId,
                        pagenum: this.currentPage,                        
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
// 初始化密码
            changePw(index){
                 this.$ajax(
                  url.root()+url.userResetPasswords(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")   ,
                          id:this.list[index].id                     
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
                            //  console.log("请求成功的数据",data.data)
                              this.$alert('初始化后的密码为'+data.data.password);   

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
                // console.log("删除的index",this.list[index].userId);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                                this.$ajax(
                                    url.root()+url.userDeleteUser(),{
                                    //    '/static/data/list.json',{
                                        
                                        method: 'post',
                                        params: {
                                            token:getCookie("token"),
                                            userId:this.list[index].id                     
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
                
                if(this.checkedCities.length==0){
                        this.$alert('删除的内容不能为空');
                        return
                }
                //  
                var chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                console.log("删除的chooseArr",chooseStr);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                            this.$ajax(
                                url.root()+url.userDeleteUser(),{
                                //    '/static/data/list.json',{
                                    
                                    method: 'post',
                                    params: {
                                        token:getCookie("token"),
                                        userId:chooseStr                         
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
                  url.root()+url.userSelectAllUser(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")  ,
                          pagenum: this.currentPage,                      
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
                  url.root()+url.userSelectAllUser(),{
                //    '/static/data/list.json',{
                    
                    method: 'post',
                    params: {
                          token:getCookie("token") 
                                          
                    },
                                      
                   }).then((response) => {
                //    console.log("111111111111111111111111111111111111",response.data )
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

