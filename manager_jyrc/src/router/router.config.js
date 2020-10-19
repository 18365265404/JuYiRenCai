import home from '../components/home.vue';
import login from '../components/login.vue';
import error from '../components/error.vue';
import userManageWeb from '../components/userManageWeb.vue';
import userManagePersonWeb from '../components/userManagePersonWeb.vue';
import jobManager from '../components/jobManager.vue';
import userMessageUs from '../components/userMessageUs.vue';
import roleManage from '../components/roleManage.vue';
import cPassWord from '../components/cPassWord.vue';
import jobManagerFormWeb from '../components/jobManagerFormWeb.vue';
import EditNew from '../components/EditNew.vue';
import form1 from '../components/form1.vue';
import form2 from '../components/form2.vue';
import customer from '../components/customer.vue';
import bannerManage from '../components/bannerManage.vue';



let routes=[
  {path:'/home',component:home},
  {path:'/login',component:login},
  {path:'/userManageWeb',component:userManageWeb},
  {path:'/userManagePersonWeb',component:userManagePersonWeb},
  {path:'/jobManager',component:jobManager},
  {path:'/userMessageUs',component:userMessageUs},
  {path:'/roleManage',component:roleManage},
  {path:'/cPassWord',component:cPassWord},  
  {path:'/jobManagerFormWeb',component:jobManagerFormWeb},  
  {path:'/EditNew',component:EditNew},
  {path:'/form1',component:form1},
  {path:'/form2',component:form2},
  {path:'/customer',component:customer},
  {path:'/bannerManage',component:bannerManage},
   
  {path:'/',redirect: '/login'},
  {path:'*',component:error}
]



// export default routes;
export default {routes}