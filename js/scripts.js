$(function(){

	var mobile = false;
	var mobileMenuOpen = false;
	var currentImage = 0;

	$(document).ready(function(){
		$("#top-section").css({"height":$(window).height()});
		initializeGallery();
		$("body,html").css({"background":"#fff"});
	});

	function initializeGallery(){
		currentImage = Math.round($("#gallery-wrapper img").length/2);
		$("#gallery-wrapper img").each(function(i){
			if(i == currentImage){
				$(this).css({"opacity":"1"});
				$("#gallery-icons").append("<a href='javascript:' class='icon active'></a>");
			}else{
				$(this).css({"opacity":".25"});
				$("#gallery-icons").append("<a href='javascript:' class='icon'></a>");
			}
		});

		positionGallery();
		setTimeout(positionGallery, 1000);
	}

	function positionGallery(){
		if(!window.matchMedia('(max-width: 800px)').matches){
			$("#inner-holder").css({"left":$(window).width()/2 - ($("#gallery-wrapper img").eq(currentImage).position().left + $("#gallery-wrapper img").eq(currentImage).width()/2)});
		}
	}

	$(window).resize(function(){
		$("#top-section").css({"height":$(window).height()});
		positionGallery();
	});

	function swapImage(i){
		if(!window.matchMedia('(max-width: 800px)').matches){

			currentImage = i;

			if(currentImage == 0){
				$("#gallery-left").hide();
			}else{
				$("#gallery-left").show();
			}

			if(currentImage == $("#gallery-wrapper img").length-1){
				$("#gallery-right").hide();
			}else{
				$("#gallery-right").show();
			}

			$("#inner-holder").animate({"left":$(window).width()/2 - ($("#gallery-wrapper img").eq(currentImage).position().left + $("#gallery-wrapper img").eq(currentImage).width()/2)},600);

			$("#gallery-wrapper img").each(function(i){
				if(i == currentImage){
					$(this).animate({"opacity":"1"});	
				}else{
					$(this).animate({"opacity":".25"});	
				}
			});
			
			$(".icon").removeClass("active");
			$(".icon").eq(currentImage).addClass("active");
		}
	}

	$(document).on ("click", "#gallery-right", function () {
		if(currentImage != $("#gallery-wrapper img").length-1){
			swapImage(currentImage + 1);
		}
	});

	$(document).on ("click", "#gallery-left", function () {
		if(currentImage != 0){
			swapImage(currentImage - 1);
		}
	});

	$(document).on ("click", ".icon", function () {
		if(currentImage != $(this).index()){
			swapImage($(this).index());
		}
    });

    $(document).on ("click", "#gallery-wrapper img", function () {
		if(currentImage != $(this).index()){
			swapImage($(this).index());
		}
    });

    $("#menu-btn").click(function(){
		if(!mobileMenuOpen){
			openMobileMenu();
		}else{
			closeMobileMenu();
		}

	});

	function closeMobileMenu(){
		mobileMenuOpen = false;

		$("nav").animate({"left":"100%"},500);
		$("#nav-links,#nav-social").fadeOut();

		$("#burger-1").animate({"width":"100%","rotate":"0","top":"0","marginTop":"0"},200);
		$("#burger-3").fadeIn();
		$("#burger-2").animate({"rotate":"0","top":"50%","width":"100%","marginTop":"-1px"},200);

		$("#menu-btn").removeClass("open");
	}

	function openMobileMenu(){
		mobileMenuOpen = true;

		$("nav").animate({"left":"0"},500);
		$("#nav-links,#nav-social").stop(true,false).delay(500).fadeIn();

		$("#burger-1").animate({"width":"75%","rotate":"-45","top":"50%","marginTop":"-2px"},200);
		$("#burger-3").fadeOut(100);
		$("#burger-2").animate({"rotate":"45","top":"50%","width":"75%","marginTop":"-2px"},200);

		$("#menu-btn").addClass("open");
	}

	$("nav a").click(function(){
		var newSection = "#" + $(this).attr("id").replace("link-","");
		$("body,html").delay(400).animate({"scrollTop":$(newSection).offset().top},1200);
		closeMobileMenu();
	});

	$("#scroll-hint").click(function(){
		$("body,html").animate({"scrollTop":$("#about").offset().top},800);
	});


});

