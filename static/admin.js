$(function(){

   //设置底部发布按钮相对视口位置不变
   $('.article-publish').css('top',$(window).height()-55+'px');
   $(window).resize(function(){
      $('.article-publish').css('top',$(window).height()-55+'px');    
   });

   //编辑模式切换
   $('.mode-button.edit').click(function(){
      $('.mode-button a').eq(2).css('background-position-y','-20px');
      $('.mode-button a').eq(1).css('background-position-y','0px');
      $('.mode-button a').eq(0).css('background-position-y','0px');
      $('.area.editor').css('width','100%').css('border-right','none');    
      $('.area.preview').css('width',0);
   });

   //实况模式切换
   $('.mode-button.edit-preview').click(function(){
      $('.mode-button a').eq(2).css('background-position-y','0px');
      $('.mode-button a').eq(1).css('background-position-y','-20px');
      $('.mode-button a').eq(0).css('background-position-y','0px');   
      $('.area.editor').css('width','50%').css('border-right','1px solid #ccc');
      $('.area.preview').css('width','50%');           
   });

   //预览模式切换
   $('.mode-button.preview').click(function(){
      $('.mode-button a').eq(2).css('background-position-y','0px');
      $('.mode-button a').eq(1).css('background-position-y','0px');
      $('.mode-button a').eq(0).css('background-position-y','-20px');   
      $('.area.editor').css('border-right','none').css('width',0);
      $('.area.preview').css('width','100%');           
   }); 

   //设置工具栏效果
   $('.editor-toolbar a').hover(function(){
      if($(this).css('background-position-y')!='-20px'){
        $(this).css('background-position-y','-40px');
      }    
   },function(){
      if($(this).css('background-position-y')!='-20px'){
        $(this).css('background-position-y','0px');
      }         
   });       

   //加粗
   $('.menu-button.overstrik').click(function(){
      $('.editblog').val($('.editblog').val()+'**加粗文字**');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-6,$('.editblog').val().length-2);
   });

   //斜体
   $('.menu-button.italic').click(function(){
      $('.editblog').val($('.editblog').val()+'*斜体文字*');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-5,$('.editblog').val().length-1);
   });

   //链接
   $('.menu-button.link').click(function(){
      $('.editblog').val($('.editblog').val()+'<http://链接网址>');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-5,$('.editblog').val().length-1);
   });

   //引用
   $('.menu-button.quote').click(function(){
      $('.editblog').val($('.editblog').val()+'> 引用文字');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-4,$('.editblog').val().length);
   });

   //代码
   $('.menu-button.code').click(function(){
      $('.editblog').val($('.editblog').val()+'```\r\n请输入代码\r\n```');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-9,$('.editblog').val().length-4);
   });

   //图片
   $('.menu-button.image').click(function(){
      $('.editblog').val($('.editblog').val()+'![](图片地址)');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-5,$('.editblog').val().length-1);
   });

   //数字列表
   $('.menu-button.figure-list').click(function(){
      $('.editblog').val($('.editblog').val()+'1. 列表项目\r\n');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-5,$('.editblog').val().length-1);
   });

   //普通列表
   $('.menu-button.common-list').click(function(){
      $('.editblog').val($('.editblog').val()+'- 列表项目\r\n');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-5,$('.editblog').val().length-1);
   });

   //标题
   $('.menu-button.title').click(function(){
      $('.editblog').val($('.editblog').val()+'### 标题文字 ###');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-8,$('.editblog').val().length-4);
   });

   //分割线
   $('.menu-button.parting-line').click(function(){
      $('.editblog').val($('.editblog').val()+'\r\n------');
      $('.previewblog').html(marked($('.editblog').val()));
      setTextSelected($('.editblog').get(0),$('.editblog').val().length-7,$('.editblog').val().length);
   });

   //撤销-重做
   function repeal_reform(){
      var replog = [''];
      var reflog = [''];
      var txt = window.setInterval(function(){
          if (replog[replog.length - 1] != $('.editblog').val()){
             replog[replog.length] = $('.editblog').val();
             if($.inArray($('.editblog').val(),reflog,replog.length-2)==-1){
                reflog[reflog.length] = $('.editblog').val();
             }             
          }
          if(replog.length>1){
             $('.menu-button.repeal a').css('background-position-y','0px');
          }else{
             $('.menu-button.repeal a').css('background-position-y','-20px');
          }          
      }, 1500);
      //点击按钮撤销
      $('.menu-button.repeal').click(function(){
          replog.pop();
          $('.editblog').val(replog[replog.length - 1]).blur();
          $('.previewblog').html(marked($('.editblog').val()));
          $('.menu-button.reform a').css('background-position-y','0px');
      });
      //点击按钮重做
      $('.menu-button.reform').click(function(){
        if(replog.length!=reflog.length){
           $('.editblog').val(reflog[replog.length]).blur();
           $('.previewblog').html(marked($('.editblog').val()));          
        }else{
           $('.menu-button.reform a').css('background-position-y','-20px');
        }
      });                                
   }
   repeal_reform();

   //Markdown语法
   $('.menu-button.mgrammar').click(function(){
     
   });

   //设置预览效果
   $('.editblog').on('keyup focus',function(){
      $('.previewblog').html(marked($(this).val()));
   }); 

   //全屏
   $('.mode-button.full-screen').click(function(){
      if($('.article-publish').css('display')=='block'){
          $('.full-screen a').css('background-position','-260px 0px');
          $('.full-screen').attr('title','退出全屏');
          $('body').css('overflow','hidden');
          $('.article-text').css({
             'position':'fixed',
             'top':0,
             'left':0,
             'width':$(window).width(),
             'height':$(window).height()
          });
          $('.editor-area').css('height',$(window).height()-31);
          $('.article-publish').hide();        
      }else if($('.article-publish').css('display')=='none'){
          $('.full-screen a').css('background-position','-240px 0px');
          $('.full-screen').attr('title','全屏');
          $('body').css('overflow','auto');
          $('.article-text').css({
             'position':'static',
             'width':'100%',
             'height':'453px'
          });
          $('.editor-area').css('height','420px');
          $('.article-publish').show();            
      }
   });

   //设置文本选中高亮
   function setTextSelected(inputDom, startIndex, endIndex){
      if (inputDom.setSelectionRange){
         inputDom.setSelectionRange(startIndex, endIndex); 
      }else if(inputDom.createTextRange){ //IE
         var range = inputDom.createTextRange(); 
         range.collapse(true); 
         range.moveStart('character', startIndex); 
         range.moveEnd('character', endIndex - startIndex-1); 
         range.select();
      } 
      inputDom.focus(); 
   }

   // 锁屏功能
   $('.publish-button').click(function(){
       $('body').css('overflow','hidden');
       $('#screen').css({//遮罩画布
          'width':$(window).width(),
          'height':$(window).height()
       }).show();
       $('.confirm-publish').css({//提示框居中
          'top':($(window).height()-150)/2-80,
          'left':($(window).width()-300)/2
       }).show();
   });

   //取消发布博文
   $('.btn.cancel').click(function(){
       $('#screen').hide();
       $('.confirm-publish').hide();
       $('body').css('overflow','auto');
   });

   //确认发布博文
   $('.btn.confirm').click(function(){  
        var myDate = new Date();
        var dateNow = myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate();
        $.ajax({
            type:'post',
            url:'//localhost:3000/addArticle',
            data:{
                b_title:$('.mytitle').val(),
                b_type:$('.myblogtype').val(),
                b_tag:$('.myblogtag').val(),
                b_text:$('.editblog').val(),
                b_date:dateNow,
            }
        })             
        .then(function(data){
            console.log(data);
            $('#screen').hide();
            $('.confirm-publish').hide();
            $('body').css('overflow','auto');
            window.location.href='http://localhost:3000/index';            
        });
   });





});