$(function(){
	$(".navSearch .txt").focus(function(){
		$(".navSearch").addClass("navSearchClass");
	});
	$(".navSearch .txt").blur(function(){
		$(".navSearch").removeClass("navSearchClass");
		$(this).val("");
	});
});