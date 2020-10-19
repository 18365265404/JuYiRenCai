<template>
  <div class="foot-btn" >
   <div class="navigation-left">
     
      <el-menu   class="title-list" :unique-opened="true"  :default-openeds="openeds">

        <el-submenu  v-show="item.status"  :index="item.id" @click="showToggle(item,index)" v-for="(item,index) of list" :key="item.index">
          <template slot="title" class="one-menue-title" style="width:185px">
            <i :class="item.iconfont" style="font-size:18px;line-height:18px;"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group class="two-page-box" style="width:185px;overflow: hidden" >  
               <el-menu-item id="two-menue-li" style="overflow: hidden;" v-show="item.status" :index="item.id" v-for="item of item.menus" :key="item.id" >
                 <router-link active-class="home1" class="name-text" tag="span" :to="item.expres" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i :class="item.iconTwo">&nbsp;&nbsp;</i>{{item.name}}</router-link>
               </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
        
       
      </el-menu>
  </div>
  </div>
</template>

<script>
import {getCookie} from '../utils/utils';

export default {
    data(){
      return{
        //  isCollapse: true,
        router:true,
        openeds:["0"]//默认打开的
        ,
         list:[
    {     "isSubShow":["1"],
           "status":true, 
          "isA":false,
          "isB":true,
         "iconfont":"iconfont xitongguanli",
        "id": "1",  "name": "系统管理",
        "menus": [

                  { "id": "01","status":true, "name": "用户信息","expres":"userMessageUs","iconTwo":"iconfont yonghuxinxi" },
                  { "id": "02","status":true, "name": "角色信息","expres":"roleManage","iconTwo":"iconfont yonghuxinxi" }
                 ]
    },
 
    {
        "isSubShow":["2"],
        "status":true, 
        "isA":false,
        "isB":true,
        "iconfont":"iconfont tupianguanli",
        "id": "2",  "name": "网站管理",
        "menus": [
                  { "id": "01","status":true, "name": "企业信息","expres":"userManageWeb","iconTwo":"iconfont yonghuxinxi" },
                  { "id": "02","status":true, "name": "个人信息","expres":"userManagePersonWeb","iconTwo":"iconfont yonghuxinxi" },
                  { "id": "03","status":true, "name": "banner信息","expres":"bannerManage","iconTwo":"iconfont touxiangguanli" },                  
                  { "id": "04","status":true, "name": "数据信息","expres":"jobManagerFormWeb","iconTwo":"iconfont touxiangguanli" }, 
                  { "id": "05","status":true, "name": "动态信息","expres":"EditNew","iconTwo":"iconfont touxiangguanli" },                 

               ]
    },
 

]
      };
    },
     methods: {

          showToggle:function(item){ 

          }



    },
    created(){
      //用来管理浏览器刷新，保存路由状态
       var  path = window.location.href
       var newPath = path.split('/#/')[1];

  
      if(newPath=="userMessageUs"||newPath=="roleManage"){
      
        this.openeds=["1"]
      }
      if(newPath=="userManageWeb"||newPath=="userManagePersonWeb"||newPath=="jobManagerFormWeb"||newPath=="EditNew"||newPath=="bannerManage"){
      
        this.openeds=["2"]
      }


      // 不同用户显示不同类容
      var username=getCookie("username");
      if(username=="系统管理员"){
            this.list[0].status=true;

        }else{
              this.list[0].status=false;
        }
    },

      watch:{
    // data的数据名(){数据变化，函数就会调用}
    $route:function(newValue,oldValue){
      let path = newValue.path;
            var username=getCookie("username");
          
      if(!/login|cPassWord/.test(path) && username!=null){

        if(username=="系统管理员"){
            this.list[0].status=true;

        }else{
              this.list[0].status=false;
        }
          console.log("进入这页面了")
      }

    }
  },

  };
  


</script>

<style scoped>
.one-menue-title{
  width: 40px;
  background: red
}
.name-text{
  color: #333;
  background: white;
  width:185px;
  overflow: hidden;
 
  
  
}
.name-text:hover{
  background: #ECF5FF;
}
.home1{

  color: #66B1FF;
  background: #ECF5FF
}
.home1 i{
  color: #66B1FF;
}
.foot-btn{
    float: left;
    
    
    width: 185px;
    height: 95%;

   overflow: hidden;

}

.navigation-left{
  position: fixed;
  width:185px; 
  height: 95%;
  border-right: 1px  solid #cccccc;
  overflow-x: hidden;;
  overflow-y: scroll;
}
.two-page-box{
  margin-top: -13px;
  
 
}
/* #two-menue-li{

  overflow: hidden;
   padding-right: 0;
  padding-left: 0;
} */
.title-list{
  
  border-right: none;
  margin-right: 2px;
  
}
.name-text{
  position: absolute;
  left: 0;
 
  display: block;
 
  
  
  
}

</style>
