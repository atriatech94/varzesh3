if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");

    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    );

    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{height:device-height!important}"
        )
    );

    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}




/*============================ swipe down function =======================================*/
    (function() {
// initializes touch and scroll events
        var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

 // handles swipeup and swipedown
        $.event.special.swipeupdown = {
            setup: function() {
                var thisObject = this;
                var $this = $(thisObject);

                $this.bind(touchStartEvent, function(event) {
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [ data.pageX, data.pageY ],
                                origin: $(event.target)
                            },
                            stop;

                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }

                        var data = event.originalEvent.touches ?
                                event.originalEvent.touches[ 0 ] :
                                event;
                        stop = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ]
                        };

                        // prevent scrolling
                        if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                            event.preventDefault();
                        }
                    }

                    $this
                            .bind(touchMoveEvent, moveHandler)
                            .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                    Math.abs(start.coords[1] - stop.coords[1]) > 3 &&
                                    Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                        .trigger("swipeupdown")
                                        .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
                });
            }
        };

//Adds the events to the jQuery events special collection
        $.each({
            swipedown: "swipeupdown",
            swipeup: "swipeupdown"
        }, function(event, sourceEvent){
            $.event.special[event] = {
                setup: function(){
                    $(this).bind(sourceEvent, $.noop);
                }
            };
        });

    })();
/*==========================================end swipe down ==================================================*/
$.event.special.swipe.horizontalDistanceThreshold =15;
$(document).bind("pagebeforeshow",'[data-role="page"]',function(){
    $.event.special.swipe.horizontalDistanceThreshold =5;
});

  $('.footer_menu_fix ul li').bind("click",function(){
        $.mobile.changePage("#"+$(this).attr('pages'));
        return false;
    });
	
/*$(document).on('swipeleft', '[data-role="page"]', function(event){    
    if(event.handled !== true) // This will prevent event triggering more then once
    {    
        var nextpage = $(this).next('[data-role="page"]');
        // swipe using id of next page if exists
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
            
        }
        event.handled = true;
    }
    return false;         
});

$(document).on('swiperight', '[data-role="page"]', function(event){   
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
            
        }
        event.handled = true;
    }
    return false;            
});
*/

/*-===============Swper master ===================================-*/


/*-===============End Swper master ===================================-*/
var b = 0 , c= 0 ;
$(document).bind("pagebeforeshow",function(){
    load_new();
    b++;
    load_video();
    c++;
})


/*---------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------*/



  /*                               
    $.mobile.loading( "show", {
        text: "خبری برای نمایش موجود نیست",
          textVisible: true,
           theme: 'b',
           textonly: true,
           html: ""
  });
*/


var offset= 0;
function load_new(){

    if(b==0)
    { 
	  $('#index .loading_img').show(0);
		 $.ajax({ 
			  type: 'GET', 
			  url: 'http://www.atriatech.ir/varzesh3/home/news/hamidamin1394winner/10/'+offset+'', 
			  dataType: 'json',
			  crossDomain: true ,
			  async: true,
			  success: function (data) { 
				  
			   $.each(data, function(index, element)
			   {
				   if(element.itemid == 'null'){
											   
					   $('#index .loading_img').hide(0);
  
					   return false;
					  
				   }
				   
					  $('#index .loading_img').hide(0);
					  var result ='<a param="'+element.itemid+'"  onclick="param_num('+element.itemid+')" ';
					  //result +='  href="news_detail.html?param='+element.itemid+'"  ';
					  result +='href="#popup1" data-rel="popup" data-position-to="window"  data-inline="true" data-transition="pop"';
					  result +='  class="post">';
					  result +='<img src="'+element.img+'">';
					  result +='<h4>'+element.title+'</h4>';
					  result +='</a>';
					  if((index%2) == 0)
					  $('.post_bl .setun1').append(result);
					  else
					  $('.post_bl .setun2').append(result);
					  
			   });// end for each
			  },// end function
			   error: function (xhr, ajaxOptions, thrownError) {
					  $('#index .loading_img').hide(0);
					  $( "#positionWindow" ).popup( "open" );
					  $('#positionWindow p').text("No Internet Access");
					  $('.post_bl').text('No Internet Access');
					}
		  });// end  ajax
  
	  offset = offset + 10;
    }  // end b == 0   
    
   $('.content_scroll').bind('scroll',function(e){ news_scroll();});// end windows scroll
    
}// end function

var sc = 0 ;
function news_scroll(){

    $('.content_scroll').bind('scroll', function() {
      
        //$('.img_center').html($(this).scrollTop());
        
      if($(this).scrollTop() + $(this).innerHeight() >= (this.scrollHeight - 20 ) & $(this).scrollTop() > sc ) {

          $('#index .loading_img').show(0);
  
				 $.ajax({ 
					  type: 'GET', 
					  url: 'http://www.atriatech.ir/varzesh3/home/news/hamidamin1394winner/10/'+offset+'', 
					  dataType: 'json',
					  crossDomain: true ,
					  async: true,
					  success: function (data) { 
						  $.each(data, function(index, element)
						   {
							  if(element.itemid == 'null'){
  
									  //$('.loading_img').hide(0);
									 //  return false;
								  
							   }
								  var result ='<a param="'+element.itemid+'"  onclick="param_num('+element.itemid+')" ';
                                  //result +='  href="news_detail.html?param='+element.itemid+'"  ';
                                  result +='href="#popup1" data-rel="popup" data-position-to="window"  data-inline="true" data-transition="pop"';
								  result +='  class="post">';
								  result +='<img src="'+element.img+'">';
								  result +='<h4>'+element.title+'</h4>';
								  result +='</a>';
								  $('#index .loading_img').hide(0);
								  if((index % 2) == 0)
                                      $('.post_bl .setun1').append(result);
								  else
                                      $('.post_bl .setun2').append(result);
  
						   });// end for each
                        
					  },// end function
					   error: function (xhr, ajaxOptions, thrownError) {
                                $('.loading_img').hide(0);
                                // $( "#positionWindow" ).popup( "open" );
                                // $('#positionWindow p').text("No Internet Access");
                                return false;
							}
				  });// end  ajax
  
            offset = offset + 10;
				  
		   return false;
			
		}// end if
         
        
    });
}

/* end news_scroll*/

var param = 'null' ;
function param_num(num)
{
  //  $('*#popup1-placeholder , *#popup1-popup').remove();

    
        $( '#popup1' ).bind({
            popupafteropen: function()
            {
               
               
                
                
            },popupafterclose:function()
            {
               
               
            }
            
        });
    
    
    $('#popup1-popup').hide();
    $.mobile.loading( "show");
    
    param = num;
   
       
        $.ajax({ 
			type: 'GET', 
			url: 'http://atriatech.ir/varzesh3/home/news_detail/hamidamin1394winner/'+param+'', 
			dataType: 'json',
			crossDomain: true ,
			async: true,
			success: function (data) { 
						var result ='<h3>'+data[0].title+' </h3>';
						result +='<img src="'+data[0].img+'">';
						result +='<div class="content_text">'+data[0].long_des+'<div>';
                        $('.news_head h1').text('').text(data[0].title);
						$('.blog_detail').html('').append(result);
                        $.mobile.loading( "hide");
                        $('#popup1-popup').show();
			}
		});
            $.mobile.activePage.find('.blog_detail').html('amin');
            $("#popup1").popup({transition: "pop"}).popup("open"); 
            return false;
		
  
    
}

$(document).bind("pagebeforeshow",'[news="true"]',function(){
    $('.loading_swdw').hide();
     var scrolled2=0;
    $('.content_scroll').on('swipedown',function(){
        if($(this).scrollTop() == 0 ){
            
           param = $('.setun1 .post:eq(0)').attr('param');
           $('.loading_swdw').show();
             $.ajax({ 
					  type: 'GET', 
					  url: 'http://www.atriatech.ir/varzesh3/home/news_update/hamidamin1394winner/'+param+'', 
					  dataType: 'json',
					  crossDomain: true ,
					  async: true,
					  success: function (data) { 
                          console.log(data);
						  $.each(data, function(index, element)
						   {
                               
							  if(element.itemid == 'null'){
                                  
								    $('.loading_swdw').hide();
                                    return false;
								  
							   }
								  var result ='<a param="'+element.itemid+'"  onclick="param_num('+element.itemid+')" ';
                                  //result +='  href="news_detail.html?param='+element.itemid+'"  ';
                                  result +='href="#popup1" data-rel="popup" data-position-to="window"  data-inline="true" data-transition="pop"';
								  result +='  class="post">';
								  result +='<img src="'+element.img+'">';
								  result +='<h4>'+element.title+'</h4>';
								  result +='</a>';
								  $('.loading_swdw').hide();
								  if((index % 2) == 0)
								  $('.post_bl .setun1').prepend(result);
								  else
								  $('.post_bl .setun2').prepend(result);
  
						   });// end for each
					  },// end function
					   error: function (xhr, ajaxOptions, thrownError) {
							$('.loading_swdw').show();
						 // $( "#positionWindow" ).popup( "open" );
						 // $('#positionWindow p').text("No Internet Access");
					   
							}
				  });// end  ajax
           
        }else{// end if
            scrolled2 = scrolled2 - 400;
            $('.content_scroll').animate({
                scrollTop:  scrolled2
            });
        }// end else
    });
    var scrolled=0;
    $('.content_scroll').on('swipeup',function(){
            scrolled = scrolled + 400 ;
            $('.content_scroll').animate({
				        scrollTop:  scrolled
				   });
    
    } );

});
/*========================================VIDEO=========================================================*/
var offsetv= 0;
function load_video(){

    if(c==0)
    { 
	  $('#video .loading_img').show(0);
		 $.ajax({ 
			  type: 'GET', 
			  url: 'http://www.atriatech.ir/varzesh3/video/news_load/hamidamin1394winner/10/'+offsetv+'', 
			  dataType: 'json',
			  crossDomain: true ,
			  async: true,
			  success: function (data) { 
				   console.log(data);
			   $.each(data, function(index, element)
			   {
				   if(element.itemid == 'null'){
					   $('#video .loading_img').hide(0);
					   return false;
				   }
				   
					  $('#video.loading_img').hide(0);
					  var result ='<a href="#popupVideo" data-rel="popup"  onclick="vide_detail('+element.video_id+');" vid="'+element.video_id+'" vsrc="'+element.video_src+'" data-position-to="window" class="videos"  >';
                        result +='<img src="'+element.video_img+'" /><span>'+element.video_title+'</span></a>';
					 
					  if((index%2) == 0)
					  $('.videolists .video_p1').append(result);
					  else
					  $('.videolists .video_p2').append(result);
					  
			   });// end for each
                  
			  },// end function
			   error: function (xhr, ajaxOptions, thrownError) {
					 // $('.loading_img').hide(0);
					 // $( "#positionWindow" ).popup( "open" );
					 // $('#positionWindow p').text("No Internet Access");
					 // $('.post_bl').text('No Internet Access');
                   return false;
					}
		  });// end  ajax
        
        offsetv = offsetv + 10;
	 
    }  // end b == 0   
    
   $('.videolists').bind('scroll',function(e){ video_scroll();});// end windows scroll
    
}// end function

function video_scroll()
{

    $('.videolists').bind('scroll', function() {
      
        //$('.img_center').html($(this).scrollTop());
        
      if($(this).scrollTop() + $(this).innerHeight() >= (this.scrollHeight - 20 ) & $(this).scrollTop() > sc ) {

          $('#index .loading_img').show(0);
  
				 $.ajax({ 
                  type: 'GET', 
                  url: 'http://www.atriatech.ir/varzesh3/video/news_load/hamidamin1394winner/10/'+offsetv+'', 
                  dataType: 'json',
                  crossDomain: true ,
                  async: true,
                  success: function (data) { 

                   $.each(data, function(index, element)
                   {
                       if(element.itemid == 'null'){
                           $('#video .loading_img').hide(0);
                           return false;
                       }

                          $('#video.loading_img').hide(0);
                          var result ='<a href="#popupVideo" data-rel="popup" onclick="vide_detail('+element.video_id+');" vid="'+element.video_id+'"  vsrc="'+element.video_src+'" data-position-to="window" class="videos"  >';
                            result +='<img src="'+element.video_img+'" /><span>'+element.video_title+'</span></a>';

                          if((index%2) == 0)
                          $('.videolists .video_p1').append(result);
                          else
                          $('.videolists .video_p2').append(result);

                   });// end for each
                      
                      
                      
                  },// end function
                   error: function (xhr, ajaxOptions, thrownError) {
                         // $('.loading_img').hide(0);
                         // $( "#positionWindow" ).popup( "open" );
                         // $('#positionWindow p').text("No Internet Access");
                         // $('.post_bl').text('No Internet Access');
                          return false;
                        }
              });// end  ajax

            offsetv = offsetv + 10;
				  
		   return false;
			
		}// end if
         
        
    });
}
function vide_detail(video_id){
   
    //vsrc = $("a[vid='"+video_id+"']").attr("vsrc");
    $('#video_frame').attr("src","");
    $('#video_frame').attr("src","http://atriatech.ir/varzesh3/video/play/"+video_id);
    //var so = cordova.plugins.screenorientation;
    //so.setOrientation(so.Orientation.LANDSCAPE);
  
    //window.plugins.videoPlayer.play(vsrc);

}
$('.close_video').bind("click",function(){
    
    $("*#popupVideo").popup('close');
    $("*#popupVideo").popup('close');
});


/*----=======================score=================================----*/

$('.table_last').click(function(){
    $('#live_score').show();
    $('.lig_table').hide();
     live_score();
    
});
//

function live_score()
{
    $.mobile.loading( "show");
    
        $.ajax({ 
			  type: 'GET', 
			  url: 'http://www.atriatech.ir/varzesh3/live/diruz/hamidamin1394winner/', 
			  dataType: 'json',
			  crossDomain: true ,
			  async: true,
			  success: function (data) { 
				  
                  $('#live_score').html(data);
                  $('*.more').attr("onclick","more_score(this);");
                  $.mobile.loading( "hide");
			  },// end function
			   error: function (xhr, ajaxOptions, thrownError) {
					 // $('.loading_img').hide(0);
					 // $( "#positionWindow" ).popup( "open" );
					 // $('#positionWindow p').text("No Internet Access");
					 // $('.post_bl').text('No Internet Access');
                   return false;
					}
		  });// end  ajax


}
last_id = 0 ; 
function more_score(element){
    
    var id =element.getAttribute("data-identity");
    if(id != last_id)
    {
        $('*.item .more-info').parent().slideUp();
        $('.item .more-info[data-identity="'+id+'"]').parent().slideDown();
        last_id = id;
    }
    
}
/*----=======================end score=============================----*/

/*----=======================live_match=================================----*/


live_match();

function live_match()
{
        $.ajax({ 
			  type: 'GET', 
			  url: 'http://www.atriatech.ir/varzesh3/live/index/hamidamin1394winner/', 
			  dataType: 'json',
			  crossDomain: true ,
			  async: true,
			  success: function (data) { 
				  
                  $('#live_score2').html(data);
                  $('*.more').attr("onclick","more_score(this);");
                  
			  },// end function
			   error: function (xhr, ajaxOptions, thrownError) {
					 // $('.loading_img').hide(0);
					 // $( "#positionWindow" ).popup( "open" );
					 // $('#positionWindow p').text("No Internet Access");
					 // $('.post_bl').text('No Internet Access');
                   return false;
					}
		  });// end  ajax


}
last_id = 0 ; 

/*----=======================end score=============================----*/
/*----=======================start leag=============================----*/

$('.iran_lig ,.spain_lig ,.german_lig ,.uk_lig ,.italy_lig ,.french_lig').click(function(){
    $('#live_score').hide();
    $.mobile.loading( "show");
    $('.lig_table .detail').html(" ");
   var lega = $(this).attr('id');
   
     $.ajax({ 
			  type: 'GET', 
			  url: "http://atriatech.ir/varzesh3/lege/index/"+lega+"/hamidamin1394winner", 
			  dataType: 'json',
			  crossDomain: true ,
			  async: true,
			  success: function (data) { 
                    $('.lig_table .detail').html(data);
                    $.mobile.loading( "hide");
                     $('.lig_table').show();
              },// end function
			   error: function (xhr, ajaxOptions, thrownError) {
					 // $('.loading_img').hide(0);
					 // $( "#positionWindow" ).popup( "open" );
					 // $('#positionWindow p').text("No Internet Access");
					 // $('.post_bl').text('No Internet Access');
                   return false;
					}
		  });// end  ajax
    
    
});
/*----=======================end leag=============================----*/
