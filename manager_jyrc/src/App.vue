<template>
  <div id="app">
      <loading v-show="bLoading"></loading>      
      <header class="headers">
        <div class="name-vaerson">聚一人才管理系统1.0</div>
        <div class="user-name" v-show="userNameS"><span>用户：</span> <span @click="userName">{{userData.username}}  </span></div>  
        <ul class="person" v-show="personStatus">
          <li @click="changePW()" >修改密码</li>
          <!-- <router-link tag="li" @click="changePW()" to="/cPassWord">修改密码</router-link> -->
          <li @click="logout()">退出</li>
        </ul>

      </header>
	
    


    <footbar v-show="bFoot"></footbar>
    <router-view></router-view>
  </div>
</template>

<script>


import footbar from './components/footbar'
import { mapGetters} from 'vuex';
import url from './utils/url';
import {getCookie,delCookie} from './utils/utils';

export default {
  name: 'App',
    data(){
    return{
      userData:{
            username:"",
            
      },
      personStatus:false,
      userNameS:false,
    }
  },
  components:{
    footbar
  },
    computed:mapGetters([
    'bFoot',"bLoading"
  ]),

    created:function(){
        console.log("每次都刷新的create")
        var username=getCookie("username");
        this.userData.username=username
        
        if(username){
          this.userNameS=true
        }
        
  },

  methods:{
    userName:function(){
      this.personStatus=!this.personStatus
    },
    logout:function(){

      this.$ajax(
                  url.root()+url.lnLoginOut(),{
                    method:"post",
                    params: {
                      token:getCookie("token"),
                    }
                   } ).then((response) => {
                          delCookie("token")
                          delCookie("username")
                          this.$router.push({ path: '/login' });
                          this.personStatus=false;
                          this.userNameS=false;
                          this.userData.name="请登录";
     
                    const h = this.$createElement;
                                this.$notify({
                                        title: '',
                                        message: h('i', { style: 'color: teal'}, '退出成功')
                                    });
                  
                }, (response) => {
                console.log('error');
 
                });
 
    },
    changePW:function(){
      this.personStatus=false;
     this.$router.push({ path: '/cPassWord' });
    }
  },

   watch:{
    // data的数据名(){数据变化，函数就会调用}
    $route:function(newValue,oldValue){
      let path = newValue.path;


      if(/login|cPassWord/.test(path)){
        this.$store.dispatch('HIDE_FOOT');
      }
/*********************当处于登录在线状态的时候，不能返回跳入login页*************************** */
      if(/login/.test(path)){
        this.userNameS=false;
        var username=getCookie("username");
       
          if(username){
            // this.$router.push({ path: '/home' })
        }
      }
      if(!/login/.test(path)){
        this.$store.dispatch('SHOW_FOOT');
        var username=getCookie("username");

        
        if(username){
            this.userData.username=username;
            this.userNameS=true
        }else{
          this.userNameS=false;
 /*********************当处于不在登录在线状态的时候，会跳入login页*************************** */
          // this.$router.push({ path: '/login' })
        }
   
      }


    }
  },
  
}
</script>

<style scoped>
.headers{

  height: 5%;
  width: 100%;
  overflow: hidden;
  background: rgb(20, 17, 17);
}
.person{
  border: 1px solid #cccccc;
  position: absolute;
  background: white;
  right: 2%;
  height: 100px;
  top: 50px;
  z-index: 200;
  text-align: center;
  display: block;
  cursor: pointer;
}
.person li{
  line-height: 50px;
  cursor: pointer;
}
.person li:nth-child(1){
  border-bottom: 1px solid #cccccccc;
}

.name-vaerson{
  float: left;
  margin-left: 10px;
  line-height: 50px;
  color: white;
}
.user-name{
  cursor: pointer;
  color: white;
  float: right;
  line-height: 50px;
  margin-right: 2%;
}
.person li:hover {
    cursor: pointer;
    background: #cccccc;
}
</style>

