// 文档加载完毕执行
window.onload = function () {
    var index = 0;
    
    // <div id="healer_banner">
    var healer_banner = document.getElementById('healer_banner');
    // <ul id="helaer_ul">
    var healer_ul = document.getElementById('helaer_ul');
    //其中一条banner
    var healer_ul_firstli = healer_ul.firstElementChild;
    // 将一条banner的高设置为banner模块的高度，使其获取裁切高度
    var li_height = healer_ul_firstli.offsetHeight;

    

    healer_banner.style.height = healer_ul_firstli.offsetHeight + 'px';
    // 当窗口大小变化，图片由于自适应高宽改变，再次依据动态的高度进行裁切
    window.onresize = function () {
        li_height = healer_ul_firstli.offsetHeight;
        healer_banner.style.height = li_height + 'px';
        
        console.log(index*li_height)
        healer_ul.style.top ='-'+ index*li_height +'px';

    }
    
    var helaer_ul_lis = helaer_ul.children;
    // 创建ol
    var helaer_ol = document.createElement('ol');
    helaer_ol.id = 'helaer_ol';
    healer_banner.appendChild(helaer_ol);
    for (var i = 0; i < helaer_ul_lis.length; i++) {
        var helaer_ol_li = document.createElement('li');
        helaer_ol.appendChild(helaer_ol_li);
    }
    var healer_ol_lis = helaer_ol.getElementsByTagName('li');
    healer_ol_lis[index].className = 'current';
//切换
H_promote(true);//true  or  flase

var healer_temp =0;
function H_promote(Desire) {
    console.log(li_height);
    if (!Desire) return;
    var healer_btn = document.createElement('div');
     healer_btn.id = 'healer_btn';
     healer_banner.appendChild(healer_btn);
    var H_promote_btn_turnup = document.createElement('a');
    H_promote_btn_turnup.id = "turnup";
    H_promote_btn_turnup.onclick = function(){
        index++;
        if(index>helaer_ul_lis.length-1){
            index=0;
        }

        // todo
        healer_temp=index*li_height;

        healer_ul.style.top ='-'+ healer_temp +'px';
        healer_ol_li(index);
        console.log(healer_temp,index);
    }
    healer_btn.appendChild(H_promote_btn_turnup);
    var H_promote_btn_turndown = document.createElement('a');
    H_promote_btn_turndown.id = "turndown";
    H_promote_btn_turndown.onclick = function(){
        index--;
        if(index<0){
            index=helaer_ul_lis.length-1;
        }
        healer_temp=index*li_height;
        healer_ul.style.top ='-'+healer_temp +'px';
        console.log(healer_temp,index)
        healer_ol_li(index);
    }
    healer_btn.appendChild(H_promote_btn_turndown);
    // console.log(healer_banner)
}
function healer_ol_li(index){
    
    for(var i=0;i<healer_ol_lis.length;i++){
        healer_ol_lis[i].className = '';
    }
    healer_ol_lis[index].className = 'current';
}
}