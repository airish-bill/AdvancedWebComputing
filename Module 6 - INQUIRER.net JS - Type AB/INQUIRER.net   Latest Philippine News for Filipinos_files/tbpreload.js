if(typeof FNH=="undefined"){var FNH={}}var base64={};base64.PADCHAR="=";base64.ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";base64.getbyte64=function(c,b){var a=base64.ALPHA.indexOf(c.charAt(b));if(a==-1){throw"Cannot decode base64"}return a};base64.decode=function(k){k=""+k;var f=base64.getbyte64;var a,e,b;var c=k.length;if(c==0){return k}var h=c%4==0?0:4-c%4;for(var d=0;d<h;d++){k=k+base64.PADCHAR}c=k.length;a=0;if(k.charAt(c-1)==base64.PADCHAR){a=1;if(k.charAt(c-2)==base64.PADCHAR){a=2}c-=4}var g=[];for(e=0;e<c;e+=4){b=(f(k,e)<<18)|(f(k,e+1)<<12)|(f(k,e+2)<<6)|f(k,e+3);g.push(String.fromCharCode(b>>16,(b>>8)&255,b&255))}switch(a){case 1:b=(f(k,e)<<18)|(f(k,e+1)<<12)|(f(k,e+2)<<6);g.push(String.fromCharCode(b>>16,(b>>8)&255));break;case 2:b=(f(k,e)<<18)|(f(k,e+1)<<12);g.push(String.fromCharCode(b>>16));break}return g.join("")};base64.getbyte=function(c,b){var a=c.charCodeAt(b);if(a>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return a};FNH.TBInsertion=function(){this.INSERTION="insertion";this.TOOLBAR_DATA_TAG="TBData";this.TOOLBAR_DATA_ITEM_TAG="TBDataItem";this.NAME_ATTRIBUTE="name";this.VALUE_ATTRIBUTE="value";this.tbData=null;var a=function(c,d){var b="log";if(typeof d!="undefined"){b=d}if((typeof window.console!="undefined")&&(typeof window.console[b]==="function")){window.console[b](c)}};this.parseTBData=function(d){if(!d){return false}if(!window.atob){window.atob=base64.decode}d=window.atob(d);try{if(window.DOMParser){var f=new DOMParser();b=f.parseFromString(d,"text/xml")}else{var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(d)}response=this.parseDataXML(b,this.TOOLBAR_DATA_TAG,this.TOOLBAR_DATA_ITEM_TAG,this.NAME_ATTRIBUTE,this.VALUE_ATTRIBUTE);this.tbData=response;a("TBInsertion.parseTBData: toolbarData parsed","log");return response}catch(c){a("TBInsertion.parseTBData: unable to parse toolbarData ("+d+"). "+c,"warn")}};this.getAttributeFromTBData=function(b){if(!this.tbData){a("TBInsertion.getInsertionFromTBData: tbData does not exist","log");return null}return this.tbData[b]};this.parseDataXML=function(e,l,k,f,c){var j=new Object();var b;if(e&&e.firstChild&&e.firstChild.tagName==l){if(e.firstChild.children){b=e.firstChild.children}else{b=e.firstChild.childNodes}}if(b){for(var d=0;d<b.length;d++){if(b[d].tagName!=k){continue}var h=b[d].getAttribute(f);var g=b[d].getAttribute(c);j[h]=unescape(g)}}return j};this.createElement=function(c,e,b){var d=undefined;if(!c){a("TBInsertion.createElement: failed to create element - type is missing","warn");return undefined}d=document.createElement(c);if(d){if(e&&e.length>0){d.setAttribute("id",e)}else{a("TBInsertion.createElement: failed to create iFrame for id: "+e,"warn");return undefined}if(b&&b.length>0){d.setAttribute("src",b)}}a("TBInsertion.createElement: created element - type:"+c+", id:"+e+", src:"+b,"log");return d};this.createIframeElement=function(d,b){var c=undefined;if(b&&b.length>0){c=this.createElement("iframe",d,b)}else{a("TBInsertion.createIframeElement: failed to create iFrame id:"+d+", for source: ["+b+"]","warn");return undefined}if(typeof c!="undefined"){c.style.display="none";c.setAttribute("target","_blank");c.setAttribute("frameborder","0");c.frameBorder="no"}return c}};