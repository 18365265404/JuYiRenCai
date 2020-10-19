<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>网站管理</span><span>/个人表单</span>
         </div>
        </div>

       <!-- 搜索栏 -->
        <div style="overflow:hidden">
         <div class="top-search" style="text-align: center; margin-bottom:20px; ">
            <el-input style=" width:30%; margin-left:10%; float:left" placeholder="请输入内容"   v-model="search" class="input-with-select">
             
            <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            
        </el-input>
        <div class="block">
                   
                   <el-date-picker
                        v-model="valueTime"
                        type="date"
                        value-format="yyyy-MM-dd" 
                        placeholder="请选择日期">
                    </el-date-picker>
                    <el-button slot="append" @click="goSearch2()" icon="el-icon-search" style="margin-left:-10px;background:#F5F7FA"></el-button>
            </div> 
        
        </div>
        </div>
        <div style="position:relative;width:250px;overflow:hidden;float:right;margin-right:5%">
             <el-button class="btn" type="danger" size="mini" style="width:115px; font-size:10px;  margin:5px;margin-left:10px;" @click="downExcel()">下载Excel表模板</el-button>
     
            <div style="width:95px; height:30px; font-size:10px;  margin:5px;margin-left:10px;overflow:hidden;  position: absolute;left:150px;top:0px">
                <el-upload
            
                
                class="upload-demo"
                :action="upExcelurl"
                :on-success="upSucceed"
                :multiple="true"
                :limit="1000"
                :beforeUpload="beforeAvatarUpload"
                :file-list="fileList">
                <el-button class="btn" type="danger" size="mini"  >上传Excel表</el-button>
                
                </el-upload> 
            </div>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" back cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; line-height:50px; font-size:20px"></caption>
            <thead style="background: #666666; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center;  "> 
</th>
              <th style="text-align: center; ">序号</th>  
		      <th style="text-align: center;  ">姓名</th>
		      <th style="text-align: center; " >出生日期</th>
              <th style="text-align: center;   " >籍贯</th>
		      <th style="text-align: center; ">毕业院校</th>
              <th style="text-align: center; ">邮箱</th>
              <th style="text-align: center; ">手机号码</th>
              <th style="text-align: center;  ">所学专业</th>
              <th style="text-align: center;  ">现居住地</th>
              <th style="text-align: center;  ;">学习情况</th>
              <th style="text-align: center;  ">自我评价</th>
              <th style="text-align: center;  ">工作经验</th>
              <th style="text-align: center; ">创建时间</th>
              <th style="text-align: center;width:100px ">上传图片</th>
              
		      
              <th style="text-align: center; width:100px ">操作</th>

		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;" >{{index+1}}</td>
                <td style="text-align: center;">{{item.xName}}</td>
                <td style="text-align: center;">{{item.dateOfBirth}}</td>
                <td style="text-align: center;">{{item.nativePlace}}</td>
                <td style="text-align: center;">{{item.graduateSchool}}</td>
                <td style="text-align: center;">{{item.mailbox}}</td>
                <td style="text-align: center;">{{item.mobilePhone}}</td>
                <td style="text-align: center;">{{item.majorInScience}}</td>
                <td style="text-align: center;">{{item.currentResidence}}</td>
                <td style="text-align: center;">{{item.learningSituation}}</td>
                <td style="text-align: center;">
                    
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"   @click="showEvaluate(item.selfEvaluation)" class="btn" type="primary">评价详情</el-button>
                </td>
                <td style="text-align: center;">
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"   @click="showEvaluate(item.workExperience)" class="btn" type="primary">经验详情</el-button>
                </td>
                <td style="text-align: center;">{{item.createTime}}</td>
                <td style="text-align: center; width:90px; position:relative" >
                    <img @mouseover="overShow(index)" @mouseout="outHide(index)"  style="width:50px; height:20px"  :src='qiniuUrl+item.uploadPhotos' alt="">
                    <div  v-show="!item.uploadPhotos" style="width:95px; height:35px; font-size:10px;  margin:5px;overflow:hidden;  position: absolute;left:0px;top:10px">
                        <el-upload
                           
                            class="upload-demo"
                            :action="upExcelurlImg+'?personalUUID='+item.id"
                            :on-success="upSucceedImg"
                            :file-list="fileList2"
                            name="image"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>

                            </el-upload> 
                    </div>

                </td>
                <td style="text-align: center; width:10%" >
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"   @click="changeTode1(index)" class="btn" type="primary">导出Ecele表</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                </td>

            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
          <el-button class="btn" type="danger" size="mini" style="width:95px; font-size:10px;  margin:5px;margin-left:10px;" @click="exportChoose()">选中导出Excel</el-button>
        </div>

 
       

        <div style="width:50%;overflow: hidden; position:absolute; left:0; right:0; top:20%; bottom:0; margin: auto" v-show="imgShow" >
            <img style="width:100%;"  @mouseover="overShows" @mouseout="outHides" :src="bigImg" alt="">

        </div>
        
<!-- 弹窗 -->
        <el-dialog
        title="内容详情"
        :visible.sync="dialogVisible"
        width="40%"
        center>
        <span>
            {{popValue}}
        </span>

    


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
          popValue:"",
          upExcelurlImg:"",
          upExcelurl:"",
          fileList:[],
          fileList2:[],
          valueTime:"",
            urls:"",
            bigImg:"",
             currentPage:1,
            pageNum:10,//总页数


             changeIndex:"",
             search:"",
             qiniuUrl:"",
             list:[],

             dialogVisible:false,
             imgShow:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
      
      }
    },
     methods:{
            showEvaluate(value){
                this.dialogVisible=true;
                this.popValue=value
            },
            //上传图片

            upImg(index){
                
            },
            //鼠标放小图上去显示大图
            overShow (index) {
            this.bigImg=this.qiniuUrl+this.list[index].uploadPhotos
            this.imgShow=true 
            },
            outHide (index) {
                    this.imgShow=false
            },
            //鼠标放大图上去让大图不消失
            overShows () {
            this.imgShow=true
            },
            outHides (index) {
                    this.imgShow=false
            },
            //表单提交
            upSucceed(file, fileList) {
                    
                    switch (file.status) {

                        case 400:
                            this.$alert(file.msg);
                            this.$router.push({ path: '/login' })
                            break
                        case 401:
                                 this.$alert(file.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(file.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200:
                            this.$message({
                                    type: 'success',
                                    message: "上传成功"
                                    });
                            break; 
                           
                    
                    }



                this.$ajax(
                  url.root()+url.tsinSelectAll(),{
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          pageNum: this.currentPage                     
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
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                            // console.log("分页请求成功的数据",data)
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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
            upSucceedImg(file, fileList) {
                    console.log(file, fileList);
                    switch (file.status) {

                        case 400:
                            this.$alert(file.msg);
                            this.$router.push({ path: '/login' })
                            break
                        case 401:
                                 this.$alert(file.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(file.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200:
                            this.$message({
                                    type: 'success',
                                    message: "上传成功"
                                    });
                            break; 
                           
                    
                    }


                this.$ajax(
                  url.root()+url.tsinSelectAll(),{
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          pageNum: this.currentPage                     
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
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                            // console.log("分页请求成功的数据",data)
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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

            beforeAvatarUpload(file) {                
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
                const extension = testmsg === 'xls'  
                const extension2 = testmsg === 'xlsx'  
                const isLt2M = file.size / 1024 / 1024 < 10  
                if(!extension && !extension2) {  
                    this.$message({  
                        message: '上传文件只能是 xls格式!',  
                        type: 'warning'  
                    });  
                }  
                if(!isLt2M) {  
                    this.$message({  
                        message: '上传文件大小不能超过 10MB!',  
                        type: 'warning'  
                    });  
                }  
                return extension || extension2 && isLt2M  
            },

             beforeAvatarUploadImg(file) {                

                const isLt2M = file.size / 1024 / 1024 < 2  

                if(!isLt2M) {  
                    this.$message({  
                        message: '上传文件大小不能超过 2MB!',  
                        type: 'warning'  
                    });  
                }  
                return isLt2M  
            },


            goSearch(){//搜索
            console.log(this.search,"sdfsdf")
               
            this.$ajax(
                  url.root()+url.tsinSelectAll(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          likeName:this.search
                          
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
                            console.log("搜索请求成功的数据",data)
                            if(data.data.msg){
                                
                            }
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                           
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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

            goSearch2(){//搜索
            console.log(this.valueTime,"sdfsdf")
               
            this.$ajax(
                  url.root()+url.tsinSelectAll(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          likeName:this.valueTime
                          
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
                            console.log("搜索请求成功的数据",data)
                            if(data.data.msg){
                                
                            }
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                           
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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
            downExcel(){
                
                window.location.href ="http://pe5iwubyw.bkt.clouddn.com/example2.xls"
            },
            // 下载Excel表
            changeTode1(index){
                  var getCookies=getCookie("token")
                 var urls=`${url.root()}${url.tsinExpertExcel()}?token=${getCookies}&idStr=${this.list[index].id}`
                window.location.href = urls;
            },
                        //选择导出及其全部导出
            exportChoose(){
                let chooseArrId=[];
                 for(let i=0;i<this.checkedCities.length;i++){
                    chooseArrId.push(this.checkedCities[i].id);
                }

                    this.$confirm('是否要批量导出, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            var getCookies=getCookie("token")
                            var urls=`${url.root()}${url.tsinExpertExcel()}?token=${getCookies}&idStr=${chooseArrId}`
                                    //   ${url.root()}${url.bcinExpertExcel()} 
                           window.location.href = urls;
                            }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '导出已经取消'
                        });          
                        });
            },


            // 删除某一条
            removeTodo(index){
                // console.log("删除的index",this.list[index].id);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                            this.$ajax(
                            url.root()+url.tsinDelete(),{
                            //    'http://192.168.2.48:8080/user/login.action',{
                                method:"post",
                                params: {
                                    token:getCookie("token"),
                                    idStr: this.list[index].id,
                                     imageStr:this.list[index].uploadPhotos
                                }
                            } ).then((response) => {

                                var data=response.data;
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
                                                            var lists=data.data.page.records
                                                            var pageNums=data.data.page.totalpage
                                                            var currentPages=data.data.page.pageNum
                                                            // console.log("删除请求成功的数据",data)
                                                            this.qiniuUrl=data.data.qiniuUrl
                                                            this.list=lists;
                                                            this.pageNum=pageNums*10
                                                            this.currentPage=currentPages*10
                                                break;
                                          }
                                        }, (response) => {
                                        // console.log('error');
                        
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
                let chooseArrId=[];
                let chooseArrImg=[]
                for(let i=0;i<this.checkedCities.length;i++){
                    chooseArrId.push(this.checkedCities[i].id);
                    if(this.checkedCities[i].uploadPhotos){
                        chooseArrImg.push(this.checkedCities[i].uploadPhotos);
                    }
                   
                }
                // console.log("删除的chooseArrImg",chooseArrImg);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                                this.$ajax(
                                    
                                url.root()+url.tsinDelete(),{
                                    //    'http://192.168.2.48:8080/user/login.action',{
                                        method:"post",
                                        params: {
                                            token:getCookie("token"),
                                            idStr: chooseArrId+"",
                                            imageStr:chooseArrImg+""
                                }
                            } ).then((response) => {
                               var data=response.data;
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
                                                            var lists=data.data.page.records
                                                            var pageNums=data.data.page.totalpage
                                                            var currentPages=data.data.page.pageNum
                                                            // console.log("删除所有请求成功的数据",data)
                                                            this.qiniuUrl=data.data.qiniuUrl
                                                            this.list=lists;
                                                            this.pageNum=pageNums*10
                                                            this.currentPage=currentPages*10
                                                break;
                                          }
                                        
                                        }, (response) => {
                                        // console.log('error');
                        
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
                  url.root()+url.tsinSelectAll(),{
                    method: 'post',
                    params: {
                          token:getCookie("token"),
                          pageNum: this.currentPage                     
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
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                            // console.log("分页请求成功的数据",data)
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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
        // console.log("判断是否每次都进入调用11111111111111",getCookie("token"))
        this.upExcelurl=url.root()+url.tsinImportExcel()
        this.upExcelurlImg=url.root()+url.qnUploadImg()
            this.$ajax(
                  url.root()+url.tsinSelectAll(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")                        
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 555:
                                this.$alert('权限不足');                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                             console.log("请求成功的数据",data)
                            var lists=data.data.page.records
                            var pageNums=data.data.page.totalpage
                            var currentPages=data.data.page.pageNum
                           
                             this.qiniuUrl=data.data.qiniuUrl
                            this.list=lists;
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

