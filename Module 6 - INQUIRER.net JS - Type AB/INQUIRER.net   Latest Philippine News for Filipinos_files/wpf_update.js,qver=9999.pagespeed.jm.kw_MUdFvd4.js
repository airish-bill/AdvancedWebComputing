function wpf_load()
{if(document.cookie){a=document.cookie;cookiename=a.substring(0,a.indexOf('='));if(a.indexOf(';')!=-1){cookiewert=a.substring(a.indexOf('=')+1,a.indexOf(';'));}else{cookiewert=a.substr(a.indexOf('=')+1,a.length);}
if(cookiename=='location')
document.getElementById("wpf_selector").value=cookiewert;}
wpf_update();}
function wpf_update()
{var newloc=document.getElementById("wpf_selector").value;var siteuri=document.getElementById("wpf_selector_site").value;var language=document.getElementById("wpf_language").value;var expire=new Date();expire=new Date(expire.getTime()+1000*60*60*24*365);document.cookie=escape("location="+newloc)+'; expires='+expire.toGMTString()+';';jQuery.get(siteuri+"/wp-forecast-show.php",{wpfcid:newloc,header:"0",selector:"1",language_override:language},function(data){jQuery("div#wp-forecastA").html(data);});}
window.onDomReady=initReady;function initReady(fn)
{if(document.addEventListener){document.addEventListener("DOMContentLoaded",fn,false);}
else{document.onreadystatechange=function(){readyState(fn);};}}
function readyState(func)
{if(document.readyState=="interactive"||document.readyState=="complete")
{func();}}