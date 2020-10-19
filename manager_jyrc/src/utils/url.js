// 接口汇总
//服务器地址

// var root = 'http://47.100.237.163:8082/'//正式阿里云
// var root = 'http://106.15.187.138:8082/'//测试阿里云
// var root = 'http://192.168.1.51:8082/'//本地测试测试//汪
var root = 'http://192.168.1.59:8082/'//邢
/**
 * 登录注册退出
 */
var lnLogin="ln/login"//登录
var lnLoginOut="ln/loginOut"//退出
var userUpdatePasswordByUser="user/updatePasswordByUser"//修改密码
//获取器牛头
var qnUploadImg="qn/uploadImg"




/**
 *可使用管理系统的账号管理
 */
var userSelectAllUser="user/selectAllUser"//查询所有
var userUpdateUser="user/updateUser"//修改用户信息
var userInsertUser ="user/insertUser"//添加一条用户账号
var userDeleteUser ="user/deleteUser"//删除一条用户账号
var userCheckName ="user/checkName"//添加用户的时候，验证用户名是否重复
var userResetPasswords ="/user/resetPasswords"//重置用户密码

/**
 *用户权限管理
 */
var trjnSelectAll ="trjn/selectAll"//所有权限
var trjnSelectAllById ="trjn/selectAllById"//查看某人的权限
var trjnInsert ="trjn/insert"//增加的权限
var trjnDelete ="trjn/delete"//删除某条的权限



/**
 * 系统管理/用户企业/对顾客
 */
var bcinSelectAll="bcin/selectAll"
var bcinDelete="bcin/delete"
var bcinExpertExcel="bcin/expertExcel"//倒出Excel表

/**
 * 系统管理/角色管理
 */
var roleSelectAllRole="role/selectAllRole"//查询所有角色
var roleInsertRole="role/insertRole"//增加角色
var roleDeleteRole="role/deleteRole"//删除角色


/**
 * 系统管理/用户个人/对顾客
 */
var tsinSelectAll="tsin/selectAll"
var tsinDelete="tsin/delete"
var tsinExpertExcel="tsin/expertExcel"//倒出Excel表
var bcinImportExcel="bcin/importExcel"//企业上传Excel表格
var tsinImportExcel="tsin/importExcel"//个人上传Excel表格
var qnUploadImg="qn/uploadImg"//企业个人公用上传图片




//增加一篮子数据：行业、类别、行业角色
var tyInsertTindustry="ty/insertTindustry" //添加职位行业、类别、行业角色一

var ttInsertTindustryType="tt/insertTindustryType" //添加职位行业、类别、行业角色e二

var trInsertTindustryRole="tr/insertTindustryRole" //添加职位行业、类别、行业角色三

var tySelectALLTindustry="ty/selectALLTindustry" //添加职位行业、类别、行业角色

var ttSelectTindustryTypeByTindustryId ="tt/selectTindustryTypeByTindustryId" //form2里的第一个select改变的


var tySelectAllCascade ="tr/selectAllCascade" //查询所有职位类别角色等

var tyDeleteTindustry ="ty/deleteTindustry" //删除行业
var ttDeleteTindustryType ="tt/deleteTindustryType" //类别
var trDeleteTindustryRole  ="tr/deleteTindustryRole" //角色
/**
 * 新添行业类型角色验证是否重复
 */
var tyCheckTindustryName ="ty/CheckTindustryName" //校验行业名称
var ttCheckTindustryTypeName ="tt/CheckTindustryTypeName" //校验行业名称
var trTindustryRoleName ="tr/TindustryRoleName" //校验行业名称

/**
 * 企业动态富文本
 */
var tedsSel ="/teds/sel" //查询全部企业动态
var tedsAdd ="/teds/add" //新增企业动态
var tedsDel ="teds/del" //删除企业动态
var tedsUpd ="/teds/upd" //修改企业动态
/**
 * banner管理
 */
var tpSelectAllTWebsitePictures ="tp/selectAllTWebsitePictures" //查询所有banner图片
var tpInsertTWebsitePictures ="/tp/insertTWebsitePictures" //新增banner图片
var tpDeleteTWebsitePictures ="/tp/deleteTWebsitePictures" //删除banner
var tedsUpd ="/teds/upd" //修改企业动态

/**
 * 提示参数
 */
var errorToast="请求错误"

export default {
    /* 
       返回接口模块  
    */
    //服务器地址
    root: function(){
        return root
    },
    root2: function(){
        return root2
    },

    /**
     * userLogin
     */
    lnLogin: function(){
        return lnLogin
    },
    lnLoginOut: function(){
        return lnLoginOut
    },
    
    /**
     * 修改密码
     */
    userUpdatePasswordByUser: function(){
        return userUpdatePasswordByUser
    },
    /**
     * 获取七牛头
     * */
    qnUploadImg: function(){
        return qnUploadImg
    },
    /**
     * 用户模块企业
     */
    bcinSelectAll: function(){
        return bcinSelectAll
    },
   
    bcinDelete: function(){
        return bcinDelete
    },
    
    bcinExpertExcel: function(){
        return bcinExpertExcel
    },

    /**
     * 可使用管理系统的账号管理
     */
    userSelectAllUser: function(){
        return userSelectAllUser
    },
    userUpdateUser: function(){
        return userUpdateUser
    },
    userInsertUser: function(){
        return userInsertUser
    },
    userDeleteUser: function(){
        return userDeleteUser
    },
    userCheckName: function(){
        return userCheckName
    }, 
    userResetPasswords: function(){
        return userResetPasswords
    },    
    
    
    /**
     * 可使用管理系统的账号管理
     */
    roleSelectAllRole: function(){
        return roleSelectAllRole
    },
    roleInsertRole: function(){
        return roleInsertRole
    },
    roleDeleteRole: function(){
        return roleDeleteRole
    },   

    /**
     * 权限管理
     */
    trjnSelectAll: function(){
        return trjnSelectAll
    },
    trjnSelectAllById: function(){
        return trjnSelectAllById
    },
    trjnInsert: function(){
        return trjnInsert
    },   
    trjnDelete: function(){
        return trjnDelete
    },      
    
    
    /**
     * 用户模块个人
     */
    tsinSelectAll: function(){
        return tsinSelectAll
    },
   
    tsinDelete: function(){
        return tsinDelete
    },
    
    tsinExpertExcel: function(){
        return tsinExpertExcel
    },
    bcinImportExcel: function(){
        return bcinImportExcel
    },
    tsinImportExcel: function(){
        return tsinImportExcel
    },
    qnUploadImg: function(){
        return qnUploadImg
    },
    
    
    tyInsertTindustry: function(){
        return tyInsertTindustry
    },
    ttInsertTindustryType: function(){
        return ttInsertTindustryType
    },
    trInsertTindustryRole: function(){
        return trInsertTindustryRole
    },

    
    tySelectALLTindustry: function(){
        return tySelectALLTindustry
    },
    ttSelectTindustryTypeByTindustryId: function(){
        return ttSelectTindustryTypeByTindustryId
    },
    tySelectAllCascade: function(){
        return tySelectAllCascade
    },
    tyDeleteTindustry: function(){
        return tyDeleteTindustry
    },
    ttDeleteTindustryType: function(){
        return ttDeleteTindustryType
    },
    trDeleteTindustryRole: function(){
        return trDeleteTindustryRole
    },
    
    /****
     * 校验行业名称
     */
    tyCheckTindustryName: function(){
        return tyCheckTindustryName
    },
    ttCheckTindustryTypeName: function(){
        return ttCheckTindustryTypeName
    },
    trTindustryRoleName: function(){
        return trTindustryRoleName
    },

    userSelectAllName: function(){
        return userSelectAllName
    },
    UserManyRoleInsertUserManyRole: function(){
        return UserManyRoleInsertUserManyRole
    },
    roleSelectIdByRole: function(){
        return roleSelectIdByRole
    },

    userSelectUserById: function(){
        return userSelectUserById
    },

    /**
     * 企业动态查询
     */
    tedsSel: function(){
        return tedsSel
    },    
    tedsAdd: function(){
        return tedsAdd
    }, 
    tedsDel: function(){
        return tedsDel
    },   
    tedsUpd: function(){
        return tedsUpd
    },  
/**
 * banner管理
 */
    tpSelectAllTWebsitePictures: function(){
        return tpSelectAllTWebsitePictures
    },
    tpInsertTWebsitePictures: function(){
        return tpInsertTWebsitePictures
    },
    tpDeleteTWebsitePictures: function(){
        return tpDeleteTWebsitePictures
    },    
    

    /* 
       返回提示信息模块 
    */
    errorToast: function(){
        return errorToast
    },

}


