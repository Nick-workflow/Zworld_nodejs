$(function(){
/******************加载网页公共顶部*********************/
	$(".topHtml").load("../../html/common/topHtml.html .topHtmlContainer", function () {
        $(".topHtml .loginRegistSpace a").eq(4).attr("href", "../login/login.html");
    });
	$.getScript("../../js/topHtml_search.js");

/*****************加载网页公共顶部 End*******************/

/********************citywalk 头部**********************/
	$(".citywalkHeader_searchLine .iptext").focus(function(){
		$(".citywalkHeader_dropDown").addClass("show");
	});
	$(".citywalkHeader_searchLine .iptext").blur(function(){
		$(".citywalkHeader_dropDown").removeClass("show");
	});

/*******************citywalk 头部 End*********************/

/********************citywalk 内容***********************/
	$.getJSON("../../jason_data/citywalk/cityWalkList.json", function(data){
		for(var i = 0, len = data.length; i < len; i++){
			var $div = $("<div class='citywalkContentList clearfix'></div>");
			var $div1 = $("<div class='citywalkContentList_contain'></div>");
			var $a = $("<a href='javascript:;'></a>");
			var $img = $("<img>");
			$img.attr("src", data[i].imgurl);
			$a.append($img);
			var $div2 = $("<div class='citywalkContentList_info'></div>");
			var $span = $("<span class='citywalkContentList_infoPlace'></span>");
			$span.text(data[i].address);
			var $div3 = $("<div class='citywalkContentList_infoNum'></div>");
			var $span1 = $("<span></span>");
			$span1.text(data[i].browseCount);
			var $span2 = $("<span></span>");
			$span2.text(data[i].soldCount);
			$div3.append($span1).append("次浏览").append($span2).append("件已售");
			var $h2 = $("<h2></h2>");
			var $a1 = $("<a href='javascript:;'></a>");
			$a1.text(data[i].title);
			$h2.append($a1);
			var $ul = $("<ul class='citywalkContentList_infoList'></ul>");
			for(var j = 0, len2 = data[i].introduce.length; j < len2; j++){
				var $li = $("<li></li>");
				var $i = $("<i class='first-iconfont'></i>");
				$i.html("&#xe615;");
				$li.append($i).append(data[i].introduce[j]).append("<br>");
				$ul.append($li);
			}
			var $div4 = $("<div class='citywalkContentList_price'></div>");
			var $span3 = $("<span></span>");
			$span3.text(data[i].oldPrice + "元");
			var $em = $("<em></em>");
			$em.text(data[i].newPrice);
			$div4.append($span3).append($em).append("元起");
			var $div5 = $("<div class='citywalkContentList_bottom'></div>");
			var $a2 = $("<a href='javascript:;'></a>");
			$a2.text("立即预订");
			$div5.append($a2);

			$div2.append($span).append($div3).append($h2).append($ul).append($div4).append($div5);
			$div1.append($a).append($div2);
			$div.append($div1);
			$(".citywalkContent").append($div);
		}
		var $div6 = $("<div class='citywalkContentPage_wrap clearfix'></div>");
		var $div7 = $("<div class='citywalkContentPage_btn'></div>");
		var	$a3 = $("<a class='item Current' href='javascript:;'>1</a>");
		var	$a4 = $("<a class='item' href='javascript:;'>2</a>");
		var	$a5 = $("<a class='item Next' href='javascript:;'>下一页</a>");
		$div7.append($a3).append($a4).append($a5);
		$div6.append($div7);
		$(".citywalkContent").append($div6);

		//初始化显示内容数为json数据的一半
		for(var a = 0, len3 = data.length/2; a < len3; a++){
			$(".citywalkContentList").eq(a).css("display", "block");
			//点击事件
			var index = 0;
			$(".citywalkContentPage_btn a").eq(a).click(function(){
				index = $(this).index();
				if(index == 0){
					if($(".citywalkContentList").eq(0).css("display") == "none"){
						//改变内容
						$(".citywalkContentList").eq(len3-1).nextAll(".citywalkContentList").css("display", "none");
						$(".citywalkContentList").eq(len3).prevAll(".citywalkContentList").fadeIn(500);

						//改变按钮
						$(".citywalkContentPage_btn .item").css("background", "none");
						$(".citywalkContentPage_btn a").eq(0).text("1").css("background", "#00b081");
						$(".citywalkContentPage_btn a").eq(1).text("2");
						$(".citywalkContentPage_btn a").eq(2).text("下一页");
					}
				}else if(index == 1){
					if($(".citywalkContentList").eq(0).css("display") == "block"){
						$(".citywalkContentList").eq(len3).prevAll(".citywalkContentList").css("display", "none");
						$(".citywalkContentList").eq(len3-1).nextAll(".citywalkContentList").fadeIn(500);
						//改变按钮
						$(".citywalkContentPage_btn .item").css("background", "none");
						$(".citywalkContentPage_btn a").eq(0).text("上一页");
						$(".citywalkContentPage_btn a").eq(1).text("1");
						$(".citywalkContentPage_btn a").eq(2).text("2").css("background", "#00b081");
					}else{
						$(".citywalkContentList").eq(len3-1).nextAll(".citywalkContentList").css("display", "none");
						$(".citywalkContentList").eq(len3).prevAll(".citywalkContentList").fadeIn(500);
						//改变按钮
						$(".citywalkContentPage_btn .item").css("background", "none");
						$(".citywalkContentPage_btn a").eq(0).text("1").css("background", "#00b081");
						$(".citywalkContentPage_btn a").eq(1).text("2");
						$(".citywalkContentPage_btn a").eq(2).text("下一页");
					}
				}else{
					if($(".citywalkContentList").eq(0).css("display") == "block"){
						$(".citywalkContentList").eq(len3).prevAll(".citywalkContentList").css("display", "none");
						$(".citywalkContentList").eq(len3-1).nextAll(".citywalkContentList").fadeIn(500);
						//改变按钮
						$(".citywalkContentPage_btn .item").css("background", "none");
						$(".citywalkContentPage_btn a").eq(0).text("上一页");
						$(".citywalkContentPage_btn a").eq(1).text("1");
						$(".citywalkContentPage_btn a").eq(2).text("2").css("background", "#00b081");
					}

				}
			});
		}

	});
/*******************citywalk 内容 End*********************/

/********************加载网页公共底部*********************/
	$(".bottomHtmlWrap").load("../../html/common/bottomHtml.html .footNav,.bottomHtml", function(){
		$(".bottomHtmlLine1_left_logo img").attr("src", "../../img/bottomLogo.png");
		$(".iphone img").attr("src", "../../img/iPhone.jpg");
		$(".wechat img").attr("src", "../../img/weixin.png");
		$(".bottomHtmlLine2_thirdline").remove();
	});
/******************加载网页公共底部 End*********************/
});
