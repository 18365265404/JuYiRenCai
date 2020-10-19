<template>

         
    <div class="login ">
           <div class="pop">
               <el-form ref="form" :model="form">
            <div class="d-cha"><a class="cha" href="#" ></a></div>
            <div class="tite-name">登录</div>
            <div class="pop-content">
                <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="strName"
                    
                    @keyup.native.enter="loginEnter"
                    clearable>
                    <template slot="prepend">账号</template>
                </el-input>
                <el-input  class="pop-text ipt-style"
                    placeholder="请输入内容"
                    v-model="strPass"
                    type="password"
                   @keyup.native.enter="loginEnter"
                    clearable>
                    <template slot="prepend">密码</template>
                </el-input>
              
                 <!-- <el-form-item label="记住密码">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item> -->
                 <el-button class="pop-btn ipt-style" :plain="true"  type="danger" @click="login()">登录</el-button>
                 <div class="loading" v-show="showLoad">
                     <i class="el-icon-loading"></i><i class="load-text">登录中请稍后~~~~</i>
                 </div>
            </div>
            </el-form>
        </div>
    </div>            
     
</template>

<script>
import url from '../utils/url';
import {setCookie,getCookie,delCookie} from '../utils/utils';
export default {
    
    data(){
        return{
                form:{
                     delivery: true,
                },
                strName:"",
                strPass:"",
                isShow:false,
                showLoad:false,
                    
            }
        },



    methods:{
        loginEnter() {
                    if(this.strName==""||this.strPass==""){
                       this.$message({
                        showClose: true,
                        message: '字符不能为空'
                     });
                    
            }else{
                
               this.showLoad=true;
               this.$ajax(
                
                   url.root()+url.lnLogin(),{
                    //  '/static/data/listDelet.json',{
                    method: 'post',
                    params: {
                        username: this.strName,
                        password: this.strPass
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
                            case 200://登录成功
                            // console.log("12312312312312",data)
                                   var token=data.data.token;
                                   var username=data.data.username;

                                //    console.log(data.data.user.id,"1111111111")
                                      setCookie('token',token,100000);  
                                      setCookie('userId',data.data.user.id,100000);
                                      setCookie('username',data.data.user.nikename,100000); 
                                     this.$router.push({ path: '/home' })
                                     this.showLoad=false
                            break;
                    }

                
                }, (response) => {
                this.showLoad=false;
                 const h = this.$createElement;
                                this.$notify({
                                        title: '登录状态',
                                        message: h('i', { style: 'color: teal'}, '服务器异常请稍后登录~')
                                    });
                });

            }
         },
        login:function(){
            // if(this.strName!="admin"){
            //         this.$alert('sorry，尚未对admin以外的用户开放');
            //         return
            // }
            
            //测试跳转
            
            //  setCookie('token',"token",365);  
            //  setCookie('username',this.strName,365);
            // this.$router.push({ path: '/home' })
            
            if(this.strName==""||this.strPass==""){
                       this.$message({
                        showClose: true,
                        message: '字符不能为空'
                     });
                    
            }else{
                
               this.showLoad=true;
               this.$ajax(
                
                   url.root()+url.lnLogin(),{
                    //  '/static/data/listDelet.json',{
                    method: 'post',
                    params: {
                        username: this.strName,
                        password: this.strPass
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
                            case 200://登录成功
                            // console.log("12312312312312",data)
                                   var token=data.data.token;
                                   var username=data.data.username;

                                //    console.log(data.data.user.id,"1111111111")
                                      setCookie('token',token,100000);  
                                      setCookie('userId',data.data.user.id,100000);
                                      setCookie('username',data.data.user.nikename,100000); 
                                     this.$router.push({ path: '/home' })
                                     this.showLoad=false
                            break;
                    }

                
                }, (response) => {
                this.showLoad=false;
                 const h = this.$createElement;
                                this.$notify({
                                        title: '登录状态',
                                        message: h('i', { style: 'color: teal'}, '服务器异常请稍后登录~')
                                    });
                });

            }
            
        }
    },

    created:function(){


    }
}
</script>
<style scoped>


.load-text{
    font-size: 14px;
}
.loading{
    text-align: center;
    margin-top: 20px;
    font-size: 40px;
}
.login{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 50px;
    
    background: #9AA2AE;
}
.pop{
    background:white;
    width: 40%;
    height: 40%;
    
    margin: 0 auto;
    margin-top:15%;
   
}
.pop-content{
    padding-top: 5%;
    width: 80%;
    margin: 0 auto;
}
.ipt-style{
    margin-top: 3%;
}
.pop-btn{
    width: 100%;
}
.cha{
    float: right;
    width: 5%;;
    height: 2%;
    text-align: center;
    font-size: 20px;
   
}
.tite-name{
    margin-top: 3%;
    text-align: center;
    font-size: 16px;
}
.d-cha{
    overflow: hidden;
}


</style>

