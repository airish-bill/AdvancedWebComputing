(function($){jQuery.fn.extend({slimScroll:function(options){var defaults={wheelStep:20,width:'auto',height:'250px',size:'7px',color:'#000',position:'right',distance:'1px',start:'top',opacity:.4,alwaysVisible:false,railVisible:false,railColor:'#333',railOpacity:'0.2',railClass:'slimScrollRail',barClass:'slimScrollBar',wrapperClass:'slimScrollDiv',allowPageScroll:false,scroll:0};var o=ops=$.extend(defaults,options);this.each(function(){var isOverPanel,isOverBar,isDragg,queueHide,barHeight,percentScroll,divS='<div></div>',minBarHeight=30,releaseScroll=false,wheelStep=parseInt(o.wheelStep),cwidth=o.width,cheight=o.height,size=o.size,color=o.color,position=o.position,distance=o.distance,start=o.start,opacity=o.opacity,alwaysVisible=o.alwaysVisible,railVisible=o.railVisible,railColor=o.railColor,railOpacity=o.railOpacity,allowPageScroll=o.allowPageScroll,scroll=o.scroll;var me=$(this);if(me.parent().hasClass('slimScrollDiv'))
{if(scroll)
{bar=me.parent().find('.slimScrollBar');rail=me.parent().find('.slimScrollRail');scrollContent(me.scrollTop()+parseInt(scroll),false,true);}
return;}
var wrapper=$(divS).addClass(o.wrapperClass).css({position:'relative',overflow:'hidden',width:cwidth,height:cheight});me.css({overflow:'hidden',width:cwidth,height:cheight});var rail=$(divS).addClass(o.railClass).css({width:size,height:'100%',position:'absolute',top:0,display:(alwaysVisible&&railVisible)?'block':'none','border-radius':size,background:railColor,opacity:railOpacity,zIndex:90});var bar=$(divS).addClass(o.barClass).css({background:color,width:size,position:'absolute',top:0,opacity:opacity,display:alwaysVisible?'block':'none','border-radius':size,BorderRadius:size,MozBorderRadius:size,WebkitBorderRadius:size,zIndex:99});var posCss=(position=='right')?{right:distance}:{left:distance};rail.css(posCss);bar.css(posCss);me.wrap(wrapper);me.parent().append(bar);me.parent().append(rail);bar.draggable({axis:'y',containment:'parent',start:function(){isDragg=true;},stop:function(){isDragg=false;hideBar();},drag:function(e)
{scrollContent(0,$(this).position().top,false);}});rail.hover(function(){showBar();},function(){hideBar();});bar.hover(function(){isOverBar=true;},function(){isOverBar=false;});me.hover(function(){isOverPanel=true;showBar();hideBar();},function(){isOverPanel=false;hideBar();});var _onWheel=function(e)
{if(!isOverPanel){return;}
var e=e||window.event;var delta=0;if(e.wheelDelta){delta=-e.wheelDelta/120;}
if(e.detail){delta=e.detail/3;}
scrollContent(delta,true);if(e.preventDefault&&!releaseScroll){e.preventDefault();}
if(!releaseScroll){e.returnValue=false;}}
function scrollContent(y,isWheel,isJump)
{var delta=y;if(isWheel)
{delta=parseInt(bar.css('top'))+y*wheelStep/100*bar.outerHeight();var maxTop=me.outerHeight()-bar.outerHeight();delta=Math.min(Math.max(delta,0),maxTop);bar.css({top:delta+'px'});}
percentScroll=parseInt(bar.css('top'))/(me.outerHeight()-bar.outerHeight());delta=percentScroll*(me[0].scrollHeight-me.outerHeight());if(isJump)
{delta=y;var offsetTop=delta/me[0].scrollHeight*me.outerHeight();bar.css({top:offsetTop+'px'});}
me.scrollTop(delta);showBar();hideBar();}
var attachWheel=function()
{if(window.addEventListener)
{this.addEventListener('DOMMouseScroll',_onWheel,false);this.addEventListener('mousewheel',_onWheel,false);}
else
{document.attachEvent("onmousewheel",_onWheel)}}
attachWheel();function getBarHeight()
{barHeight=Math.max((me.outerHeight()/me[0].scrollHeight)*me.outerHeight(),minBarHeight);bar.css({height:barHeight+'px'});}
getBarHeight();function showBar()
{getBarHeight();clearTimeout(queueHide);releaseScroll=allowPageScroll&&percentScroll==~~percentScroll;if(barHeight>=me.outerHeight()){releaseScroll=true;return;}
bar.stop(true,true).fadeIn('fast');if(railVisible){rail.stop(true,true).fadeIn('fast');}}
function hideBar()
{if(!alwaysVisible)
{queueHide=setTimeout(function(){if(!isOverBar&&!isDragg)
{bar.fadeOut('slow');rail.fadeOut('slow');}},1000);}}
if(start=='bottom')
{bar.css({top:me.outerHeight()-bar.outerHeight()});scrollContent(0,true);}
else if(typeof start=='object')
{scrollContent($(start).position().top,null,true);if(!alwaysVisible){bar.hide();}}});return this;}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll});})(jQuery);