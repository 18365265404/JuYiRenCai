<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>网站管理</span><span>/数据信息</span>
         </div>
        </div>


        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">

            <el-button style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增内容</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr" style="background:#666666;height:20px">
              <th style="text-align: center; "> </th>
              <th style="text-align: center;">序号</th>   
              <th style="text-align: center;">行业</th>  
              <th style="text-align: center; width:25%">类别</th>  
              <th style="text-align: center; width:30%">角色</th>  
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.industryName }}</td>
                <td style="text-align: center;">
                    {{item.industryTypeName }}
                    <el-button size="mini" :disabled="!item.industryTypeName" style="float:right; width:60px; font-size:10px;  margin:5px"  @click="removeKind(index)" class="btn" type="danger">删除</el-button>
                    
                </td>
                <td style="text-align: center;">{{item.industryRoleName }}
                    <el-button size="mini" :disabled="!item.industryRoleName" style="float:right;  width:60px; font-size:10px;   margin:5px"  @click="removeRole(index)" class="btn" type="danger">删除</el-button>
                </td>
                <td style="text-align: center;"><el-button size="mini" style=" width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button></td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button class="btn" type="danger" size="mini" style=" width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        title="请填写相关类容"
        :visible.sync="dialogVisible"
        width="700px"
        center>


    <div >
    <el-form :model="form1" ref="form1" label-width="100px" class="demo-dynamic" style="padding-right:10px; width:600px" >
        <el-form-item
            prop="name1"
            label="行业"
            size="mini"
            :rules="[
            { required: true, message: '请输入行业', trigger: 'blur' },
         
            ]"
        >
            <el-input size="mini" v-model="form1.name1" v-on:blur="blurIndustry(form1.name1,'form1')" ></el-input>
            
        </el-form-item>
      <p style="font-size:8px; margin-left:18%;color:red">{{form1.repeat1}}</p>  
        <el-form-item
            prop="name2"
            label="类别"
            size="mini"
            :rules="[
            { required: true, message: '请输入类别', trigger: 'blur' },
   
            ]"
        >
            <el-input v-model="form1.name2" v-on:blur="blurKind(form1.name2,'form1')"></el-input>
        </el-form-item>
        <p style="font-size:8px; margin-left:18%;color:red">{{form1.repeat2}}</p>        
      <el-form-item
            size="mini"
            v-for="(domain, index) in form1.domains"
            :label="'角色' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '角色不能为空', trigger: 'blur'
            
            }"
        >
            <el-input v-model="domain.value"  ></el-input><el-button @click.prevent="removeDomain(domain)" style="position:absolute; right:0">删除</el-button>
        </el-form-item>



        <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm('form1')">提交</el-button>
            
            <el-button size="mini" type="primary" @click="resetForm('form1')">重置</el-button>
            <el-button size="mini" type="primary" @click="addDomain">新增角色</el-button>
        </el-form-item>
        </el-form>
    </div>


  <!-- 第二个form -->
       <div >
        <el-form :model="form2" ref="form2" label-width="100px" class="demo-dynamic" style="padding-right:10px; position: relative; width:600px"  >
            <p style="position:absolute;left:55px; top:10px">行业</p>
        <el-select v-model="form2.selectValue" size="mini"  placeholder="请选择" style="width:500px; margin-left:100px"
            @visible-change="showSelectValue1()"
            @change="changSelectValue1()">
            
            <el-option
            size="mini"
            v-for="item in form2.options"
            :key="item.value"
            :label="item.industryName"
            :value="item.id"
           
            >
            
            </el-option>
        </el-select>
        <el-form-item
        size="mini"
            style="margin-top:20px"
            prop="name2"
            label="类别"
            :rules="[
            { required: true, message: '请输入类别', trigger: 'blur' },
         
            ]"
        >
            <el-input v-model="form2.name2" v-on:blur="blurKind(form2.name2,'from2')"></el-input>
        </el-form-item>    
        <p style="font-size:8px; margin-left:18%;color:red">{{form2.repeat2}}</p>     
        <el-form-item
            size="mini"
            v-for="(domain, index) in form2.domains"
            :label="'角色' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '角色不能为空', trigger: 'blur'
            }"
        >
            <el-input v-model="domain.value" ></el-input><el-button @click.prevent="removeDomain2(domain)" style="position:absolute; right:0">删除</el-button>
        </el-form-item>
        


        <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm2('form2')">提交</el-button>
            
            <el-button size="mini" type="primary" @click="resetForm2('form2')">重置</el-button>
            <el-button size="mini" type="primary" @click="addDomain2">新增角色</el-button>
        </el-form-item>
        </el-form>
    </div>
<!-- 第三个form -->
     <div >
        <el-form :model="form3" ref="form3" label-width="100px" class="demo-dynamic" style="padding-right:10px; position: relative; width:600px"  >
            <p style="position:absolute;left:55px; top:10px">行业</p>
            <p style="position:absolute;left:55px; top:65px">类别</p>
        <el-select v-model="form3.selectValue1" size="mini"   placeholder="请选择" style="width:500px; margin-left:100px"
            @visible-change="showSelectValue2()"
            @change="changSelectValue2()">
            
            <el-option
            v-for="item in form3.options"
            :key="item.value"
            :label="item.industryName"
            :value="item.id"
           
            >
            
            </el-option>
          </el-select>

          <el-select v-model="form3.selectValue2" size="mini"   placeholder="请选择" style="width:500px; margin-left:100px; margin-top:20px; margin-bottom:20px"
           
            @change="changSelectValue3()">
            
            <el-option
            v-for="item in form3.options2"
            :key="item.value"
            :label="item.industryTypeName"
            :value="item.id"
           
            >
            
            </el-option>
          </el-select>

     
        <el-form-item
            size="mini"
            v-for="(domain, index) in form3.domains"
            :label="'角色' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '角色不能为空', trigger: 'blur'
            }"
        >
            <el-input v-model="domain.value" ></el-input><el-button @click.prevent="removeDomain3(domain)" style="position:absolute; right:0">删除</el-button>
        </el-form-item>



        <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm3('form3')">提交</el-button>
           
            <el-button size="mini" type="primary" @click="resetForm3('form3')">重置</el-button>
             <el-button size="mini" type="primary" @click="addDomain3">新增角色</el-button>
        </el-form-item>
        </el-form>
    </div>


            




        </el-dialog>

        <el-dialog
        :title="popTitle"
        :visible.sync="dialogVisible2"
        width="40%"
        center>

          <el-checkbox-group v-model="checkKindList" >
            <el-checkbox v-for="name in checkKind" :label="name" :key="name">{{name}}</el-checkbox>

          </el-checkbox-group>
           
        <el-button v-show="showKindDele" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitKindDele()" style="width:100%; margin-top:10px">确认删除类别</el-button>
        <el-button v-show="showRoleDele" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitRoleDele()" style="width:100%; margin-top:10px">确认删除角色</el-button>

        <div style="font-size:8px;color:red"></div> 
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
            allCheckId:"",
            showKindDele:false,
            showRoleDele:false,
            popTitle:"",
            roleName :"",
            currentPage:1,
            pageNum:1000,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             dialogVisible:false,
             dialogVisible2:false,
             checkAll: false,//显示全选
             checkedCities: [],
             checkKindList:[],
             checkKind:["化妆","美容","饮食"],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数


        form1: {
          domains: [{
            value: ''
          }],
          selectValue:"",
          name1:"",
          name2:"",
          repeat1:"",
          
          repeat2:"",
          repeat1Status:false,
          repeat2Status:false,
     
        },
        form2: {
          domains: [{
            value: ''
          }],
          selectValue:"",
          checkIndustry:"",
          name2:"",
          repeat2:"",
          repeat2Status:false,
          options: [],
        },
        form3: {
          domains: [{
            value: ''
          }],
          selectValue1:"",
          selectValue2:"",
          checkIndustry:"",

          options: [],
          options2: [],
        }
      }
    },
     methods:{






            //出现类别删除的弹窗
            removeKind(index){
            //    this.allCheck=this.list[index].industryTypeName
               this.showKindDele=true; 
               this.showRoleDele=false; 

               this.dialogVisible2=true  
               this.checkKindList=[]
               this.popTitle="请选择要删除的类别"  

                this.allCheckId=changeArr(this.list[index].tindustryTypeId)//所有的checkbox的id转数组
                this.checkKind=changeArr(this.list[index].industryTypeName)//所有的checkbox的名字转数组
                
                // console.log(this.checkKind,"11111111111111111111111111111111111")
                // console.log(this.allCheckId,"22222222222222222222222222222222222")
            function changeArr(str){
                var arr=[];
                arr=str.split(",");
                return arr
            }
            },
            //提交类别删除的按钮
            submitKindDele(){
                var chooseId=""
                // if(this.checkKind){
                    // console.log(this.checkKindList,"选中的id集合3333333333333333333333333")
                        
                // }
                for(var i=0;i<this.checkKind.length;i++){
                        for(var j=0;j<this.checkKindList.length;j++){
                            if(this.checkKind[i]==this.checkKindList[j]){
                                
                                chooseId+=this.allCheckId[i]+","

                            }
                        }
                }
                 chooseId = chooseId.substr(0, chooseId.length - 1);
                
                // console.log(chooseId,"6666666666666666666666666666")
                //  return

               this.dialogVisible2=false  
            //    console.log(chooseId,"选中删除的value的值id")
               this.$ajax(
                  url.root()+url.ttDeleteTindustryType(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token") ,
                        TindustryTypeId:chooseId,
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
                            // console.log("请求成功的数据",data.data)
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

            //出现角色删除的弹窗
            removeRole(index){
               this.showKindDele=false; 
               this.showRoleDele=true; 

               this.dialogVisible2=true  
               this.checkKindList=[]
               this.popTitle="请选择要删除的类别"  

                this.allCheckId=changeArr(this.list[index].id)//所有的checkbox的id转数组
                this.checkKind=changeArr(this.list[index].industryRoleName)//所有的checkbox的名字转数组
                
                // console.log(this.checkKind,"11111111111111111111111111111111111")
                // console.log(this.allCheckId,"22222222222222222222222222222222222")
            function changeArr(str){
                var arr=[];
                arr=str.split(",");
                return arr
            }
            },
            //提交角色删除的按钮
            submitRoleDele(){
            var chooseId=""
            //  console.log(this.checkKindList,"选中的id集合3333333333333333333333333")
                for(var i=0;i<this.checkKind.length;i++){
                        for(var j=0;j<this.checkKindList.length;j++){
                            if(this.checkKind[i]==this.checkKindList[j]){
                                
                                chooseId+=this.allCheckId[i]+","

                            }
                        }
                }
                 chooseId = chooseId.substr(0, chooseId.length - 1);
                
                // console.log(chooseId,"6666666666666666666666666666")
                //  return

               this.dialogVisible2=false  

                           this.$ajax(
                  url.root()+url.trDeleteTindustryRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token") ,
                        TindustryRoleId:chooseId,
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
                                        url.root()+url.tyDeleteTindustry(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                token:getCookie("token") ,
                                                pagenum: this.currentPage,
                                                tindustryId:this.list[index].tindustryId

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
                let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].tindustryId+","
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
                                        url.root()+url.tyDeleteTindustry(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                token:getCookie("token") ,
                                                pagenum: this.currentPage,
                                                tindustryId:chooseStr
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
                  url.root()+url.tySelectAllCascade(),{
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
                            //  console.log("请求成功的数据分页",data.data.records)
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
     


/**
 * 
 * 
 * ***************************************************大弹窗添加职位*********************************************************
 */

            // 添加按钮弹出框出现
            addTode(){
                
                this.dialogVisible=true;  

                this.form1.name1=""    
                this.form1.name2=""  
                this.form1.domains=[{
                        value: ''
                    }]

                this.form2.name2=""
                this.form2.domains=[{
                        value: ''
                    }]
                this.form2.options=[]
                this.form2.selectValue=""


                this.form3.domains=[{
                        value: ''
                    }]
                this.form3.selectValue1=""
                this.form3.options=[]
                this.form3.options2=[]

                this.form3.selectValue2=""
                

            },
            //提交确认添加一条数据
            submitAdd(){
               
                this.dialogVisible=false;

           this.$ajax(
                  url.root()+url.roleInsertRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")  , 
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

//验证输入行业是否重复

           blurIndustry(values){
           
        //    console.log(values,"11111111111111111111111111111")
            this.$ajax(
                   url.root()+url.tyCheckTindustryName(),{
                //    'http://192.168.2.48:8080/user/login.action',{
                    params: {
                         token:getCookie("token") ,  
                        tindustryName: values,
                    },
                    method: 'post',
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
                            //  console.log("请求成功的数据11111111",data.data)
                             if(data.data=="true"){
                                  this.form1.repeat1=""
                                  this.form1.repeat1Status=true
                            }else{
                                  this.form1.repeat1="行业名称名重复";
                                  this.form1.repeat1Status=false
                              
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
      
 //验证输入类别是否重复

           blurKind(values,types){
           
        //    console.log(values,"11111111111111111111111111111")
            this.$ajax(
                   url.root()+url.ttCheckTindustryTypeName(),{
                //    'http://192.168.2.48:8080/user/login.action',{
                    params: {
                        TindustryTypeName: values,
                         token:getCookie("token") ,  
                    },
                    method: 'post',
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
                            //  console.log("请求成功的数据555555",data)
                            if(data.data=="true"){
                                    if(types=="form1"){
                                        this.form1.repeat2=""
                                        this.form1.repeat2Status=true
                                    }else{
                                      this.form2.repeat2=""
                                      this.form2.repeat2Status=true
                                    }
                                
                            }else{
                                   if(types=="form1"){
                                        this.form1.repeat2="类别名重复";
                                        this.form1.repeat2Status=false
                                    }else{
                                        this.form2.repeat2="类别名重复";
                                        this.form2.repeat2Status=true
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
 

//第二个form点击select出现数据
     showSelectValue1(){
                  var myUrl="http://192.168.1.59:8082/"
                //   console.log()
                  // if(this.form2.options.length!=0){
                  //   return
                  // }
                 this.$ajax(
                  url.root()+url.tySelectALLTindustry(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token") ,                       
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
                            //  console.log("第二个form的Select请求成功的数据",data)
                              this.form2.options=data.data
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
 //第三个form点击select出现数据    
     showSelectValue2(){
                  var myUrl="http://192.168.1.59:8082/"
                //   console.log()
                  // if(this.form3.options.length!=0){
                  //   return
                  // }
                 this.$ajax(
                  url.root()+url.tySelectALLTindustry(),{
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
                            //  console.log("第三个form的Select请求成功的数据",data)
                              this.form3.options=data.data
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
//第二个from选择具体某条数据 获取某条数据的中文名
    changSelectValue1(){
    //   console.log("select的值",this.form2.selectValue)
                  var myUrl="http://192.168.1.59:8082/"
                 this.$ajax(
                  url.root()+url.ttSelectTindustryTypeByTindustryId(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"), 
                          tindustryId:this.form2.selectValue                  
                    }                      
                   }).then((response) => {
                    // console.log("第二个form选择好select后请求成功的数据111111111111",response)
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
                            //  console.log("第二个form选择好select后请求成功的数据22222222",data.data.industry.industryName)
                             this.form2.checkIndustry=data.data.industry.industryName
                             
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
  //第三个表格的  第一个select change事件 获取某条数据的中文名 || 并且给第二个select赋值
      changSelectValue2(){
    //   console.log("select的值,是要要显示的行业id111111111111111111111111111111111111",this.form3.selectValue1)
                  var myUrl="http://192.168.1.59:8082/"
                 this.$ajax(
                  url.root()+url.ttSelectTindustryTypeByTindustryId(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"), 
                          tindustryId:this.form3.selectValue1                  
                    }                      
                   }).then((response) => {
                    // console.log("第二个form选择好select后请求成功的数据",response)
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
                            //  console.log("第三个form选择好select后请求成功的数据3333333333",data)
                             
                             
                            //   this.form3.checkIndustry=data.data.industry.industryName;
                              this.form3.options2=data.data.category
                              this.form3.selectValue2=""
                            //   console.log("第三个form的第二个select的列表数据",this.form3.options2)
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

       //第三个表格的  第2个select change事件 获取当前选择的某条数据
      changSelectValue3(){
    //   console.log("select2的值",this.form3.selectValue2)

     },

//第一个表单提交 
      submitForm(formName) {
          this.dialogVisible=false; 
          if(!this.form1.repeat1Status||!this.form1.repeat2Status){
                this.$alert('记住哦~，不能输入重复的行业或者类别'); 
                return
          }

          
        this.$refs[formName].validate((valid) => {
          if (valid) {

             var industryRoleNames= getStr(this.form1.domains)
              function getStr(arr){
                 var  str=""
                for(var i=0;i<arr.length;i++){
                        str+=arr[i].value+","
                }
                 str = str.substr(0, str.length - 1);
                 return str
              }
              
              
            //   console.log(this.form1.name1,"表格一要传的数据1")
            //   console.log(this.form1.name2,"表格一要传的数据2")
            //   console.log(industryRoleNames,"表格一要传的数据3")



            //   console.log(this.form1.domains,"角色的list为这个")
              var myUrl="http://192.168.1.59:8082/"
                this.$ajax(
               
                  url.root()+url.tyInsertTindustry(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          industryName:this.form1.name1,
                          industryTypeName:this.form1.name2,
                          industryRoleName:industryRoleNames,
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





          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

//第二个表单提交
      submitForm2(formName) {
          this.dialogVisible=false; 
        if(!this.form2.repeat2Status){
                this.$alert('记住哦~，不能输入重复的行业或者类别'); 
                return
          }
        
          if(!this.form2.selectValue){
               
               return
          }
        this.$refs[formName].validate((valid) => {
          if (valid) {

             var industryRoleNames= getStr(this.form2.domains)
              function getStr(arr){
                 var  str=""
                for(var i=0;i<arr.length;i++){
                        str+=arr[i].value+","
                }
                 str = str.substr(0, str.length - 1);
                 return str
              }
              
              
            //   console.log(this.form2.selectValue,"表格二要传的数据1")
            //   console.log(this.form2.name2,"表格二要传的数据2")
            //   console.log(industryRoleNames,"表格二要传的数据3")



            //   console.log(this.form2.domains)
              var myUrl="http://192.168.1.59:8082/"
                this.$ajax(
                  
                  url.root()+url.ttInsertTindustryType(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          tindustryId:this.form2.selectValue,
                          industryTypeName:this.form2.name2,
                          industryRoleName:industryRoleNames,
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
                                this.$alert(data.msg);                              
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





          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
//第三个表单提交
      submitForm3(formName) {
        this.dialogVisible=false; 
          if(!this.form3.selectValue1){
               this.$alert('请选择行业');
               return
          }
          if(!this.form3.selectValue2){
               this.$alert('请选择行业');
               return
          }
        this.$refs[formName].validate((valid) => {
          if (valid) {

             var industryRoleNames= getStr(this.form3.domains)
              function getStr(arr){
                 var  str=""
                for(var i=0;i<arr.length;i++){
                        str+=arr[i].value+","
                }
                 str = str.substr(0, str.length - 1);
                 return str
              }
              
              
            //   console.log(this.form3.selectValue1,"表格三要传的数据1")
            //   console.log(this.form3.selectValue2,"表格三要传的数据2")
            //   console.log(industryRoleNames,"表格三要传的数据3")



            //   console.log(this.form3.domains)
              var myUrl="http://192.168.1.59:8082/"
                this.$ajax(
               
                  url.root()+url.trInsertTindustryRole(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          tindustryId:this.form3.selectValue1,
                          tindustryTypeId:this.form3.selectValue2,
                          industryRoleName:industryRoleNames,
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
                            
                            //  console.log("第三个form提交请求成功的数据",data)
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





          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

      //重置form1
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //重置form2
      resetForm2(formName) {
        this.$refs[formName].resetFields();
        this.form2.options=[]
        this.form2.selectValue=""
      },
      //重置form3
      resetForm3(formName) {
        this.$refs[formName].resetFields();
        this.form3.options=[]
        this.form3.selectValue=""
        this.form3.selectValue2=""
      },

  //删除第一个form的角色某一条    
      removeDomain(item) {
          if(this.form1.domains.length==1){
                    // console.log("至少添加一条")
          }else{
                 var index = this.form1.domains.indexOf(item)
                if (index !== -1) {
                this.form1.domains.splice(index, 1)
                }
          }
       
      },
   //删除第二个form的角色某一条       
       removeDomain2(item) {
          if(this.form2.domains.length==1){
                    // console.log("至少添加一条")
          }else{
                 var index = this.form2.domains.indexOf(item)
                if (index !== -1) {
                this.form2.domains.splice(index, 1)
                }
          }
       
      },
   //删除第三个form的角色某一条    
       removeDomain3(item) {
          if(this.form3.domains.length==1){
                    // console.log("至少添加一条")
          }else{
                 var index = this.form3.domains.indexOf(item)
                if (index !== -1) {
                this.form3.domains.splice(index, 1)
                }
          }
       
      },
  //添加第一个form的某个角色
      addDomain() {
        this.form1.domains.push({
          value: '',
          key: Date.now()
        });
      },
   //添加第二个form的某个角色     
      addDomain2() {
        this.form2.domains.push({
          value: '',
          key: Date.now()
        });
      },
    //添加第三个form的某个角色    
      addDomain3() {
        this.form3.domains.push({
          value: '',
          key: Date.now()
        });
      },





/**
 * *******************************************************大弹窗结束****************************************************************
 * */ 

     },
  
 

     created:function(){

         
     
            this.$ajax(
                  url.root()+url.tySelectAllCascade(),{
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
                             console.log("请求成功的数据",data.data)
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

