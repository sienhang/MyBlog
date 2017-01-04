$(function(){
    
    //显示QQ信息
    $('.qq').click(function(){
       $('body').css('overflow','hidden');
       $('#screen').css({//遮罩画布
          'width':$(window).width(),
          'height':$(window).height()
       }).show();
       $('.qq-info').css({//提示框居中
          'top':($(window).height()-150)/2-60,
          'left':($(window).width()-300)/2
       }).show();       
    });

    //显示Email信息
    $('.mail').click(function(){
       $('body').css('overflow','hidden');
       $('#screen').css({//遮罩画布
          'width':$(window).width(),
          'height':$(window).height()
       }).show();
       $('.email-info').css({//提示框居中
          'top':($(window).height()-150)/2-60,
          'left':($(window).width()-300)/2
       }).show(); 
    });

    //点击确认按钮
    $('.confirm').click(function(){
       $('#screen').hide();
       $('.qq-info').hide();
       $('.email-info').hide();
       $('body').css('overflow','auto');      
    });

    //初始化页面
    showAllPages('all',4);     //初始化总页数
    selectArticle('all',1,4);  //显示首页4篇文章内容
    selectArticle('all',1,12); //侧栏显示最新发布的12篇文章标题
    showClassTolNum();         //侧栏显示每种分类分别有多少篇文章

    //点击博客首页选项
    $('.aside-nav .index').click(function(){
        clickShow();
        $('.section-artical').show();
        $(this).css({
          'opacity':'1',
          'background-color':'#f0f0f0'
        });      
        $('section').attr('classify','all');
        showAllPages('all',4);
        selectArticle('all',1,4);
    });

    //点击个人中心选项
    $('.aside-nav .personal').click(function(){
        clickShow();        
        $(this).css({
          'opacity':'1',
          'background-color':'#f0f0f0'
        }); 
        $('.section-page').hide();
    });

    //点击所有博文选项，显示所有博文标题
    $('.aside-nav .allblogs').click(function(){
        $('.section-onearticle .return').show();
        clickShow();
        $('.section-alltitles').show();         
        $(this).css({
          'opacity':'1',
          'background-color':'#f0f0f0'
        });
        $('.section-artical').hide();
        $('.section-alltitles').show();
        $('section').attr('classify','all');
        showAllPages('all',30);
        selectArticle('all',1,30); 
    });    

    //点击侧栏博文分类选项，显示所有属于该分类的文章
    $('.category-list li').click(function(){
       clickShow();
       $('.section-artical').show();
       $(this).css({
         'background':'url(images/folderopen.png) no-repeat 10px center',
         'color':'#3C599A',
         'text-shadow':'0px 0px 1px #3C599A',
         'background-color':'#f0f0f0'
       });
       var type = $(this).attr('classify');
       $('section').attr('classify',type);       
       showAllPages(type,4);
       selectArticle(type,1,4);             
    });

    //点击侧栏最新发布博文标题，显示对应文章
    $('.title-list li').click(function(){
        var scrolltop=$(document).scrollTop();
        $(document).scrollTop(210);
        clickShow();
        $('.section-onearticle .return').hide();
        $('.section-onearticle').show(); 
        $(this).css({
          'background':'url(images/airgo.png) no-repeat 7px center',
          'color':'#3C599A',
          'text-shadow':'0px 0px 1px #3C599A',
          'background-color':'#f0f0f0'
        }); 
        var index=$(this).index();
        $.ajax({
            type:'post',
            url:'//localhost:3000/selectOneArticle',
            data:{
               currentPage:1,
               index:index
            }
        })
        .then(function(a_data){        
           showOneArticle(a_data[0],scrolltop);
        }); 
    });

    //点击侧栏我的好友选项
    $('.friends-list li').click(function(){
       clickShow();
       $(this).css({
         'background':'url(images/hander.png) no-repeat 10px 7px',
         'color':'#3C599A',
         'text-shadow':'0px 0px 1px #3C599A',
         'background-color':'#f0f0f0'
       }); 
       $('.section-page').hide();      
    }); 

    //点击Readall按钮,阅读全文,显示全文
    $('.section-artical .readall').click(function(){
        var scrolltop = $(document).scrollTop();
        $(document).scrollTop(210);
        $('.section-onearticle .return').show();
        var index = parseInt($(this).attr('sign'));
        var type=index==0?'a':index==1?'b':index==2?'c':index==3?'d':'a';
        var a_data={
          b_title:$('.section-artical .article-title span').eq(index).html(),
          b_type:$('.section-artical .folder').eq(index).html(),
          b_date:$('.section-artical .date').eq(index).html(),
          b_text:$('.section-artical .article-content').eq(index).html()
        }
        $('.section-onearticle').attr('presign','article');
        showOneArticle(a_data,scrolltop);
    });

    //点击文章标题,阅读全文,显示全文
    $('.section-artical .article-title span').click(function(){
       var index = parseInt($(this).attr('sign'));
       $('.section-artical .readall').eq(index).trigger('click');
    });

    //点击文章下方文件夹按钮
    $('.article-route .folder').click(function(){
       if($(this).html()=='前端技术'){
          $('.category-list li').eq(0).trigger('click');
          $(document).scrollTop(210);
       }
       if($(this).html()=='资源分享'){       
          $('.category-list li').eq(1).trigger('click');
          $(document).scrollTop(210);          
       }
       if($(this).html()=='生活点滴'){       
          $('.category-list li').eq(2).trigger('click');
          $(document).scrollTop(210);          
       }
       if($(this).html()=='涂鸦日志'){      
          $('.category-list li').eq(3).trigger('click');
          $(document).scrollTop(210);          
       }                     
    });

    //点击所有博文页面下的文章标题显示对应文章
    $('.alltitles .headline').click(function(){
       var scrolltop=$(document).scrollTop();
       $(document).scrollTop(210);
       var currentPage=$('.page-list .current').html();
       var index=$(this).index();
       $.ajax({
            type:'post',
            url:'//localhost:3000/selectOneArticle',
            data:{
               currentPage:currentPage,
               index:index
            }
       })
       .then(function(a_data){
          $('.section-onearticle').attr('presign','title');        
          showOneArticle(a_data[0],scrolltop);
       });       
    });

    //点击页码显示具体分类的指定页内容
    $('.page-list').on('click','.page.number',function(){
       var type=$('section').attr('classify');          
       var pages=parseInt($('.allpages').html());//获取总页码数
       var toPage=parseInt($(this).html());//获取目标页码数
       var differ=pages-13;
       var numPerPage=parseInt($('.section-page').attr('sign'));//获取每页显示的数据条数
       selectArticle(type,toPage,numPerPage);
       showPageList(toPage,pages);     
    });

    //页面向上一页切换
    $('.page.arrow.prev').click(function(){
       var toPage=parseInt($('.page.current').html())-1;       
       if(toPage!=0){//目标页不是第一页
         $('.page.current').prev('.page.number').trigger('click');                 
       }
    });

    //页面向下一页切换
    $('.page.arrow.next').click(function(){
       var pages=parseInt($('.allpages').html());
       var toPage=parseInt($('.page.current').html())+1;
       if(toPage<=pages){
         $('.page.current').next('.page.number').trigger('click');
       }
    });

    //跳转至指定页
    $('.topage .skip').click(function(){
        var toPage=parseInt($('.topage .inputpage').val());
        var pages=parseInt($('.allpages').html());
        var type=$('section').attr('classify');
        var numPerPage=parseInt($('.section-page').attr('sign'));
        if(toPage>=1 && toPage<=pages){
           selectArticle(type,toPage,numPerPage);
           showPageList(toPage,pages);
        }
    });

    //回顶部
    $('.foot .top').click(function(){
       $(document).scrollTop(0);
    });

    //每次点击右侧栏的将其恢复至初始设置
    function clickShow(){
       $('.section-artical').hide();
       $('.section-onearticle').hide();
       $('.section-alltitles').hide();
       $('.section-page').show(); 
       $('.aside-nav .nav').css({
          'opacity':'0.7',
          'background-color':'#fff'         
       });       
       $('.category-list li').css({
          'background':'url(images/folderclose.png) no-repeat 10px center',
          'color':'rgba(0,0,0,0.6)',
          'text-shadow':'none'       
       });
       $('.title-list li').css({
          'background':'url(images/air.png) no-repeat 10px center',
          'color':'rgba(0,0,0,0.6)',
          'text-shadow':'none'         
       });
       $('.friends-list li').css({
          'background':'url(images/friends.png) no-repeat 10px 6px',
          'color':'rgba(0,0,0,0.6)',
          'text-shadow':'none'           
       });
    }

    //设置指定分类文章的总页数,并初始化页码列表
    function showAllPages(type,number){  //number表示每页显示多少条     
       $.ajax({
          type:'post',
          url:'//localhost:3000/getTypeTolNum',
          data:{
            type:type
          }
       })
       .then(function(count){
          var pages=Math.ceil(count/number);
          $('.allpages').html(pages);
          $('.section-page').attr('sign',number);
          //页码列表显示初始化
          $('.page.number').detach();
          if(pages<10){
            for(var i=0;i<pages;i++){
              $('<li class="page number">'+(i+1)+'</li>').insertBefore($('.page.next'));
            }            
          }else if(pages>=10){
            for(var i=0;i<9;i++){
              $('<li class="page number">'+(i+1)+'</li>').insertBefore($('.page.next'));
            }             
          }
          $('.page.number').eq(0).addClass('current');         
       });      
    }

    //显示每种分类的文章总数
    function showClassTolNum(){
       $.ajax({
          type:'get',
          url:'//localhost:3000/getClassTolNum'
       })
       .then(function(data){
          for(var i=0;i<4;i++){
            $('.category-list span').eq(i).html(data[i]);
          }
       });      
    }

    //查找并显示指定分类文章的第几页
    function selectArticle(type,toPage,numPerpage){   
       $.ajax({
            type:'post',
            url:'//localhost:3000/selectArticle',
            data:{
               type:type,
               toPage:parseInt(toPage),
               numPerpage:numPerpage
            }
       })
       .then(function(a_data){
           if(numPerpage==4){
             showArticle(a_data);
           }
           if(numPerpage==12){
             showReTitles(a_data);
           }            
           if(numPerpage==30){
             showAllTitles(a_data);
           }   
           // 第一页时不显示Prev，最后一页时不显示Next
           // if(toPage==1){
           //    $('.page.arrow.prev').hide();
           //    $('.page.arrow.next').show();
           // }else if(toPage==parseInt($('.allpages').html())){
           //    $('.page.arrow.prev').show();
           //    $('.page.arrow.next').hide();         
           // }else{
           //    $('.page.arrow.prev').show();
           //    $('.page.arrow.next').show(); 
           // }            
       });    
    }

    //将文章显示到对应位置
    function showArticle(a_data){
       $('.section-artical article').show();
       for(var i=0;i<a_data.length;i++){
         $('.article-title span').eq(i).html(a_data[i].b_title);
         var type=a_data[i].b_type=='a'?'前端技术':a_data[i].b_type=='b'?'资源分享':a_data[i].b_type=='c'?'生活点滴':a_data[i].b_type=='d'?'涂鸦日志':'总分类';
         $('.article-route .folder').eq(i).html(type);
         $('.article-route .date').eq(i).html(a_data[i].b_date);
         $('.article-content').eq(i).html(marked(a_data[i].b_text));
       }
       for(var j=a_data.length;j<4;j++){
         $('.section-artical article').eq(j).hide();
       }       
    }

    //显示最新发表的12篇文章的标题
    function showReTitles(a_data){
      $('.title-list li').show();
      for(var i=0;i<a_data.length;i++){
        $('.title-list li').eq(i).html(a_data[i].b_title);
      }
      for(var j=a_data.length;j<12;j++){
        $('.title-list li').eq(j).hide();
      }             
    }

    //显示30条文章标题
    function showAllTitles(a_data){
      $('.alltitles .headline').show();      
      for(var i=0;i<a_data.length;i++){
        var type=a_data[i].b_type=='a'?'前端技术':a_data[i].b_type=='b'?'资源分享':a_data[i].b_type=='c'?'生活点滴':a_data[i].b_type=='d'?'涂鸦日志':a_data[i].b_type;
        $('.alltitles .headline .tit').eq(i).html(a_data[i].b_title);
        $('.alltitles .headline .type').eq(i).html('--> '+type);
      }
      for(var j=a_data.length;j<30;j++){
        $('.alltitles .headline').eq(j).hide();
      }       
    }

    //显示单篇文章
    function showOneArticle(a_data,scrolltop){
      $('.section-artical').hide();
      $('.section-onearticle').show();
      $('.section-alltitles').hide(); 
      $('.section-page').hide();
      $('.section-onearticle .article-title span').eq(0).html(a_data.b_title);
      var type=a_data.b_type=='a'?'前端技术':a_data.b_type=='b'?'资源分享':a_data.b_type=='c'?'生活点滴':a_data.b_type=='d'?'涂鸦日志':a_data.b_type;
      $('.section-onearticle .folder').eq(0).html(type);
      $('.section-onearticle .date').eq(0).html(a_data.b_date);
      $('.section-onearticle .article-content').eq(0).html(marked(a_data.b_text));  
      //点击单篇文章返回按钮
      $('.section-onearticle .return').click(function(){
         $(document).scrollTop(scrolltop);
         $('.section-onearticle').hide();
         $('.section-page').show();          
         if($('.section-onearticle').attr('presign')=='title'){
           $('.section-artical').hide();
           $('.section-alltitles').show();           
         }
         if($('.section-onearticle').attr('presign')=='article'){
           $('.section-artical').show();
           $('.section-alltitles').hide();           
         }             
      });        
    }             

    //页码列表实时变化
    function showPageList(toPage,pages){
       if(pages<10){
          for(var i=0;i<pages;i++){
            if(toPage==(i+1)){
               $('.page-list .current').removeClass('current');
               $('.page.number').eq(i).addClass('current');               
            }
          }      
       }
       if(pages>=10){
         if(toPage<=5){
           for(var i=0;i<9;i++){
             var page=i+1;
             $('.page.number').eq(i).html(page);
             if(page==toPage){
               $('.page-list .current').removeClass('current');
               $('.page.number').eq(i).addClass('current');                
             }
           }                        
         }
         if(toPage>5 && toPage<(pages-3)){
           $('.page-list .current').removeClass('current');
           $('.page.number').eq(4).addClass('current');           
           for(var i=0;i<9;i++){
             var page =toPage-4+i;
             $('.page.number').eq(i).html(page);
           }
         }
         if(toPage>=(pages-3) && toPage<=pages){
           for(var i=0;i<9;i++){
             var page=pages-8+i;
             $('.page.number').eq(i).html(page);
             if(page==toPage){
               $('.page-list .current').removeClass('current');
               $('.page.number').eq(i).addClass('current');                
             }
           }
         }
       }
    }
    
});