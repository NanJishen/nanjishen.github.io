var items=["Copy","Share","Delete"],menu=null,callback_func=null,element=null;function show_cmenu(e,n){document.body.appendChild(menu),$("#menu").css("left",e.clientX+window.scrollX+"px").css("top",e.clientY+window.scrollY+"px"),$("#menu").fadeIn(),callback_func=n,element=e.target}function hide_cmenu(){$("#menu").remove()}function item_click({target:e}){e=e.dataset.func;callback_func(e,element)}$(document).ready(function(){(menu=document.createElement("div")).classList.add("cmenu"),menu.id="menu";for(var e=document.createElement("ul"),n=0;n<items.length;n++){var t=document.createElement("li");t.dataset.func=items[n],t.onclick=item_click,t.appendChild(document.createTextNode(items[n])),e.appendChild(t)}menu.appendChild(e)});