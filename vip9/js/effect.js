$(function(){
	// var imgs = [
 //        'img/bg.jpg',
 //        'img/spr-animation1.png',
 //        'img/spr-animation2.png',
 //        'img/spr-animation3.png',
 //        'img/spr-animation4.png',
 //        'img/spr-animation5.png',
 //        'img/spr-animation6.png',
 //        'img/spr-animation7.png',
 //        'img/spr-animation8.png',
 //        'img/spr-animation9.png',
 //        'img/bg-5.jpg',
 //        'img/bg-6.jpg',
 //        'img/bg-7.jpg',
 //        'img/bg-8.jpg',
 //        'img/spr.png',
 //        'img/spr-pendant.png',
 //        'img/spr-star.png'
 //    ];
 //    var index = 0,
 //        len = imgs.length,
 //        progressTxt = $('.xl-progress__txt');

 //    //图片预加载
 //    $.preload(imgs, {
 //        // 是否有序加载
 //        order: false,
 //        minTimer: 3000,
 //        //每加载完一张执行的方法
 //        each: function (count) {
 //            var percent = Math.round((count+1) / len * 100) + '%';
 //            progressTxt.html("loading "+percent);
 //        },
 //        // 加载完所有的图片执行的方法
 //        end: function () {	                
 //            $('.loading').hide();
 //            $(".item-page-animation01").addClass("show");
 //            animation();
 //        }
 //    });


 	var $loadWp=$(".loading");
    var $icLoad=$loadWp.find(".xl-progress__txt");
    var loader={
        imgList:[],
        len: 0,
        cur: 0,
        minTime: 500,
        isTime:false,
        load: function(){
            loader.len=loader.imgList.length;
            if(isCss3){
                setTimeout(function(){
                    loader.isTime=true;
                    if(loader.cur==loader.len){
                        loader.end();
                    }
                },loader.minTime);
            }else{
               loader.isTime=true; 
            }
            for(var i=0;i<loader.imgList.length;i++){
                var img=new Image();
                img.onload=function(){
                    loader.cur++;
                    if(loader.cur==loader.len){
                        loader.range(100);
                        if(loader.isTime){
                            loader.end();
                        }                        
                    }
                    else
                        loader.range();
                }
                img.src=loader.imgList[i];
            }
        },
        range: function(count){
        	count = count || Math.round(loader.cur/loader.len*100);
            // n=n||Math.round(loader.cur/loader.len*100);
            $icLoad.html("loading "+ count +"%");
        },
        end: function(){ 
            $('.loading').hide();
            $(".item-page-animation01").addClass("show");
            animation();
        }
    }
    loader.imgList.push("img/bg.jpg");
    loader.imgList.push("img/spr-animation1.png");
    loader.imgList.push("img/spr-animation2.png");
    loader.imgList.push("img/spr-animation3.png");
    loader.imgList.push("img/spr-animation4.png");
    loader.imgList.push("img/spr-animation5.png");
    loader.imgList.push("img/spr-animation6.png");
    loader.imgList.push("img/spr-animation7.png");
    loader.imgList.push("img/spr-animation8.png");
    loader.imgList.push("img/spr-animation9.png");
    loader.imgList.push("img/bg-5.jpg");
    loader.imgList.push("img/bg-6.jpg");
    loader.imgList.push("img/bg-7.jpg");
    loader.imgList.push("img/bg-8.jpg");
    loader.imgList.push("img/spr.png");
    loader.imgList.push("img/bg-7.jpg");
    loader.imgList.push("img/spr-pendant.png");
    loader.imgList.push("img/spr-pendant.png");

    loader.load();

	//判断是否支持css3
    var isCss3 = function () {
        var style = document.createElement("div").style;
        for (var k in style) {
            if (k.toLowerCase().indexOf("animation") != -1) {
                return true;
            }
        }
        return false;
    }();
    if (!isCss3)
        $("body").addClass("no_css3");

	$.scaleEle({
		select: '.cover-wp',
		width: 1920,
		height: 1080,
		mode: 'cover'
	});

	$.scaleEle({
		select: '.contain-wp',
		width: 1920,
		height: 1080,
		mode: 'contain'
	});

	/* 滑屏 */
    var $pages=$(".list-page-item");
    var $pageBtns=$(".page_btns a");
    var timeSet = [5000, 5000, 5000, 5000];
    var timer;
    var pageControl = {
        cur: 0,
        len: $pages.length,
        isIng: false,
        times: [1000, 1000, 1000, 1000],
        change: function (idx) {
            if (pageControl.isIng || idx < 0 || idx >= pageControl.len)
                return;
            clearTimeout(timer);
            pageControl.isIng = true;
            idx = (idx + pageControl.len) % pageControl.len;
            $pages.removeClass("show hide-wp hide_prev show_prev hide_next  show_next");
            $pageBtns.removeClass("cur").eq(idx).addClass("cur");
            if (idx < pageControl.cur) {
                $pages.eq(pageControl.cur).addClass("hide-wp hide_prev").end().eq(idx).addClass("show show_prev");
            } else {
                $pages.eq(pageControl.cur).addClass("hide-wp hide_next").end().eq(idx).addClass("show show_next");
            }
            pageControl.cur = idx;
            if (isCss3)
                setTimeout(function () {
                    pageControl.isIng = false;
                    // timer = setTimeout(function () {
                    //     pageControl.change((pageControl.cur + 1) % pageControl.len)
                    // }, timeSet[pageControl.cur]);
                }, pageControl.times[idx]);
            else {
                pageControl.isIng = false;
                // timer = setTimeout(function () {
                //     pageControl.change((pageControl.cur + 1) % pageControl.len)
                // }, timeSet[pageControl.cur]);
            }
        }
    }

    $(document).on("mousewheel DOMMouseScroll", function (e) {
        var x = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
        if (x < 0) {
            pageControl.change(pageControl.cur + 1);
        } else {
            pageControl.change(pageControl.cur - 1);
        }
    });

    $pageBtns.on("click", function () {
        pageControl.change($pageBtns.index($(this)));
    });
    pageControl.change(0);

    // 开场动画
    function animation(){

    	var $animation = $(".item-page-animation"),
    		timeSetani = [500,500,500,500,500,500,500,500,1000],
    		timer;
    	var	animationControl = {
    		cur: 0,
	        len: $animation.length,
	        isIng: false,
	        times: [500, 500, 500, 500,500,500,500,500,500],
	        change: function (idx) {
	            if (animationControl.isIng || idx < 0 || idx >= animationControl.len || animationControl.cur >= 8 ){
	            	console.log("end");
	            	
	            	setTimeout(function(){
	            		$(".animation-wp").hide();
	            		$(".cont").show();
	            		$(".page_btns").show();
	            		$(".pendant").show();
	            	},100);
	                return;
	            }
	            clearTimeout(timer);
	            animationControl.isIng = true;
	            idx = (idx + animationControl.len) % animationControl.len;
	            $animation.removeClass("show ");
	            if (idx < animationControl.cur) {
	                $animation.eq(animationControl.cur).addClass("hide-wp").end().eq(idx).addClass("show ");
	            } else {
	                $animation.eq(animationControl.cur).addClass("hide-wp").end().eq(idx).addClass("show ");
	            }
	            animationControl.cur = idx;
	            
                animationControl.isIng = false;
                timer = setTimeout(function () {
                    animationControl.change((animationControl.cur + 1) % animationControl.len)
                }, timeSetani[animationControl.cur]);
	     
	        }

    	};
    	animationControl.change(0);

	}

});