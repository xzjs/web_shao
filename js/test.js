$(function(){
    //=========设置参数==========
    //图片统一高度：
    var images_height = '100%';
    //图片路径/链接(数组形式):
    var images_url = [
        'img/test_1.jpg',
        'img/test_2.jpg',
        'img/test_3.jpg',
        'img/test_4.jpg',
        'img/test_5.jpg',
        'img/test_6.jpg'
    ];
    var images_count = images_url.length;
    //console.log(images_count);

    //创建节点
    //图片列表节点
    for(var j=0;j<images_count+1;j++){
        $('.working-bg ul').append('<li></li>');
    }
    //载入图片
    $('.working-bg ul li').css('background-image','url('+images_url[0]+')');
    $.each(images_url,function(key,value){
        $('.working-bg ul li').eq(key).css('background-image','url('+value+')');
    });

    $('.working-bg').css('height',images_height);

    $('.working-bg ul').css('width',(images_count+1)*100+'%');

    //=========================

    var num = 0;
    //获取窗口宽度
    var window_width = $(window).width();
    $(window).resize(function(){
        window_width = $(window).width();
        $('.working-bg ul li').css({width:window_width});
        clearInterval(timer);
        nextPlay();
        timer = setInterval(nextPlay,3600);
    });
    $('.working-bg ul li').width(window_width);
    //轮播圆点
    $('#working .cir').click(function(){//用hover的话会有两个事件(鼠标进入和离开)
        $(this).addClass('current').siblings().removeClass('current');
        //第一张图： 0 * window_width
        //第二张图： 1 * window_width
        //第三张图： 2 * window_width
        //获取当前编号
        var i = $(this).index()-2;
        $('.working-bg ul').stop().animate({left:-i*window_width},500);
        num = i;
        clearInterval(timer);
        timer=setInterval(nextPlay,3600);
    });
    //自动播放
    var timer = null;
    function prevPlay(){
        num--;
        if(num<0){
            //悄悄把图片跳到最后一张图(复制页,与第一张图相同),然后做出图片播放动画，left参数是定位而不是移动的长度
            $('.working-bg ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},500);
            num=images_count-1;
        }else{
            $('.working-bg ul').stop().animate({left:-num*window_width},500);
        }
        if(num==images_count-1){
            $('#working .cir').eq(images_count-1).addClass('current').siblings().removeClass('current');
        }else{
            $('#working .cir').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    function nextPlay(){
        num++;
        if(num>images_count){
            //播放到最后一张(复制页)后,悄悄地把图片跳到第一张,因为和第一张相同,所以难以发觉,
            $('.working-bg ul').css({left:0}).stop().animate({left:-window_width},500);
            //css({left:0})是直接悄悄改变位置，animate({left:-window_width},500)是做出移动动画
            //随后要把指针指向第二张图片,表示已经播放至第二张了。
            num=1;
        }else{
            //在最后面加入一张和第一张相同的图片，如果播放到最后一张，继续往下播，悄悄回到第一张(肉眼看不见)，从第一张播放到第二张
            //console.log(num);
            $('.working-bg ul').stop().animate({left:-num*window_width},500);
        }
        if(num==images_count){
            $('#working .cir').eq(0).addClass('current').siblings().removeClass('current');
        }else{
            $('#working .cir').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    timer = setInterval(nextPlay,3600);

    //播放下一张
    $('.working-bg .right').click(function(){
        nextPlay();
    });
    //返回上一张
    $('.working-bg .left').click(function(){
        prevPlay();
    });
});