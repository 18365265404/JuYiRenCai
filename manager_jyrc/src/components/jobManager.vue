<template>
    <div class="content">
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>用户管理</span><span>/职位管理</span>
         </div>
        </div>
    <!--第一个form-->
    <div >
    <el-form :model="form1" ref="form1" label-width="100px" class="demo-dynamic" style="padding-right:10px; width:60%" >
        <el-form-item
            prop="name1"
            label="行业"
            :rules="[
            { required: true, message: '请输入行业', trigger: 'blur' },
         
            ]"
        >
            <el-input v-model="form1.name1" v-on:blur="blurIndustry(form1.name1,'form1')" ></el-input>
            
        </el-form-item>
      <p style="font-size:8px; margin-left:18%;color:red">{{form1.repeat1}}</p>  
        <el-form-item
            prop="name2"
            label="类别"
            :rules="[
            { required: true, message: '请输入类别', trigger: 'blur' },
   
            ]"
        >
            <el-input v-model="form1.name2" v-on:blur="blurKind(form1.name2,'form1')"></el-input>
        </el-form-item>
        <p style="font-size:8px; margin-left:18%;color:red">{{form1.repeat2}}</p>        
      <el-form-item
       
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
            <el-button type="primary" @click="submitForm('form1')">提交</el-button>
            <el-button @click="addDomain">新增角色</el-button>
            <el-button @click="resetForm('form1')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>


  <!-- 第二个form -->
       <div >
        <el-form :model="form2" ref="form2" label-width="100px" class="demo-dynamic" style="padding-right:10px; position: relative; width:60%"  >
            <p style="position:absolute;left:55px; top:10px">行业</p>
        <el-select v-model="form2.selectValue"   placeholder="请选择" style="width:90%; margin-left:100px"
            @visible-change="showSelectValue1()"
            @change="changSelectValue1()">
            
            <el-option
            v-for="item in form2.options"
            :key="item.value"
            :label="item.industryName"
            :value="item.id"
           
            >
            
            </el-option>
        </el-select>
        <el-form-item
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
            <el-button type="primary" @click="submitForm2('form2')">提交</el-button>
            <el-button @click="addDomain2">新增角色</el-button>
            <el-button @click="resetForm2('form2')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
<!-- 第三个form -->
     <div >
        <el-form :model="form3" ref="form3" label-width="100px" class="demo-dynamic" style="padding-right:10px; position: relative; width:60%"  >
            <p style="position:absolute;left:55px; top:10px">行业</p>
            <p style="position:absolute;left:55px; top:65px">类别</p>
        <el-select v-model="form3.selectValue1"   placeholder="请选择" style="width:90%; margin-left:100px"
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

          <el-select v-model="form3.selectValue2"   placeholder="请选择" style="width:90%; margin-left:100px; margin-top:20px; margin-bottom:20px"
           
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
            <el-button type="primary" @click="submitForm3('form3')">提交</el-button>
            <el-button @click="addDomain3">新增角色</el-button>
            <el-button @click="resetForm3('form3')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>


    </div>
</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
  export default {
    data() {
      return {
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
      };
    },
    methods: {



//验证输入行业是否重复

           blurIndustry(values){
           
        //    console.log(values,"11111111111111111111111111111")
            this.$ajax(
                   url.root()+url.tyCheckTindustryName(),{
                //    'http://192.168.2.48:8080/user/login.action',{
                    params: {
                        tindustryName: values,
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
    //   console.log("select的值",this.form3.selectValue)
                  var myUrl="http://192.168.1.59:8082/"
                 this.$ajax(
                  url.root()+url.ttSelectTindustryTypeByTindustryId(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"), 
                          tindustryId:this.form3.selectValue                  
                    }                      
                   }).then((response) => {
                    console.log("第二个form选择好select后请求成功的数据",response)
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
                           pagenum: 1
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





          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

//第二个表单提交
      submitForm2(formName) {
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
                          pagenum: 1
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





          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
//第三个表单提交
      submitForm3(formName) {
        
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
                          pagenum: 1
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






    },





    
  }
  
</script>