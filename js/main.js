$(function(){
  $(".hero-image").animate({ opacity: 1 }, { duration: 1700 });
  var numberOfPics = 14;
  var mypics = [];
  for (var i = 1; i < numberOfPics+1; i++) {
    mypics.push("images/bg"+[i]+".JPG");
  }
  var windowHeight = $(window).height(),
      pos = windowHeight;

  // change background-image on very access
  // var randomNum = Math.floor(Math.random() * mypics.length);
  // $('.hero-image').attr({
  //   style: "background-image: url(" +mypics[randomNum]+ ");"
  // });

  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $(".icon-scroll-top").fadeIn(300);
    } else {
      $(".icon-scroll-top").fadeOut(300);
    }

    if ($(this).scrollTop() > pos - 35) {
      $(".icon-menu").css("color", "black");
    } else {
      $(".icon-menu").css("color", "white");
    }
  });

  $(window).bind('scroll', function() {
			 if ($(this).scrollTop() > pos) {
				 $('.nav').addClass('fixed');
         $(".section-profile").addClass("topspace");
			 } else {
				 $('.nav').removeClass('fixed');
         $(".section-profile").removeClass("topspace");
			 }
		});

  $(".icon-scroll-top").click(function(){
    $("html, body").animate({scrollTop:0}, 300, "swing");
    return false;
  })

	$('a[href^=\\#]').click(function(){
		var time = 1200;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, time, "swing");
		return false;
	});

  $('#hero-name').click(function(){
    var randomNum = Math.floor(Math.random() * mypics.length);

    $(".hero-image").fadeOut(500, function() {
            $(this).attr({
              style: "background-image: url(" +mypics[randomNum]+ ");"
            });
            $(this).fadeIn(1);
        });
     $(".hero-image").animate({ opacity: 1 }, { duration: 1700 });
  })
});
