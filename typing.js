(function(){
  var SAMPLES={zh:"天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。",en:"The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly."};
  var cur="zh",start=null,timer=null,finished=false;
  function $(id){return document.getElementById(id);}
  var target=$("tt-target"),input=$("tt-input");
  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function render(){var t=SAMPLES[cur],typed=input.value,h="";
    for(var i=0;i<t.length;i++){var c=esc(t[i]);
      if(i<typed.length){h+=(typed[i]===t[i])?'<span class="ok">'+c+'</span>':'<span class="bad">'+c+'</span>';}
      else if(i===typed.length){h+='<span class="cur">'+c+'</span>';}
      else{h+=c;}}
    target.innerHTML=h;}
  function stats(){if(!start)return;var sec=(Date.now()-start)/1000;$("tt-time").textContent=sec.toFixed(1);
    var t=SAMPLES[cur],typed=input.value,correct=0,err=0;
    for(var i=0;i<typed.length;i++){if(i<t.length&&typed[i]===t[i])correct++;else err++;}
    var min=Math.max(sec/60,1/600);var gross=(typed.length/5)/min;var net=Math.max(0,gross-(err/min));
    var acc=typed.length?Math.round(correct/typed.length*100):100;
    $("tt-wpm").textContent=Math.round(gross);$("tt-net").textContent=Math.round(net);
    $("tt-acc").textContent=acc;$("tt-err").textContent=err;}
  function reset(){input.value="";start=null;finished=false;if(timer){clearInterval(timer);timer=null;}
    input.disabled=false;$("tt-time").textContent="0.0";$("tt-wpm").textContent="0";
    $("tt-net").textContent="0";$("tt-acc").textContent="100";$("tt-err").textContent="0";
    var dn=$("tt-done");if(dn){dn.style.display="none";}render();}
  function finish(){finished=true;if(timer){clearInterval(timer);timer=null;}stats();input.disabled=true;
    var dn=$("tt-done");if(dn&&window.TT_DONE){dn.textContent=window.TT_DONE;dn.style.display="block";}}
  input.addEventListener("input",function(){if(finished)return;
    if(!start){start=Date.now();timer=setInterval(stats,100);}
    render();stats();if(input.value.length>=SAMPLES[cur].length)finish();});
  var ns=document.querySelectorAll("[data-sample]");
  for(var k=0;k<ns.length;k++){ns[k].addEventListener("click",(function(b){return function(){
    cur=b.getAttribute("data-sample");reset();input.focus();};})(ns[k]));}
  var rb=$("tt-restart");if(rb)rb.addEventListener("click",function(){reset();input.focus();});
  reset();
})();
