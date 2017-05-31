$(function(){
/******************加载网页公共顶部*********************/
	$(".topHtml").load("html/common/topHtml.html .topHtmlContainer");
	$.getScript("js/topHtml_search.js");
/*****************加载网页公共顶部 End*******************/

/*********************头部搜索栏**********************/
	$(".headerSeach_text").focus(function(){
		$(".headerSeach_dropDown").addClass("show");
	});
	$(".headerSeach_text").blur(function(){
		$(".headerSeach_dropDown").removeClass("show");
	});
/*********************头部搜索栏 End**********************/

/*********************首页导航栏**********************/
	$.getJSON("jason_data/index/menuHorizontal.json", function(data){
		for(var i = 0, len = data.length; i < len; i++){
			var $li = $("<li class='navItem'></li>");
			var $a = $("<a></a>");
			$a.attr("href",data[i].url).text(data[i].name);
			$li.append($a);
			$(".navContain").append($li);
		}
		var $img = $("<img src='img/wanletag.gif' width='37' height='12'>");
		var $em = $("<em></em>");
		$em.append($img);
		$(".navContain a").eq(2).append($em);
	});
/*********************首页导航栏 End**********************/

/********************首页轮播图区域**********************/
	$.getJSON("jason_data/index/banner.json", function(data){
		var j = 0,
			index = 0,
			leftP = 0;
		for(var i = 0, len = data.length; i < len; i++){
			var $li = $("<li></li>");
			var $a = $("<a></a>");
			$li.css("background-image", "url("+ data[i].imgUrl +")");
			$a.attr("href", data[i].href);
			$li.append($a);
			$(".bannerSlider").append($li);
			
			var $dot = $("<li class='dot bannerDotDefault'></li>");
			$dot.text(i);
			$(".bannerDots").append($dot);
			
			//下划条绑定划动事件
			$(".dot").eq(i).click(function(){
				index = $(this).text();
				leftP = -index+"00%";
				$(".bannerSlider").stop(true,true).animate({left: leftP},1000);
				$(".bannerDots .dot").removeClass("bannerDotActive");
				$(".bannerDots .dot").eq(index).addClass("bannerDotActive");
			});
		}
		//初始化第一个下划条的背景为红色
		$(".bannerDots .dot").eq(0).addClass("bannerDotActive");
		
		//定时器调用函数
		function ban(){
			if(j < len-1){
				j++;
			}else{
				j = 0;				
			}
			leftP = -j+"00%";
			$(".bannerSlider").stop(true,true).animate({left: leftP},1000);	
			
			$(".bannerDots .dot").removeClass("bannerDotActive");
			$(".bannerDots .dot").eq(j).addClass("bannerDotActive");
		}
		//启动定时器
		var banner = window.setInterval(ban, 3000);
		
		//轮播图区域悬停停止计时器，离开启动定时器
		$(".banner").hover(function(){
			window.clearInterval(banner);						
		}, function(){
			banner = window.setInterval(ban, 3000);						
		});
		
		//左右键调用切换函数
		function btn(){
			$(".bannerDots .dot").removeClass("bannerDotActive");
			$(".bannerDots .dot").eq(j).addClass("bannerDotActive");
			leftP = -j+"00%";
			$(".bannerSlider").stop(true,true).animate({left: leftP},1000);	
		}
		
		//左键点击
		$(".prev").click(function(){
			window.clearInterval(banner);
			if(j == 0){
				j = len-1;
			}else{
				j--;
			}
			btn();	
		});
		//右键点击
		$(".next").click(function(){
			window.clearInterval(banner);
			if(j == len-1){
				j = 0;
			}else{
				j++;
			}
			btn();
		});

	});
	
	/*************轮播图区域左侧侧边栏***************/
	$.getJSON("jason_data/index/menuVertical.json", function(data){
		
		for(var i = 0, len = data.length; i < len; i++){
			//左侧目录部分
			var $li = $("<li class='bannerLeftCategory_item'></li>");
			var $p1 = $("<p class='bannerLeftCategory_icon'></p>");
			var $span1 = $("<span class='first-iconfont'></span>");
			$span1.html(data[i].icon);
			$p1.append($span1);
			var $h2_1 = $("<h2 class='bannerLeftCategory_title'></h2>");
			$h2_1.text(data[i].title);
			var $p2 = $("<p class='bannerLeftCategory_subtitle'></p>");
			for(var j = 0, len2 = data[i].mainCity.length; j < len2; j++ ){
				var $a = $("<a href='javascript:;'></a>");
				$a.html(data[i].mainCity[j]);
				$p2.append($a);
			}	
			var $p3 = $("<p class='bannerLeftCategory_arrow'></p>");
			var $span2 = $("<span class='first-iconfont iconArrowRight'></span>");
			$span2.html("&#xe603;");
			$p3.append($span2);
			
			$li.append($p1).append($h2_1).append($p2).append($p3);
			$(".bannerLeftCategory_list").append($li);
		
			//*******************左侧内容部分***********************
			var $div0 = $("<div class='bannerLeftCategory_content'></div>");
			var len3 = data[i].moreCity.length;
			//创建纵列布局		
			if(len3 > 1){
				var $div1 = $("<div class='column'></div>");
				var $div2 = $("<div class='column'></div>");
			}else{
				var $div3 = $("<div class='column'></div>");
			}
			//创建内容右下角图区
			if(data[i].moreCityImg){
				var $p6 = $("<p class='category_pic'></p>");
				var $a3 = $("<a href='javascript:;'></a>");
				var $img = $("<img>");
				$img.attr("src",data[i].moreCityImg);
				$a3.append($img);
				$p6.append($a3);
			}
			//生成内容块
			for(var a = 0; a < len3; a++){
				var $div4 = $("<div class='category_place'></div>");
				var $h2_2 = $("<h2 class='bigTitle'></h2>");
				$h2_2.text(data[i].moreCity[a].cityName);
				var $ul1 = $("<ul class='list'></ul>");
				for(var b = 0, len4 = data[i].moreCity[a].items.length; b < len4; b++){
					var $li2 = $("<li></li>");
					var $a2 = $("<a href='javascript:;'></a>");
					//判断是否为主题区域，若是需要给 a 标签里面添加 img 标签
					if(len3 == 1){
						var $img2 = $("<img>");
						$img2.attr("src",data[i].moreCity[a].items[b]);
						$a2.append($img2);
					}else{
						$a2.text(data[i].moreCity[a].items[b]);
					}
					$li2.append($a2);
					$ul1.append($li2);
				}
				$div4.append($h2_2).append($ul1);
				
				//判断内容块如何分布
				if(len3 <= 1){
					$div3.append($div4);
					$div0.append($div3);
				}else if(len3 < 3){
					if(a == 0){
						$div1.append($div4);
						$div0.append($div1);
					}else{
						$div2.append($div4).append($p6);
						$div0.append($div2);
					}
				}else{
					if(a == 0){
						$div1.append($div4);
					}else if(a == 1){
						$div1.append($div4);
						$div0.append($div1);	
					}else if(a == 2){
						$div2.append($div4).append($p6);
						$div0.append($div2);
					}					
				}
			}
			
			$(".bannerLeftCategory_contents").append($div0);
			
			//悬停事件
			$(".bannerLeftCategory_item").eq(i).hover(function(){
				var c = $(this).index();
				$(".bannerLeftCategory").css("width", "1160px");
				$(".bannerLeftCategory_item").eq(c).addClass("active");
				$(".bannerLeftCategory_contents").css("display", "block");
				$(".bannerLeftCategory_content").css("display", "none");
				$(".bannerLeftCategory_content").eq(c).css("display", "block");
			}, function(){
				var c = $(this).index();
				$(".bannerLeftCategory").css("width", "");
				$(".bannerLeftCategory_contents").css("display", "none");
				$(".bannerLeftCategory_item").removeClass("active");
				
				$(".bannerLeftCategory_contents").hover(function(){
					$(".bannerLeftCategory").css("width", "1160px");
					$(this).css("display", "block");
					$(".bannerLeftCategory_item").removeClass("active");
					$(".bannerLeftCategory_item").eq(c).addClass("active");
				}, function(){
					$(this).css("display", "none");
					$(".bannerLeftCategory_item").removeClass("active");
				});
			});			
		}
		
		$(".bannerLeftCategory_content:eq(0) .column:eq(0) .category_place:eq(0) li:eq(2)").css("clear", "left");
		$(".bannerLeftCategory_content:eq(5) .column:eq(0) .category_place:eq(0) ul").removeClass("list").addClass("theme");
			
	});
	/*************轮播图区域左侧侧边栏  End************/

/*******************首页轮播图区域 End**********************/

/************************今日特卖************************/
	//点击换一换切换内容
	(function(){
		var d = 0;
		$(".todaySale_switch").click(function(){
			if(d < 3){
				d++;			
			}else{
				d = 0;
			}
			$(".todaySale_list").css("display", "none").css("opacity", .3);
			$(".todaySale_list").eq(d).css("display", "block");
			$(".todaySale_list").eq(d).stop(true, true).animate({opacity:1},500);
		});
	})();
/**********************今日特卖 End************************/

/**********************机酒自由行************************/
	$.getJSON("jason_data/index/freeWalk.json", function(datas){
		for(var i = 0, len = datas.length; i < len; i++){
			//创建标题行
			var $li = $("<li></li>");
			var $a = $("<a href='javascript:;'></a>");
			$a.text(datas[i].title);
			$li.append($a);
			$(".freedomGoTitles_tags").append($li);
			
			//创建内容块
			var $ul = $("<ul class='freedomGoContent_list clearfix'></ul>");
			for(var j = 0, len2 = datas[i].data.length; j < len2; j++){
				if(j == 0){
					var $li2 = $("<li class='freedomGoContent_one'></li>");
				}else{
					var $li2 = $("<li class='freedomGoContent_item'></li>");
				}
				var $a2 = $("<a href='javascript:;'></a>");
				var $p = $("<p class='pics'></p>");
				var $img = $("<img>");
				$img.attr("src", datas[i].data[j].imgUrl);
				$p.append($img);
				var $div1 = $("<div class='infos'></div>");
				var $p1 = $("<p class='type'></p>");
				$p1.text("机+酒");
				var $p2 = $("<p class='price'></p>");
				var $em = $("<em></em>");
				$em.text(datas[i].data[j].price);
				$p2.append($em).append("元起");
				$div1.append($p1).append($p2);
				var $div2 = $("<div class='titles'></div>");
				var $h3 = $("<h3 class='title'></h3>");
				$h3.text(datas[i].data[j].title);
				$div2.append($h3);
				if(j == 0){
					var $p3 = $("<p class='time'></p>");
					$p3.text(datas[i].data[j].time);
					$div2.append($p3);
				}
				$a2.append($p).append($div1).append($div2);
				$li2.append($a2);
				$ul.append($li2);
			}
			var $li3 = $("<li class='freedomGoContent_more'></li>");
			var $div3 = $("<div class='titles'></div>");
			var $a3 = $("<a href='javascript:;'></a>");
			var $p5 = $("<p class='title'></p>");
			$p5.html("查看更多</br>机酒自由行产品");
			var $p6 = $("<p class='arrow'></p>");
			var $span = $("<span class='first-iconfont'></span>");
			$span.html("&#xe60a;");
			$p6.append($span);
			$a3.append($p5).append($p6);
			$div3.append($a3);
			var $p4 = $("<p class='list'></p>");
			for(var k = 0; k < 4; k++){
				var $a4 = $("<a href='javascript:;'></a>");
				switch(k){
					case 0:
						$a4.text("机票");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 1:
						$a4.text("酒店");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 2:
						$a4.text("机+酒");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 3:
						$a4.text("邮轮");
						$p4.append($a4);
						break;
				}
			}
			$li3.append($div3).append($p4);
			$ul.append($li3);
			
			$(".freedomGoContent").append($ul);
		}
		//初始化标签
		$(".freedomGoTitles_tags li").eq(0).addClass("active");
		//hover 事件
		var index = 0;
		$(".freedomGoTitles_tags li").hover(function(){
			index = $(this).index();
			$(".freedomGoTitles_tags li").removeClass("active");
			$(".freedomGoTitles_tags li").eq(index).addClass("active");
			$(".freedomGoContent_list").eq(index).siblings().css("display","none").css("opacity", .3);
			$(".freedomGoContent_list").eq(index).css("display","block");
			$(".freedomGoContent_list").eq(index).stop(true, true).animate({opacity:1},300);
		});
	});
/*********************机酒自由行 End***********************/

/************************城市玩乐**********************/
		(function(){
			//hover 事件
			var index = 0;
			$(".cityPlayTitles_tags li").hover(function(){
				index = $(this).index();
				$(".cityPlayTitles_tags li").removeClass("active");
				$(".cityPlayTitles_tags li").eq(index).addClass("active");
				/*$(".cityPlayContent_list").eq(index).siblings().css("display","none").css("opacity", .3);
				$(".cityPlayContent_list").eq(index).css("display","block");
				$(".cityPlayContent_list").eq(index).stop(true, true).animate({opacity:1},300);*/
			});
		})();		
/*********************城市玩乐 End**********************/

/************************主题推荐************************/
	$.getJSON("jason_data/index/recommend.json", function(datas){
		for(var i = 0, len = datas.length; i < len; i++){
			//创建标题行
			var $li = $("<li></li>");
			var $a = $("<a href='javascript:;'></a>");
			$a.text(datas[i].title);
			$li.append($a);
			$(".themeRecommendTitles_tags").append($li);
			
			//创建内容块
			var $ul = $("<ul class='themeRecommendContent_list clearfix'></ul>");
			for(var j = 0, len2 = datas[i].data.length; j < len2; j++){
				var $a2 = $("<a href='javascript:;'></a>");
				var $p = $("<p class='pics'></p>");
				var $img = $("<img>");
				$img.attr("src", datas[i].data[j].imgUrl);
				$p.append($img);	
				var $h3 = $("<h3 class='title'></h3>");
				$h3.text(datas[i].data[j].title);
				var $p2 = $("<p class='price'></p>");
				var $em = $("<em></em>");
				$em.text(datas[i].data[j].price);
				$p2.append($em).append("元起");
				if(j == 0){
					var $li2 = $("<li class='themeRecommendContent_one'></li>");
					var $div_1 = $("<div class='mask'></div>");
					var $div_2 = $("<div class='mask2'></div>");
					var $div_3 = $("<div class='tag'></div>");
					$div_3.text(datas[i].title);
					
					$a2.append($p).append($div_1).append($div_2).append($div_3).append($h3).append($p2);
				}else{
					var $li2 = $("<li class='themeRecommendContent_item'></li>");
					var $div1 = $("<div class='infos'></div>");
					$div1.append($h3).append($p2);
					$a2.append($p).append($div1);
				}
				$li2.append($a2);
				$ul.append($li2);
			}
			var $li3 = $("<li class='themeRecommendContent_more'></li>");
			var $div3 = $("<div class='titles'></div>");
			var $a3 = $("<a href='javascript:;'></a>");
			var $p5 = $("<p class='title'></p>");
			$p5.html("查看更多</br>主题推荐产品");
			var $p6 = $("<p class='arrow'></p>");
			var $span = $("<span class='first-iconfont'></span>");
			$span.html("&#xe60a;");
			$p6.append($span);
			$a3.append($p5).append($p6);
			$div3.append($a3);
			var $p4 = $("<p class='list'></p>");
			for(var k = 0; k < 4; k++){
				var $a4 = $("<a href='javascript:;'></a>");
				switch(k){
					case 0:
						$a4.text("亲子");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 1:
						$a4.text("情侣");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 2:
						$a4.text("海岛游");
						$p4.append($a4).append("&nbsp;&nbsp;|&nbsp;&nbsp;");
						break;
					case 3:
						$a4.text("购物");
						$p4.append($a4);
						break;
				}
			}
			$li3.append($div3).append($p4);
			$ul.append($li3);
			
			$(".themeRecommendContent").append($ul);
		}
		//初始化标签
		$(".themeRecommendTitles_tags li").eq(0).addClass("active");
		//hover 事件
		var index = 0;
		$(".themeRecommendTitles_tags li").hover(function(){
			index = $(this).index();
			$(".themeRecommendTitles_tags li").removeClass("active");
			$(".themeRecommendTitles_tags li").eq(index).addClass("active");
			$(".themeRecommendContent_list").eq(index).siblings().css("display","none").css("opacity", .3);
			$(".themeRecommendContent_list").eq(index).css("display","block");
			$(".themeRecommendContent_list").eq(index).stop(true, true).animate({opacity:1},300);
		});
	});
/*********************主题推荐  End**********************/

/********************加载网页公共底部*********************/
	$(".bottomHtmlWrap").load("html/common/bottomHtml.html .footNav,.bottomHtml", function(){
		$(".bottomHtmlLine1_left_logo img").attr("src", "img/bottomLogo.png");
		$(".iphone img").attr("src", "img/iPhone.jpg");
		$(".wechat img").attr("src", "img/weixin.png");
	});
/******************加载网页公共底部 End*********************/
});