$(function(){
	//轮播图

	$.ajax({
				type:"post",
				url:"http://47.100.237.163:8082/tp/selectGWAllTWebsitePictures",
//				url:"http://192.168.1.51:8082/bcin/insert",
				
             	dataType:"json",
				data:{      


				},
				success:function(data){
					console.log("123123123",data.data)
					var qiliuPath=data.data.qiniuUrl
					var listBanner=data.data.page
                             

					let strs="";
					
					for(var i=0;i<listBanner.length;i++){
					
						
						strs+=`
							<div class="swiper-slide" 
							style="background-image: url(${qiliuPath}${listBanner[i].websitePictures}); background-position: center center">
							</div>
					`

				}
					
					$(".swiper-wrapper2").html(strs);
					
					var swiper = new Swiper('.swiper-container2',{
		      		autoplay:true,
		         	});


				},
				error:function(data){
//					alert("服务器异常！！！")
				}
				
			}); 
			


      	
   //导航栏   一	
     var offOn=true;
 	$(".pop-a4").click(function(){
// 		alert("1231231")
 		if(offOn){
 			$(".pop-a1").css("display","none")
 			$(".pop-a2").css("display","none")
 			$(".pop-a3").css("display","none")
 			offOn=false
 		}else{
 			$(".pop-a1").css("display","block")
 			$(".pop-a2").css("display","block")
 			$(".pop-a3").css("display","block")
 			offOn=true
 		}
 		
 	})
 	//导航栏二 返回顶部
 	       $(window).scroll(function(){
        // console.log($(this).scrollTop());

       //当window的scrolltop距离大于1时，go to 
        if($(this).scrollTop() > 100){
               $('.pop-top').fadeIn();
          }else{
                $('.pop-top').fadeOut();
           }
       });
	
	$(".pop-top li").mouseover(function(){
		$(this).find("a").css("display","block")
	})
	$(".pop-top li").mouseleave(function(){
		$(this).find("a").css("display","block")
	})
	
	$(".go-top").click(function(){
		$('html ,body').animate({scrollTop: 0}, 300);
	})
      	
})
//拖拽
$(document).ready(function(){ 
  var move=false;
  var _x,_y;
  $(".drag").mousedown(function(e){ 
    move=true; 
    _x=e.pageX-parseInt($(".pop-top").css("left")); 
    _y=e.pageY-parseInt($(".pop-top").css("top")); 
  }); 
  $(document).mousemove(function(e){ 
    if(move){ 
      var x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置 
      var y=e.pageY-_y; 
      $(".pop-top").css({"top":y,"left":x}); 
    } 
  }).mouseup(function(){ 
    move=false; 
  }); 
})
