
$(function () {


    //参数设置
    var healer_Ban = {
        H_promote: true,//是否加入切换按钮 ： true  or  flase
        DoT: true,//圆点按钮
        autoplay: true,//是否自动轮播
        palyStyle:'toBottom',//'toTop' 滑动方向向上  'toBottom' 滑动方向向下
        playEasing:'swing', //"swing"慢快慢   "linear"匀速移动
        playDelayed: 3000,//切换延时
        playSpend: 800,//切换速度
    }



    // <div id="healer_banner">
    var healer_banner = $('#healer_banner');
    // <ul id="helaer_ul">
    var healer_ul = $('#helaer_ul');
    //其中一条banner
    var hr_ul_firstli = $('#helaer_ul>li:first');
    //获取一条banner（li）的高
    var li_height = $('#helaer_ul>li:first').height();
    //设置盒子高度
    healer_banner.css('height', li_height);

    //由于图片自适应，动态获取li的高，设置给盒子
    $(window).on('resize', function () {
        li_height = $('#helaer_ul>li:first').height();
        healer_banner.css('height', li_height);
    })

    var hr_ul_lis = healer_ul.children();

    //当前banner索引
    var h_index = 0;
    var helaer_ol;

    if (healer_Ban.DoT) {
        //插入helaer_ol，制作圆点列表
        $('<ol id="helaer_ol"></ol>').appendTo(healer_banner);
        helaer_ol = $('#helaer_ol');
        for (var i = 0; i < hr_ul_lis.length; i++) {
            $('<li></li>').appendTo(helaer_ol);
        }
        var hr_ol_lis = helaer_ol.children();
        //设置ol>li初始样式
        changeDoT(h_index);
    }



    //设置圆点样式
    function changeDoT(h_index) {
        $(hr_ol_lis[h_index]).addClass('current').siblings().removeClass('current');
    }



    //切换按钮
    if (healer_Ban.H_promote) {
        //插入healer_btn，制作上下切换按钮
        $('<div id="healer_btn"><a id="turnup"></a><a id="turndown"></a></div>')
            .appendTo(healer_banner);
    }



    // 按钮点击事件
    $('#turnup').click(function(){
        Hr_animateTop();
    })
    $('#turndown').click(function(){
        Hr_animateBottom()
    })


    //圆点点击事件
    $('#helaer_ol').on('click','li',function(e){
        //获取索引值
        h_indexx = $(this).index();

    })


    //定时器
    var timer;
    //创建定时器
    function H_autoplay(){
        timer  = setInterval(function () {
            healer_Ban.palyStyle =='toBottom'?Hr_animateBottom():Hr_animateTop();
        }, healer_Ban.playDelayed);
    }


    // 向上轮播动画
    function Hr_animateTop() {
        $(healer_ul).animate({
            marginTop: -li_height
        }, healer_Ban.playSpend,healer_Ban.playEasing,function () {
            h_index++;
            if (h_index > hr_ul_lis.length - 1) {
                h_index = 0;
            }
            changeDoT(h_index);
            $(healer_ul).css('margin-top', 0);
            $('#helaer_ul>li:first').appendTo('#helaer_ul');
        });
    }


    //向下轮播动画
    function Hr_animateBottom() {
        $('#helaer_ul>li:last').prependTo('#helaer_ul');
        $(healer_ul).css('margin-top', -li_height);
        $(healer_ul).animate({
            marginTop: 0
        }, healer_Ban.playSpend,healer_Ban.playEasing,function () {
            h_index--;
            if (h_index < 0) {
                h_index = hr_ul_lis.length - 1;
            }
            changeDoT(h_index);  
        });
    }



    //自动轮播
    if (healer_Ban.autoplay) {
        H_autoplay();
        
        $(healer_banner).on('mouseenter',function(){
            clearInterval(timer);
        })
        $(healer_banner).on('mouseleave',function(){
            H_autoplay();
        })
    }
    
})